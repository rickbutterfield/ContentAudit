# Configuration

The ContentAudit package can be configured through the `appsettings.json` file. This guide will walk you through the available configuration options.

## Basic Configuration

The basic configuration for the package looks like this:

```json
{
  "ContentAudit": {
    "BaseUrl": "https://your-site-url.com",
    "RespectRobotsTxt": true,
    "UseUmbracoContentIndex": false,
    "UseSitemapXml": true,
    "SitemapUrl": "/sitemap.xml",
    "MaxConcurrentCrawls": 2,
    "MaxCrawlDurationMinutes": 30,
    "UseIncrementalCrawl": true,
    "ExcludePatterns": [],
    "IncludePatterns": [],
    "CrawlDelayMs": 250,
    "MaxCrawlDepth": 0,
    "PageTimeoutMs": 30000,
    "ExternalRequestDelayMs": 200
  }
}
```

## Configuration Options

### URL Discovery
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `BaseUrl` | `string` | `''` | The base URL of your site. By default the package will use the URL you are running the audit on, however if your site is headless and you are running the audit from a different URL, you can set the base URL here. |
| `UseSitemapXml` | `bool` | `true` | If set to `true`, the package will use the sitemap.xml file to get a list of URLs. |
| `SitemapUrl` | `string` | `/sitemap.xml` | The URL of the sitemap.xml file. This is only used if `UseSitemapXml` is set to `true`. If not configured, the package will automatically attempt to discover the sitemap URL from the `robots.txt` file. |
| `UseUmbracoContentIndex` | `bool` | `false` | If set to `true`, the package will use the Umbraco content index to get a list of URLs. |
| `RespectRobotsTxt` | `bool` | `true` | If set to `true`, the package will respect the robots.txt file when crawling the site. |

### Crawl Behaviour
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `MaxConcurrentCrawls` | `int` | `2` | The maximum number of crawls to perform at the same time. Must be between 1 and 20. The default is intentionally conservative to avoid overwhelming staging or lower-resource servers; increase this value for better-provisioned environments. |
| `MaxCrawlDurationMinutes` | `int` | `30` | Maximum duration in minutes for a crawl operation. Set to `0` for no limit. Must be between 0 and 1440 (24 hours). |
| `UseIncrementalCrawl` | `bool` | `true` | If set to `true`, only pages that have changed since the last crawl will be re-crawled. |
| `MaxCrawlDepth` | `int` | `0` | Maximum crawl depth from the starting URL. Set to `0` for unlimited depth. Must be between 0 and 100. |
| `ExcludePatterns` | `string[]` | `[]` | Additional URL patterns to exclude from crawling. Supports wildcards (`*` and `**`). Examples: `"/admin/*"`, `"*/api/**"`, `"*.pdf"`. Note: `/media/**` is always excluded by default. |
| `IncludePatterns` | `string[]` | `[]` | URL patterns to include in crawling. If specified, only matching URLs will be crawled. Supports wildcards (`*` and `**`). Examples: `"/blog/*"`, `"/products/**"`. |

### Rate Limiting & Timeouts
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `CrawlDelayMs` | `int` | `250` | Delay in milliseconds between crawl requests. The default adds a small pause to prevent rapid-fire request bursts on staging or shared servers. Set to `0` for no delay on high-performance environments. This can be overridden by the `Crawl-delay` directive in `robots.txt` if `RespectRobotsTxt` is enabled. Must be between 0 and 60000 (60 seconds). |
| `PageTimeoutMs` | `int` | `30000` | Timeout in milliseconds for each page navigation. Applies to both Playwright and HttpClient fallback. Set to `0` to use Playwright's default timeout. Must be between 0 and 300000 (5 minutes). |
| `ExternalRequestDelayMs` | `int` | `200` | Minimum delay in milliseconds between consecutive requests to the same external domain. Applies to HEAD requests for external links and resources. Set to `0` to disable. Must be between 0 and 10000 (10 seconds). |

## Base URL Configuration

The `BaseUrl` setting is particularly important for the content audit to work correctly. This configuration is especially important for headless setups where the request URL might not be available or might not match the actual site URL.

## Sitemap Auto-Discovery

If you don't specify a `SitemapUrl` in your configuration, the package will automatically attempt to discover sitemap URLs from your site's `robots.txt` file. This follows [Google's robots.txt specification](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt), where sitemap locations can be declared using the `Sitemap:` directive.

For example, if your `robots.txt` contains:
```
User-agent: *
Disallow: /admin/

Sitemap: https://example.com/sitemap.xml
```

The package will automatically use `https://example.com/sitemap.xml` without requiring explicit configuration in `appsettings.json`.
