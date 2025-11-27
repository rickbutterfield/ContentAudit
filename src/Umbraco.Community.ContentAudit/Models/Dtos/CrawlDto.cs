using System.Text.Json.Serialization;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    /// <summary>
    /// Data transfer object representing information about a crawled URL.
    /// </summary>
    /// <remarks>
    /// This DTO encapsulates metadata about a single URL encountered during a site crawl,
    /// including its classification (external, asset, etc.) and crawl status.
    /// </remarks>
    public class CrawlDto
    {
        /// <summary>
        /// Gets or sets the URL that was crawled.
        /// </summary>
        [JsonPropertyName("url")]
        public string? Url { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the URL is external to the current domain.
        /// </summary>
        [JsonPropertyName("external")]
        public bool External { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the URL points to a static asset (CSS, JavaScript, image, etc.).
        /// </summary>
        [JsonPropertyName("asset")]
        public bool Asset { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the URL was successfully crawled.
        /// </summary>
        [JsonPropertyName("crawled")]
        public bool Crawled { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the URL was blocked by robots.txt or other restrictions.
        /// </summary>
        [JsonPropertyName("blocked")]
        public bool Blocked { get; set; }

        /// <summary>
        /// Gets or sets a unique identifier for this crawl entry.
        /// </summary>
        [JsonPropertyName("unique")]
        public Guid Unique { get; set; }
    }
}
