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
    }
}
