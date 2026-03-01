# Crawl Data Flow

This document describes what happens internally when a crawl is started, from the initial HTTP request through to the completed audit record in the database.

## Overview

A crawl runs in two phases:

1. **Phase 1 — Crawl** (`POST /crawl/start`): discovers and analyses every URL on the site using **HttpClient only**. Fast and low-resource — collects SEO, links, images, technical headers, and fingerprint data, but not Core Web Vitals.
2. **Phase 2 — Enrich** (`POST /enrich/start`): re-visits each page with **Playwright** to collect Core Web Vitals and full performance metrics. Can be triggered manually from the backoffice or automatically after Phase 1 via `AutoEnrichAfterCrawl`.

---

## Phase 1: Crawl

### 1. Request arrives

```
Client (backoffice)
  └─ POST /umbraco/content-audit/management/api/v1/crawl/start
       └─ StartCrawlController
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

```
CheckPageChangedAsync(url, previousFingerprint)
  ├─ HTTP 304 Not Modified?  → unchanged, copy previous data
  ├─ ETag match?             → unchanged, copy previous data
  ├─ Last-Modified match?    → unchanged, copy previous data
  └─ Content hash match?     → unchanged, copy previous data
      └─ else → full crawl
```

Pages skipped by incremental crawl are reported to the SignalR hub with `Skipped = true`.

---

### 4. Parallel page processing

**Internal pages** are processed by a TPL Dataflow `ActionBlock<UrlQueueItem>` with degree of parallelism set to `MaxConcurrentCrawls` (default: 4, range 1–20).

External links and asset URLs (CSS, JS, fonts, etc.) never enter the queue or ActionBlock. When discovered during a page crawl they are registered directly into `_crawlResults` and pushed to SignalR via `RegisterExternalOrAssetResult`, keeping ActionBlock slots free for pages that need HTTP requests.

For each internal page, `ProcessUrlAsync` runs:

```
ProcessUrlAsync(url)
  ├─ robots.txt disallow check
  ├─ max depth check
  ├─ circuit breaker check (5 consecutive failures trips a path prefix)
  ├─ CrawlService.GetPageAnalysisLightweightAsync(url, baseUri, nodeKey)
  │     └─ HttpClient GET request
  │           ├─ Regex-based SEO extraction (title, meta, H1, canonical, noindex, OG)
  │           ├─ Link extraction
  │           ├─ Image extraction (src, alt)
  │           ├─ Technical SEO headers (gzip, caching, HTTPS, Content-Type)
  │           └─ ETag / Last-Modified / content hash (for next incremental crawl)
  ├─ Enqueue newly discovered internal links (not already seen)
  ├─ Register external links and assets via RegisterExternalOrAssetResult
  ├─ HEAD requests for external links (rate-limited per domain)
  └─ CrawlStateManager.AddResult(crawlDto)
        └─ SignalR → crawlProgress(crawlDto) to all clients
```

Every 50 pages, collected DTOs are flushed to the database (`FlushDataToDatabase`) to bound memory usage. Crawl state (visited URLs, pending queue, disallowed paths) is also saved to `umbContentAuditCrawlState` every 50 pages so a crashed or timed-out crawl can be resumed.

---

### 5. Data collected per page

| Category | Key fields | Notes |
|---|---|---|
| Page | URL, status code, redirect URL, unique GUID | |
| SEO | Title, meta description, canonical, H1, noindex, nofollow, Open Graph | |
| Technical SEO | Content-Type, gzip, browser caching, HTTPS | |
| Links | URL, source page, internal/external flag, status code | |
| Images | URL, source page, alt text, title, internal/external flag | |
| Fingerprint | ETag, Last-Modified, content SHA-256 | For next incremental crawl |
| Performance | Page load time, CLS, FCP, LCP, TTI, TTFB, total bytes | **Phase 2 only** |

---

### 6. Completion

Once the URL queue is empty and all workers have finished:

```
SaveCrawlResults()
  ├─ Flush remaining batched DTOs to database
  ├─ UpdateAuditTotalsAsync (total, internal, external, assets, blocked counts)
  ├─ CalculateHealthScore
  │     └─ foreach page: run all IAuditPageIssue.Check() and IAuditImageIssue.Check()
  ├─ CompleteAuditAsync (write health score, set Status = Completed)
  └─ DeleteCrawlStateAsync (clean up resume state)

CrawlStateManager.CompleteCrawl()
  └─ SignalR → crawlCompleted() to all clients
```

If `AutoEnrichAfterCrawl` is `true`, Phase 2 starts automatically at this point.

---

## Phase 2: Enrich

Triggered manually via `POST /enrich/start?auditKey={guid}` (omit `auditKey` to target the latest audit), or automatically after Phase 1 when `AutoEnrichAfterCrawl: true`.

```
StartEnrichController
  └─ EnrichmentStateManager.StartEnrichment(auditKey)
        └─ SignalR → enrichStarted(auditKey)

EnrichmentService.EnrichAuditAsync(auditKey, baseUrl)
  ├─ Load all non-asset, non-redirect, non-error pages for the audit
  ├─ DeletePerformanceDataAsync (clear previous performance rows for this audit)
  └─ foreach page (sequential, respects cancellation):
        ├─ CrawlService.GetPageAnalysis(url, baseUri, pageGuid)
        │     └─ Full Playwright load (no HttpClient fallback path used)
        ├─ EnrichmentStateManager.AddResult(crawlDto)
        │     └─ SignalR → enrichProgress(crawlDto)
        └─ if PageLoadTime has value: buffer PerformanceDto
              └─ flush every 50 pages → SavePerformanceAsync

  └─ SetIsEnrichedAsync (sets IsEnriched = true on audit overview)

EnrichmentStateManager.CompleteEnrichment()
  └─ SignalR → enrichCompleted(auditKey)
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

```
crawlStarted()
crawlPhaseChanged("Discovering URLs")
crawlPhaseChanged("Crawling")
  crawlProgress({ url, crawled, skipped, external, asset, unique })  ← once per URL
  ...
crawlPhaseChanged("Saving results")
crawlPhaseChanged("Calculating health score")
crawlCompleted()

[if enrichment runs]
enrichStarted(auditKey)
  enrichProgress({ url, crawled, unique })  ← once per page
  ...
enrichCompleted(auditKey)
```

Clients that connect mid-crawl receive the full current state (all previous `crawlProgress` / `enrichProgress` events) replayed on connect via `ContentAuditHub.OnConnectedAsync`.
