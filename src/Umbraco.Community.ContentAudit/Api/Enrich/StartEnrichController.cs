using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Api.Enrich
{
    public class StartEnrichController : EnrichControllerBase
    {
        private readonly IEnrichmentStateManager _enrichmentStateManager;
        private readonly ICrawlStateManager _crawlStateManager;
        private readonly IAuditRepository _auditRepository;
        private readonly IServiceScopeFactory _serviceScopeFactory;

        public StartEnrichController(
            IEnrichmentStateManager enrichmentStateManager,
            ICrawlStateManager crawlStateManager,
            IAuditRepository auditRepository,
            IServiceScopeFactory serviceScopeFactory)
        {
            _enrichmentStateManager = enrichmentStateManager;
            _crawlStateManager = crawlStateManager;
            _auditRepository = auditRepository;
            _serviceScopeFactory = serviceScopeFactory;
        }

        [HttpPost("start")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> StartEnrich([FromQuery] Guid? auditKey = null)
        {
            if (_enrichmentStateManager.IsRunning)
            {
                return Conflict(new ProblemDetails
                {
                    Status = StatusCodes.Status409Conflict,
                    Title = "Enrichment already running",
                    Detail = "A performance enrichment is already in progress. Cancel it first before starting a new one."
                });
            }

            if (_crawlStateManager.IsRunning)
            {
                return Conflict(new ProblemDetails
                {
                    Status = StatusCodes.Status409Conflict,
                    Title = "Crawl in progress",
                    Detail = "A crawl is currently running. Wait for it to complete before enriching."
                });
            }

            var resolvedKey = auditKey ?? await _auditRepository.GetLatestAuditKey();

            if (resolvedKey is null)
            {
                return NotFound(new ProblemDetails
                {
                    Status = StatusCodes.Status404NotFound,
                    Title = "No audit found",
                    Detail = "No completed audit exists to enrich. Run a crawl first."
                });
            }

            var overview = await _auditRepository.GetAuditOverview(resolvedKey.Value);
            if (overview is null)
            {
                return NotFound(new ProblemDetails
                {
                    Status = StatusCodes.Status404NotFound,
                    Title = "Audit not found",
                    Detail = $"Audit {resolvedKey} was not found."
                });
            }

            string absoluteRootUrl = $"{Request.Scheme}://{Request.Host}";

            _enrichmentStateManager.StartEnrichment(resolvedKey.Value);

            _ = Task.Run(async () =>
            {
                using var scope = _serviceScopeFactory.CreateScope();
                var enrichmentService = scope.ServiceProvider.GetRequiredService<IEnrichmentService>();
                var cancellationToken = _enrichmentStateManager.GetCancellationToken();

                try
                {
                    await enrichmentService.EnrichAuditAsync(resolvedKey.Value, absoluteRootUrl, cancellationToken);
                    _enrichmentStateManager.CompleteEnrichment();
                }
                catch (OperationCanceledException)
                {
                    // Already handled by CancelEnrichment()
                }
                catch (Exception ex)
                {
                    _enrichmentStateManager.FailEnrichment(ex.Message);
                }
            });

            return Accepted();
        }

        [HttpPost("cancel")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult CancelEnrich()
        {
            if (!_enrichmentStateManager.IsRunning)
            {
                return NotFound(new ProblemDetails
                {
                    Status = StatusCodes.Status404NotFound,
                    Title = "No enrichment running",
                    Detail = "There is no active enrichment to cancel."
                });
            }

            _enrichmentStateManager.CancelEnrichment();
            return Ok();
        }

        [HttpGet("status")]
        [ProducesResponseType(typeof(EnrichStatusDto), StatusCodes.Status200OK)]
        public IActionResult GetEnrichStatus()
        {
            return Ok(new EnrichStatusDto
            {
                IsRunning = _enrichmentStateManager.IsRunning,
                AuditKey = _enrichmentStateManager.CurrentAuditKey,
                Results = _enrichmentStateManager.CurrentResults
            });
        }
    }
}
