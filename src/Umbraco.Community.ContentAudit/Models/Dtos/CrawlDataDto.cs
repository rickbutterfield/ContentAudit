namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    /// <summary>
    /// Data transfer object representing a crawl event with associated URL data.
    /// </summary>
    /// <remarks>
    /// This DTO is used to communicate crawl progress and results, typically in real-time
    /// updates or event-based communications during a site crawl operation.
    /// </remarks>
    public class CrawlDataDto
    {
        /// <summary>
        /// Gets or sets the type of crawl event (e.g., "page-crawled", "error", "blocked").
        /// </summary>
        public string? EventType { get; set; }

        /// <summary>
        /// Gets or sets the crawl data associated with this event.
        /// </summary>
        public CrawlDto? CrawlData { get; set; }
    }
}
