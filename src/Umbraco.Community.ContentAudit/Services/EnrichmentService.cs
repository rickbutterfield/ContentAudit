using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Umbraco.Community.ContentAudit.Configuration;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Services
{
    /// <summary>
    /// Runs Playwright-based performance enrichment on pages from a completed audit.
    /// Only updates PerformanceSchema; all other data from the original crawl is preserved.
    /// </summary>
    public class EnrichmentService : IEnrichmentService
    {
        private readonly IAuditRepository _auditRepository;
        private readonly ICrawlService _crawlService;
        private readonly ICrawlResultPersistence _persistence;
        private readonly IEnrichmentStateManager _stateManager;
        private readonly ILogger<EnrichmentService> _logger;
        private readonly ContentAuditSettings _settings;

        public EnrichmentService(
            IAuditRepository auditRepository,
            ICrawlService crawlService,
            ICrawlResultPersistence persistence,
            IEnrichmentStateManager stateManager,
            IOptions<ContentAuditSettings> settings,
            ILogger<EnrichmentService> logger)
        {
            _auditRepository = auditRepository;
            _crawlService = crawlService;
            _persistence = persistence;
            _stateManager = stateManager;
            _logger = logger;
            _settings = settings.Value;
        }

        /// <inheritdoc/>
        public async Task EnrichAuditAsync(Guid auditKey, string absoluteRootUrl, CancellationToken cancellationToken = default)
        {
            var overview = await _auditRepository.GetAuditOverview(auditKey);
            if (overview is null)
            {
                _logger.LogWarning("Enrichment requested for unknown audit key {AuditKey}", auditKey);
                _stateManager.FailEnrichment($"Audit {auditKey} not found");
                return;
            }

            var baseUrl = overview.BaseUrl ?? absoluteRootUrl;
            Uri baseUri;
            try
            {
                baseUri = new Uri(baseUrl);
            }
            catch (UriFormatException)
            {
                _stateManager.FailEnrichment($"Invalid base URL: {baseUrl}");
                return;
            }

            var pages = (await _auditRepository.GetPagesByAuditKey(auditKey))
                .Where(p => !p.IsAsset && !p.Redirect && p.StatusCode < 400)
                .ToList();

            await _persistence.DeletePerformanceDataAsync(auditKey, cancellationToken);

            var performanceBatch = new List<PerformanceDto>();
            int batchSize = 50;

            foreach (var page in pages)
            {
                if (cancellationToken.IsCancellationRequested)
                    break;

                if (string.IsNullOrWhiteSpace(page.Url))
                    continue;

                PageAnalysisDto? analysis = null;
                try
                {
                    analysis = await _crawlService.GetPageAnalysis(page.Url, baseUri, page.Unique);
                }
                catch (Exception ex)
                {
                    _logger.LogDebug(ex, "Playwright enrichment failed for {Url}, skipping", page.Url);
                }

                var crawlDto = new CrawlDto
                {
                    Url = page.Url,
                    Unique = page.Unique,
                    Crawled = analysis is not null,
                    External = false,
                    Asset = false
                };

                _stateManager.AddResult(crawlDto);

                if (analysis?.PerformanceData?.PageLoadTime.HasValue == true)
                {
                    analysis.PerformanceData.AuditKey = auditKey;
                    analysis.PerformanceData.Url = page.Url;
                    performanceBatch.Add(analysis.PerformanceData);
                }

                if (performanceBatch.Count >= batchSize)
                {
                    await _persistence.SavePerformanceAsync(auditKey, performanceBatch, cancellationToken);
                    performanceBatch.Clear();
                }
            }

            if (performanceBatch.Count > 0)
            {
                await _persistence.SavePerformanceAsync(auditKey, performanceBatch, cancellationToken);
            }

            await _persistence.SetIsEnrichedAsync(auditKey, cancellationToken);
        }

        /// <inheritdoc/>
        public async Task<PerformanceDto?> EnrichPageAsync(Guid auditKey, string url, Guid pageUnique, string absoluteRootUrl, CancellationToken cancellationToken = default)
        {
            var overview = await _auditRepository.GetAuditOverview(auditKey);
            if (overview is null)
            {
                _logger.LogWarning("Per-page enrichment requested for unknown audit key {AuditKey}", auditKey);
                return null;
            }

            var baseUrl = overview.BaseUrl ?? absoluteRootUrl;
            Uri baseUri;
            try
            {
                baseUri = new Uri(baseUrl);
            }
            catch (UriFormatException)
            {
                _logger.LogWarning("Invalid base URL for per-page enrichment: {BaseUrl}", baseUrl);
                return null;
            }

            PageAnalysisDto? analysis = null;
            try
            {
                analysis = await _crawlService.GetPageAnalysis(url, baseUri, pageUnique);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Playwright per-page enrichment failed for {Url}", url);
                return null;
            }

            if (analysis?.PerformanceData?.PageLoadTime.HasValue != true)
                return null;

            analysis.PerformanceData.AuditKey = auditKey;
            analysis.PerformanceData.Url = url;

            await _persistence.DeletePerformanceDataForUrlAsync(auditKey, url, cancellationToken);
            await _persistence.SavePerformanceAsync(auditKey, [analysis.PerformanceData], cancellationToken);

            return analysis.PerformanceData;
        }
    }
}
