using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    /// <summary>
    /// Service that runs Playwright-based performance enrichment on a completed audit
    /// </summary>
    public interface IEnrichmentService
    {
        /// <summary>
        /// Enriches all pages in the specified audit with Playwright performance data (Core Web Vitals, etc.)
        /// </summary>
        /// <param name="auditKey">The audit to enrich</param>
        /// <param name="absoluteRootUrl">The absolute root URL of the site, used to resolve relative URLs</param>
        /// <param name="cancellationToken">Cancellation token</param>
        Task EnrichAuditAsync(Guid auditKey, string absoluteRootUrl, CancellationToken cancellationToken = default);

        /// <summary>
        /// Enriches a single page with Playwright performance data (Core Web Vitals, etc.)
        /// </summary>
        /// <param name="auditKey">The audit the page belongs to</param>
        /// <param name="url">The URL to enrich</param>
        /// <param name="pageUnique">The unique identifier of the page</param>
        /// <param name="absoluteRootUrl">The absolute root URL of the site</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>The performance data if enrichment succeeded, otherwise null</returns>
        Task<PerformanceDto?> EnrichPageAsync(Guid auditKey, string url, Guid pageUnique, string absoluteRootUrl, CancellationToken cancellationToken = default);
    }
}
