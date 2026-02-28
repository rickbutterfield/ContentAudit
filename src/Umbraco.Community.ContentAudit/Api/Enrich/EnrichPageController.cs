using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Api.Enrich
{
    public class EnrichPageController : EnrichControllerBase
    {
        private readonly IEnrichmentService _enrichmentService;
        private readonly IEnrichmentStateManager _enrichmentStateManager;
        private readonly ICrawlStateManager _crawlStateManager;
        private readonly IAuditRepository _auditRepository;

        public EnrichPageController(
            IEnrichmentService enrichmentService,
            IEnrichmentStateManager enrichmentStateManager,
            ICrawlStateManager crawlStateManager,
            IAuditRepository auditRepository)
        {
            _enrichmentService = enrichmentService;
            _enrichmentStateManager = enrichmentStateManager;
            _crawlStateManager = crawlStateManager;
            _auditRepository = auditRepository;
        }

        [HttpPost("page")]
        [ProducesResponseType(typeof(PerformanceDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IActionResult> EnrichPage(
            [FromQuery] string url,
            [FromQuery] Guid pageUnique,
            [FromQuery] Guid? auditKey = null,
            CancellationToken cancellationToken = default)
        {
            if (_crawlStateManager.IsRunning)
            {
                return Conflict(new ProblemDetails
                {
                    Status = StatusCodes.Status409Conflict,
                    Title = "Crawl in progress",
                    Detail = "A crawl is currently running. Wait for it to complete before enriching."
                });
            }

            if (!_enrichmentStateManager.StartPageEnrichment(url))
            {
                return Conflict(new ProblemDetails
                {
                    Status = StatusCodes.Status409Conflict,
                    Title = "Enrichment already running",
                    Detail = "An enrichment is already in progress. Wait for it to complete before enriching another page."
                });
            }

            try
            {
                var resolvedKey = auditKey ?? await _auditRepository.GetLatestAuditKey();
                if (resolvedKey is null)
                {
                    _enrichmentStateManager.FailPageEnrichment(url);
                    return NotFound(new ProblemDetails
                    {
                        Status = StatusCodes.Status404NotFound,
                        Title = "No audit found",
                        Detail = "No completed audit exists to enrich."
                    });
                }

                string absoluteRootUrl = $"{Request.Scheme}://{Request.Host}";

                var result = await _enrichmentService.EnrichPageAsync(
                    resolvedKey.Value, url, pageUnique, absoluteRootUrl, cancellationToken);

                if (result is null)
                {
                    _enrichmentStateManager.FailPageEnrichment(url);
                    return NotFound(new ProblemDetails
                    {
                        Status = StatusCodes.Status404NotFound,
                        Title = "Enrichment failed",
                        Detail = $"Could not enrich page '{url}'. The page may not be accessible or Playwright may have failed."
                    });
                }

                _enrichmentStateManager.CompletePageEnrichment(url);
                return Ok(result);
            }
            catch
            {
                _enrichmentStateManager.FailPageEnrichment(url);
                throw;
            }
        }
    }
}
