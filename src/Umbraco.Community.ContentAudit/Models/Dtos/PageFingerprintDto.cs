namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    /// <summary>
    /// Represents a page fingerprint for incremental crawl support
    /// </summary>
    public class PageFingerprintDto
    {
        /// <summary>
        /// Gets or sets the URL of the page
        /// </summary>
        public string Url { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the content hash (SHA256 of page body)
        /// </summary>
        public string? ContentHash { get; set; }

        /// <summary>
        /// Gets or sets the ETag from the server response
        /// </summary>
        public string? ETag { get; set; }

        /// <summary>
        /// Gets or sets the Last-Modified header from the server
        /// </summary>
        public DateTime? LastModified { get; set; }

        /// <summary>
        /// Gets or sets the Umbraco content update date (if applicable)
        /// </summary>
        public DateTime? UmbracoUpdateDate { get; set; }

        /// <summary>
        /// Gets or sets when this fingerprint was last updated
        /// </summary>
        public DateTime LastCrawled { get; set; }
    }
}
