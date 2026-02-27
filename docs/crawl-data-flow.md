# Crawl Data Flow

This document describes what happens internally when a crawl is started, from the initial HTTP request through to the completed audit record in the database.

## Overview

A crawl runs in two optional phases:

1. **Phase 1 — Crawl** (`POST /crawl/start`): discovers and analyses every URL on the site using Playwright, collecting SEO, links, images, and performance data.
2. **Phase 2 — Enrich** (`POST /enrich/start`): re-visits each page with Playwright specifically to collect Core Web Vitals and performance metrics. Can be triggered manually or automatically via `AutoEnrichAfterCrawl`.

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

URLs are processed by a TPL Dataflow `ActionBlock<UrlQueueItem>` with degree of parallelism set to `MaxConcurrentCrawls` (default: 4, range 1–20). A `SemaphoreSlim` enforces the limit.

For each URL, `ProcessUrlAsync` runs:

```
ProcessUrlAsync(url)
  ├─ robots.txt disallow check
  ├─ max depth check
  ├─ circuit breaker check (5 consecutive failures trips a path prefix)
  ├─ CrawlService.GetPageAnalysis(url, baseUri, nodeKey)
  │     ├─ [Primary]  Playwright page load
  │     │     ├─ Route interception → collect resources and links
  │     │     ├─ Navigate → wait for load
  │     │     ├─ Extract SEO (title, meta, H1/H2, canonical, noindex, OG, Twitter)
  │     │     ├─ Extract content analysis (word count, readability, keyword density)
  │     │     ├─ Inject web-vitals.js → collect CLS, FCP, LCP, TTFB
  │     │     ├─ Extract images (src, alt, CSS backgrounds)
  │     │     ├─ Extract technical SEO (gzip, caching, HTTPS, charset)
  │     │     └─ Extract social media signals
  │     └─ [Fallback] HttpClient (on Playwright failure / timeout)
  │           ├─ GET request
  │           ├─ Regex-based SEO extraction
  │           └─ Basic link / image parsing
  ├─ Enqueue newly discovered links (internal, not already seen)
  ├─ HEAD requests for external links (rate-limited per domain)
  └─ CrawlStateManager.AddResult(crawlDto)
        └─ SignalR → crawlProgress(crawlDto) to all clients
```

Every 50 pages, collected DTOs are flushed to the database (`FlushDataToDatabase`) to bound memory usage. Crawl state (visited URLs, pending queue, disallowed paths) is also saved to `umbContentAuditCrawlState` every 50 pages so a crashed or timed-out crawl can be resumed.

---

### 5. Data collected per page

| Category | Key fields |
|---|---|
| Page | URL, status code, redirect URL, unique GUID |
| SEO | Title, meta description, canonical, H1–H3, noindex, nofollow, Open Graph, Twitter Card |
| Content analysis | Word count, paragraph count, readability score, keyword density, link counts |
| Performance | Page load time, CLS, FCP, LCP, TTI, TTFB, total bytes, resource timings |
| Technical SEO | Content-Type, charset, gzip, browser caching, HTTPS |
| Social media | Share buttons, Facebook/Twitter/LinkedIn pixels, social links |
| Links | URL, source page, internal/external flag, status code |
| Images | URL, source page, alt text, title, internal/external flag |
| Resources | URL, source page, type (script/stylesheet), status code, size |
| Fingerprint | ETag, Last-Modified, content SHA-256 (for next incremental crawl) |

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
| `umbContentAuditContentAnalysis` | 1 | Readability and content metrics per page |
| `umbContentAuditPerformance` | 1 + 2 | Core Web Vitals; replaced entirely by Phase 2 |
| `umbContentAuditTechnicalSeo` | 1 | Gzip, caching, HTTPS per page |
| `umbContentAuditSocialMedia` | 1 | Social signals per page |
| `umbContentAuditLink` | 1 | All links found (internal and external) |
| `umbContentAuditImage` | 1 | All images found |
| `umbContentAuditResource` | 1 | CSS, JS, font resources found |
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
