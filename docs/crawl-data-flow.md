# Crawl Data Flow

This document describes what happens internally when a crawl is started, from the initial HTTP request through to the completed audit record in the database.

## Overview

A crawl runs in two phases:

1. **Phase 1 — Crawl** (`POST /crawl/start`): discovers and analyses every URL on the site using **HttpClient only**. Fast and low-resource — collects SEO, links, images, technical headers, and fingerprint data, but not Core Web Vitals.
2. **Phase 2 — Enrich** (`POST /enrich/start`): re-visits each page with **Playwright** to collect Core Web Vitals and full performance metrics. Can be triggered manually from the backoffice or automatically after Phase 1 via `AutoEnrichAfterCrawl`.

```mermaid
flowchart LR
    A[POST /crawl/start] --> B[Phase 1: Crawl]
    B --> C[POST /enrich/start]
    C --> D[Phase 2: Enrich]
    style B fill:#4da6ff,color:#fff
    style D fill:#9966cc,color:#fff
```

---

## Phase 1: Crawl

### 1. Request arrives

```mermaid
sequenceDiagram
    participant Client as Client (backoffice)
    participant Controller as StartCrawlController
    participant State as CrawlStateManager
    participant Hub as SignalR Hub

    Client->>Controller: POST /crawl/start
    Controller->>State: IsRunning?
    State-->>Controller: No
    Controller->>State: StartCrawl()
    State->>Hub: crawlStarted()
    Controller-->>Client: 202 Accepted
    Note right of Controller: Crawl runs as<br/>background Task.Run
```

`StartCrawlController` checks that no crawl is already running via `ICrawlStateManager.IsRunning`. If clear, it calls `CrawlStateManager.StartCrawl()` which:
- resets internal state (results list, cancellation token)
- broadcasts `crawlStarted()` to all connected SignalR clients

The actual crawl is spawned as a background `Task.Run` using a new DI scope, then the controller immediately returns `202 Accepted`.

---

### 2. URL discovery

`AuditService.StartCrawl()` resolves the base URL (from config `BaseUrl` or the incoming request host), then runs all registered `IUrlDiscoveryStrategy` implementations in parallel:

| Strategy | Enabled by |
|---|---|
| `SitemapUrlDiscoveryStrategy` | `UseSitemapXml: true` (default) |
| `UmbracoContentUrlDiscoveryStrategy` | `UseUmbracoContentIndex: true` |

Each strategy yields a set of URLs which are enqueued. The starting URL (`/`) is always added. Discovered URLs are also matched against Umbraco content nodes so that a `nodeKey` (GUID) can be associated with each page.

If `RespectRobotsTxt` is enabled, `IRobotsService` fetches and parses `robots.txt`. Disallowed paths are stored and checked per URL. The `Crawl-delay` directive, if present, overrides `CrawlDelayMs` from config.

---

### 3. Incremental crawl check

When `UseIncrementalCrawl` is enabled, `ICrawlResultPersistence.GetPageFingerprintsAsync()` loads all page fingerprints from the previous audit (ETag, Last-Modified, content SHA-256 hash). For each URL dequeued:

```mermaid
flowchart TD
    A[CheckPageChangedAsync] --> B{HTTP 304?}
    B -->|Yes| G[Unchanged — copy previous data]
    B -->|No| C{ETag match?}
    C -->|Yes| G
    C -->|No| D{Last-Modified match?}
    D -->|Yes| G
    D -->|No| E{Content hash match?}
    E -->|Yes| G
    E -->|No| F[Full crawl]
```

Pages skipped by incremental crawl are reported to the SignalR hub with `Skipped = true`.

---

### 4. Parallel page processing

**Internal pages** are processed by a TPL Dataflow `ActionBlock<UrlQueueItem>` with degree of parallelism set to `MaxConcurrentCrawls` (default: 4, range 1–20).

