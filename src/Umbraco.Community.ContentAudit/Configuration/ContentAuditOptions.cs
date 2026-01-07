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
        [DefaultValue("")]
        [Url(ErrorMessage = "SitemapUrl must be a valid URL")]
        public string SitemapUrl { get; set; } = "";

        /// <summary>
        /// Maximum number of concurrent crawl tasks.
        /// </summary>
        [DefaultValue(4)]
        [Range(1, 20, ErrorMessage = "MaxConcurrentCrawls must be between 1 and 20")]
        public int MaxConcurrentCrawls { get; set; } = 4;

        /// <summary>
        /// Base URL for the site under audit.
        /// </summary>
        [DefaultValue("")]
        [Url(ErrorMessage = "BaseUrl must be a valid URL")]
        public string BaseUrl { get; set; } = string.Empty;

        /// <summary>
        /// Maximum duration in minutes for a crawl operation. Set to 0 for no limit.
        /// </summary>
        [DefaultValue(30)]
        [Range(0, 1440, ErrorMessage = "MaxCrawlDurationMinutes must be between 0 and 1440 (24 hours)")]
        public int MaxCrawlDurationMinutes { get; set; } = 30;
    }
}
