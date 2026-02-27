using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Umbraco.Community.ContentAudit.Configuration
{
    /// <summary>
    /// Root options section for ContentAudit configuration.
    /// </summary>
    public class ContentAuditOptions
    {
        /// <summary>
        /// Nested ContentAudit settings.
        /// </summary>
        public ContentAuditSettings? ContentAudit { get; set; }
    }

    /// <summary>
    /// Settings controlling how audits are performed.
    /// </summary>
    public class ContentAuditSettings
    {
        /// <summary>
        /// Whether to respect robots.txt when crawling.
        /// </summary>
        [DefaultValue(true)]
        public bool RespectRobotsTxt { get; set; } = true;

        /// <summary>
        /// Whether to use the Umbraco content index for discovery.
        /// </summary>
        [DefaultValue(false)]
        public bool UseUmbracoContentIndex { get; set; } = false;

        /// <summary>
        /// Whether to use sitemap.xml for discovery.
        /// </summary>
        [DefaultValue(true)]
        public bool UseSitemapXml { get; set; } = true;

        /// <summary>
        /// Optional absolute URL to a sitemap to crawl.
        /// </summary>
        [OptionalUrl(ErrorMessage = "SitemapUrl must be a valid URL")]
        public string? SitemapUrl { get; set; }

        /// <summary>
        /// Maximum number of concurrent crawl tasks.
        /// </summary>
        [DefaultValue(4)]
        [Range(1, 20, ErrorMessage = "MaxConcurrentCrawls must be between 1 and 20")]
        public int MaxConcurrentCrawls { get; set; } = 4;

        /// <summary>
        /// Base URL for the site under audit.
        /// </summary>
        [OptionalUrl(ErrorMessage = "BaseUrl must be a valid URL")]
        public string? BaseUrl { get; set; }

        /// <summary>
        /// Maximum duration in minutes for a crawl operation. Set to 0 for no limit.
        /// </summary>
        [DefaultValue(30)]
        [Range(0, 1440, ErrorMessage = "MaxCrawlDurationMinutes must be between 0 and 1440 (24 hours)")]
        public int MaxCrawlDurationMinutes { get; set; } = 30;

        /// <summary>
        /// Whether to use incremental crawls (only re-crawl changed pages).
        /// </summary>
        [DefaultValue(true)]
        public bool UseIncrementalCrawl { get; set; } = true;

        /// <summary>
        /// URL patterns to exclude from crawling. Supports wildcards (* and **).
        /// Examples: "/admin/*", "*/api/**", "*.pdf"
        /// </summary>
        public List<string> ExcludePatterns { get; set; } = new();

        /// <summary>
        /// URL patterns to include in crawling. If specified, only matching URLs will be crawled.
        /// Supports wildcards (* and **). Examples: "/blog/*", "/products/**"
        /// </summary>
        public List<string> IncludePatterns { get; set; } = new();

        /// <summary>
        /// Delay in milliseconds between crawl requests. Set to 0 for no delay.
        /// This can be overridden by robots.txt Crawl-delay directive if RespectRobotsTxt is enabled.
        /// </summary>
        [DefaultValue(0)]
        [Range(0, 60000, ErrorMessage = "CrawlDelayMs must be between 0 and 60000 (60 seconds)")]
        public int CrawlDelayMs { get; set; } = 0;

        /// <summary>
        /// Maximum crawl depth from the starting URL. Set to 0 for unlimited depth.
        /// </summary>
        [DefaultValue(0)]
        [Range(0, 100, ErrorMessage = "MaxCrawlDepth must be between 0 and 100")]
        public int MaxCrawlDepth { get; set; } = 0;

        /// <summary>
        /// Timeout in milliseconds for each page navigation. Applies to both Playwright and HttpClient fallback.
        /// Set to 0 to use Playwright's default timeout (30 seconds).
        /// </summary>
        [DefaultValue(30000)]
        [Range(0, 300000, ErrorMessage = "PageTimeoutMs must be between 0 and 300000 (5 minutes)")]
        public int PageTimeoutMs { get; set; } = 30000;

        /// <summary>
        /// Minimum delay in milliseconds between consecutive requests to the same external domain.
        /// Applies to HEAD requests for external links and resources. Set to 0 to disable.
        /// </summary>
        [DefaultValue(200)]
        [Range(0, 10000, ErrorMessage = "ExternalRequestDelayMs must be between 0 and 10000 (10 seconds)")]
        public int ExternalRequestDelayMs { get; set; } = 200;

        /// <summary>
        /// When true, automatically runs Playwright-based performance enrichment after each crawl completes.
        /// When false (default), enrichment must be triggered manually via the backoffice or API.
        /// </summary>
        [DefaultValue(false)]
        public bool AutoEnrichAfterCrawl { get; set; } = false;
    }
}