External links, resource URLs (CSS, JS, fonts), and image URLs never enter the queue or ActionBlock. When discovered during a page crawl they are registered directly into `_crawlResults` and pushed to SignalR via `RegisterCrawlResult`, keeping ActionBlock slots free for pages that need HTTP requests. Each URL is classified as either a resource or an image (never both) — URLs that appear in both the resource list and the image list are classified as images. No HEAD requests are made during this phase — external/resource/image URLs are collected for deferred processing in step 5.

For each internal page, `ProcessUrlAsync` runs:

```mermaid
flowchart TD
    A[ProcessUrlAsync] --> B{robots.txt<br/>disallowed?}
    B -->|Yes| Z[Mark blocked]
    B -->|No| C{Max depth<br/>exceeded?}
    C -->|Yes| Z
    C -->|No| D{Circuit breaker<br/>tripped?}
    D -->|Yes| Z
    D -->|No| E[GetPageAnalysisLightweightAsync]

    E --> F[HttpClient GET]
    F --> G[Regex-based SEO extraction]
    F --> H[Link extraction]
    F --> I[Image extraction]
    F --> J[Technical SEO headers]
    F --> K[ETag / Last-Modified / content hash]

    G & H & I & J & K --> L[Enqueue new internal links]
    L --> M[Register external links,<br/>resources, images]
    M --> N[SignalR crawlProgress]
```

Crawl state (visited URLs, pending queue, disallowed paths) is saved to `umbContentAuditCrawlState` every 50 pages so a crashed or timed-out crawl can be resumed.

---

### 5. Deferred HEAD requests

Once all internal pages have been processed, the crawl enters a second sub-phase to check external links, resources, and images. This is handled by `ProcessDeferredHeadRequestsAsync`.

```mermaid
flowchart TD
    A[ProcessDeferredHeadRequestsAsync] --> B[Collect unique URLs]
    B --> B1[External links from _linkDtos]
    B --> B2[All resources from _resourceDtos]
    B --> B3[All images from _imageDtos]
    B1 & B2 & B3 --> C[Deduplicate into HashSet]
    C --> D["ActionBlock — parallelism min(MaxConcurrentCrawls × 4, 20)"]
    D --> E{External<br/>domain?}
    E -->|Yes| F[Rate-limit via IDomainRateLimiter]
    E -->|No| G[GetHeadResponse]
    F --> G
    G --> H[Cache in _headResponseCache]
    H --> I[Backfill DTOs from cache]
    I --> I1["Links: StatusCode, ContentType"]
    I --> I2["Resources: StatusCode, ContentType, Size"]
    I --> I3["Images: ContentType, Size"]
```

**Why deferred?** During step 4, external HEAD requests would block internal URL discovery — a page with 30 external links would stall the crawl frontier while waiting on slow domains. Deferring means: (a) the internal link graph completes as fast as the site can respond, (b) duplicate external URLs across pages are naturally deduplicated (one HEAD per unique URL), and (c) rate limiting is simpler since internal crawl and external checks don't compete for connections.

If the crawl times out or is cancelled during step 4, this phase is skipped. External link status codes will be missing but all URLs are still recorded.

---

### 6. Data collected per page

| Category | Key fields | Notes |
|---|---|---|
| Page | URL, status code, redirect URL, unique GUID | |
| SEO | Title, meta description, canonical, H1, noindex, nofollow, Open Graph | |
| Technical SEO | Content-Type, gzip, browser caching, HTTPS | |
| Links | URL, source page, internal/external flag, status code | External status codes populated in step 5 |
| Images | URL, source page, alt text, title, internal/external flag | Content-type and size populated in step 5 |
| Fingerprint | ETag, Last-Modified, content SHA-256 | For next incremental crawl |
| Performance | Page load time, CLS, FCP, LCP, TTI, TTFB, total bytes | **Phase 2 only** |

---

### 7. Completion

