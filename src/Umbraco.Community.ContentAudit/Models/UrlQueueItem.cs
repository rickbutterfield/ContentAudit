namespace Umbraco.Community.ContentAudit.Models
{
    /// <summary>
    /// Represents a URL item queued for processing during a crawl operation.
    /// </summary>
    /// <remarks>
    /// This class is used internally by the crawl system to maintain a queue of URLs
    /// that need to be visited and analyzed. It tracks metadata about each URL including
    /// whether it is external, an asset, and the source page from which it was discovered.
    /// </remarks>
    public class UrlQueueItem
    {
        /// <summary>
        /// Gets or sets the URL to be crawled.
        /// </summary>
        /// <remarks>
        /// This is the full or relative URL of the page or resource that has been queued for processing.
        /// </remarks>
        public string Url { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets a value indicating whether this URL points to an external domain.
        /// </summary>
        /// <remarks>
        /// When true, the URL references a different domain than the site being audited.
        /// External URLs may be handled differently during crawling based on configuration.
        /// </remarks>
        public bool IsExternal { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this URL represents a static asset.
        /// </summary>
        /// <remarks>
        /// When true, the URL references a non-HTML resource such as CSS, JavaScript, images, or other static files.
        /// Assets may be processed differently than HTML pages during the crawl.
        /// </remarks>
        public bool IsAsset { get; set; }

        /// <summary>
        /// Gets or sets the URL of the page from which this URL was discovered.
        /// </summary>
        /// <remarks>
        /// This tracks the parent page that contained the link or reference to this URL,
        /// useful for understanding the relationship between pages in the crawl.
        /// </remarks>
        public string SourceUrl { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets a unique identifier for this queue item.
        /// </summary>
        /// <remarks>
        /// This GUID is used to uniquely identify this queue item instance and prevent duplicate processing.
        /// </remarks>
        public Guid Unique { get; set; }

        /// <summary>
        /// Gets or sets the crawl depth of this URL from the starting point.
        /// </summary>
        /// <remarks>
        /// Depth 0 represents the initial seed URLs. Each subsequent level of discovered links increments the depth.
        /// Used to enforce maximum crawl depth limits.
        /// </remarks>
        public int Depth { get; set; }
    }
}
