using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    /// <summary>
    /// Abstraction for persisting crawl results
    /// </summary>
    public interface ICrawlResultPersistence
    {
        /// <summary>
        /// Creates a new audit record in InProgress status and returns its key
        /// </summary>
        Task<Guid> CreateAuditAsync(string baseUrl, CancellationToken cancellationToken = default);

        /// <summary>
        /// Gets an incomplete (InProgress) audit for the given base URL, if one exists
        /// </summary>
        Task<Guid?> GetIncompleteAuditAsync(string baseUrl, CancellationToken cancellationToken = default);

        /// <summary>
        /// Updates the audit totals
        /// </summary>
        Task UpdateAuditTotalsAsync(Guid auditKey, AuditMetadata metadata, CancellationToken cancellationToken = default);

        /// <summary>
        /// Saves page data for an audit
        /// </summary>
        Task SavePagesAsync(Guid auditKey, IEnumerable<PageDto> pages, CancellationToken cancellationToken = default);

        /// <summary>
        /// Saves SEO data for an audit
        /// </summary>
        Task SaveSeoDataAsync(Guid auditKey, IEnumerable<SeoDto> seoData, IEnumerable<LinkDto> internalLinks, CancellationToken cancellationToken = default);

        /// <summary>
        /// Saves content analysis data for an audit
        /// </summary>
        Task SaveContentAnalysisAsync(Guid auditKey, IEnumerable<ContentAnalysisDto> data, CancellationToken cancellationToken = default);

        /// <summary>
        /// Saves performance data for an audit
        /// </summary>
        Task SavePerformanceAsync(Guid auditKey, IEnumerable<PerformanceDto> data, CancellationToken cancellationToken = default);

        /// <summary>
        /// Saves accessibility data for an audit
        /// </summary>
        Task SaveAccessibilityAsync(Guid auditKey, IEnumerable<AccessibilityDto> data, CancellationToken cancellationToken = default);

        /// <summary>
        /// Saves technical SEO data for an audit
        /// </summary>
        Task SaveTechnicalSeoAsync(Guid auditKey, IEnumerable<TechnicalSeoDto> data, CancellationToken cancellationToken = default);

        /// <summary>
        /// Saves social media data for an audit
        /// </summary>
        Task SaveSocialMediaAsync(Guid auditKey, IEnumerable<SocialMediaDto> data, CancellationToken cancellationToken = default);

        /// <summary>
        /// Saves content quality data for an audit
        /// </summary>
        Task SaveContentQualityAsync(Guid auditKey, IEnumerable<ContentQualityDto> data, CancellationToken cancellationToken = default);

        /// <summary>
        /// Saves image data for an audit
        /// </summary>
        Task SaveImagesAsync(Guid auditKey, IEnumerable<ImageDto> images, CancellationToken cancellationToken = default);

        /// <summary>
        /// Saves resource data for an audit
        /// </summary>
        Task SaveResourcesAsync(Guid auditKey, IEnumerable<ResourceDto> resources, CancellationToken cancellationToken = default);

        /// <summary>
        /// Saves link data for an audit
        /// </summary>
        Task SaveLinksAsync(Guid auditKey, IEnumerable<LinkDto> links, CancellationToken cancellationToken = default);

        /// <summary>
        /// Completes an audit with the final health score
        /// </summary>
        Task CompleteAuditAsync(Guid auditKey, double healthScore, CancellationToken cancellationToken = default);

        /// <summary>
        /// Marks an audit as failed
        /// </summary>
        Task FailAuditAsync(Guid auditKey, CancellationToken cancellationToken = default);

        /// <summary>
        /// Saves the current crawl state for resume support
        /// </summary>
        Task SaveCrawlStateAsync(Guid auditKey, CrawlState state, CancellationToken cancellationToken = default);

        /// <summary>
        /// Loads the crawl state for resuming an audit
        /// </summary>
        Task<CrawlState?> LoadCrawlStateAsync(Guid auditKey, CancellationToken cancellationToken = default);

        /// <summary>
        /// Deletes the crawl state after successful completion
        /// </summary>
        Task DeleteCrawlStateAsync(Guid auditKey, CancellationToken cancellationToken = default);

        /// <summary>
        /// Gets a page fingerprint by URL
        /// </summary>
        Task<PageFingerprintDto?> GetPageFingerprintAsync(string url, CancellationToken cancellationToken = default);

        /// <summary>
        /// Gets all page fingerprints for a base URL
        /// </summary>
        Task<Dictionary<string, PageFingerprintDto>> GetPageFingerprintsAsync(string baseUrl, CancellationToken cancellationToken = default);

        /// <summary>
        /// Saves or updates a page fingerprint
        /// </summary>
        Task SavePageFingerprintAsync(Guid auditKey, PageFingerprintDto fingerprint, CancellationToken cancellationToken = default);

        /// <summary>
        /// Saves or updates multiple page fingerprints
        /// </summary>
        Task SavePageFingerprintsAsync(Guid auditKey, IEnumerable<PageFingerprintDto> fingerprints, CancellationToken cancellationToken = default);
    }

    /// <summary>
    /// Metadata for updating audit totals
    /// </summary>
    public record AuditMetadata(
        int TotalUrls,
        int TotalInternal,
        int TotalExternal,
        int TotalAssets,
        int TotalBlocked);

    /// <summary>
    /// Crawl state for resume support
    /// </summary>
    public record CrawlState(
        IEnumerable<string> VisitedUrls,
        IEnumerable<UrlQueueItem> PendingUrls,
        IEnumerable<string> DisallowedPaths);
}