Once the URL queue is empty, all workers have finished, and deferred HEAD requests are complete:

```mermaid
flowchart TD
    A[SaveCrawlResults] --> B[Flush remaining DTOs to database]
    B --> C[UpdateAuditTotalsAsync]
    C --> D[EvaluateAndPersistIssues]
    D --> D1["Run all IAuditPageIssue.Check()"]
    D --> D2["Run all IAuditImageIssue.Check()"]
    D1 & D2 --> E[CompleteAuditAsync<br/>write health score, set Status = Completed]
    E --> F[DeleteCrawlStateAsync<br/>clean up resume state]
    F --> G[SignalR crawlCompleted]
    G --> H{AutoEnrichAfterCrawl?}
    H -->|Yes| I[Start Phase 2]
    H -->|No| J[Done]
```

---

## Phase 2: Enrich

Triggered manually via `POST /enrich/start?auditKey={guid}` (omit `auditKey` to target the latest audit), or automatically after Phase 1 when `AutoEnrichAfterCrawl: true`.

```mermaid
sequenceDiagram
    participant Controller as StartEnrichController
    participant State as EnrichmentStateManager
    participant Service as EnrichmentService
    participant Crawl as CrawlService
    participant Hub as SignalR Hub

    Controller->>State: StartEnrichment(auditKey)
    State->>Hub: enrichStarted(auditKey)

    loop Each page (sequential)
        Service->>Crawl: GetPageAnalysis(url, baseUri, pageGuid)
        Note right of Crawl: Full Playwright load
        Crawl-->>Service: PageAnalysisDto
        Service->>State: AddResult(crawlDto)
        State->>Hub: enrichProgress(crawlDto)
        Note right of Service: Buffer PerformanceDto,<br/>flush every 50 pages
    end

    Service->>Service: SetIsEnrichedAsync (IsEnriched = true)
    State->>Hub: enrichCompleted(auditKey)
```

---

## Database tables written

| Table | Phase | Content |
|---|---|---|
| `umbContentAuditOverview` | 1 | Audit summary, health score, status, `IsEnriched` flag |
| `umbContentAuditInternalPages` | 1 | One row per URL (status code, redirect, unique GUID) |
| `umbContentAuditSeo` | 1 | SEO metrics per page |
| `umbContentAuditTechnicalSeo` | 1 | Gzip, caching, HTTPS per page |
| `umbContentAuditLink` | 1 | All links found (internal and external) |
| `umbContentAuditImage` | 1 | All images found |
| `umbContentAuditPerformance` | 2 | Core Web Vitals; written by Phase 2, replaced on re-enrich |
| `umbContentAuditCrawlState` | 1 (temp) | Resume state; deleted on successful completion |
| `umbContentAuditPageFingerprint` | 1 | ETag / hash per URL for next incremental crawl |

---

## SignalR events timeline

```mermaid
sequenceDiagram
    participant Hub as SignalR Hub
    participant Client as Client

    Hub->>Client: crawlStarted()
    Hub->>Client: crawlPhaseChanged("Discovering URLs")
    Hub->>Client: crawlPhaseChanged("Crawling pages")

    loop Each URL
        Hub->>Client: crawlProgress({ url, crawled, skipped, external, resource, image, unique })
    end

    Hub->>Client: crawlPhaseChanged("Checking external links")
    Hub->>Client: crawlPhaseChanged("Saving results")
    Hub->>Client: crawlPhaseChanged("Calculating health score")
    Hub->>Client: crawlCompleted()

    opt If enrichment runs
        Hub->>Client: enrichStarted(auditKey)
        loop Each page
            Hub->>Client: enrichProgress({ url, crawled, unique })
        end
        Hub->>Client: enrichCompleted(auditKey)
    end
```

Clients that connect mid-crawl receive the full current state (all previous `crawlProgress` / `enrichProgress` events) replayed on connect via `ContentAuditHub.OnConnectedAsync`.
