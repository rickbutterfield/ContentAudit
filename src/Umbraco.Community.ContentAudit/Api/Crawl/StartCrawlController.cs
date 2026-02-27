using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Api.Crawl
{
    public class StartCrawlController : CrawlControllerBase
    {
        private readonly ICrawlStateManager _crawlStateManager;
        private readonly IServiceScopeFactory _serviceScopeFactory;

        public StartCrawlController(
            IAuditService auditService,
            ICrawlStateManager crawlStateManager,
            IServiceScopeFactory serviceScopeFactory) : base(auditService)
        {
            _crawlStateManager = crawlStateManager;
            _serviceScopeFactory = serviceScopeFactory;
        }

        [HttpPost("start")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public IActionResult StartCrawl()
        {
            if (_crawlStateManager.IsRunning)
            {
                return Conflict(new ProblemDetails
                {
                    Status = StatusCodes.Status409Conflict,
                    Title = "Crawl already running",
                    Detail = "A crawl is already in progress. Cancel it first before starting a new one."
                });
            }

            string absoluteRootUrl = $"{Request.Scheme}://{Request.Host}";

            _crawlStateManager.StartCrawl();

            _ = Task.Run(async () =>
            {
                using var scope = _serviceScopeFactory.CreateScope();
                var auditService = scope.ServiceProvider.GetRequiredService<IAuditService>();
                var cancellationToken = _crawlStateManager.GetCancellationToken();

                try
                {
                    await auditService.StartCrawl(absoluteRootUrl, cancellationToken);
                }
                catch (OperationCanceledException)
                {
                    // Already handled by AuditService/CrawlStateManager
                }
                catch (Exception)
                {
                    // Already handled by AuditService/CrawlStateManager
                }
            });

            return Accepted();
        }

        [HttpPost("cancel")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult CancelCrawl()
        {
            if (!_crawlStateManager.IsRunning)
            {
                return NotFound(new ProblemDetails
                {
                    Status = StatusCodes.Status404NotFound,
                    Title = "No crawl running",
                    Detail = "There is no active crawl to cancel."
                });
            }

            _crawlStateManager.CancelCrawl();
            return Ok();
        }

        [HttpGet("status")]
        [ProducesResponseType(typeof(CrawlStatusDto), StatusCodes.Status200OK)]
        public IActionResult GetCrawlStatus()
        {
            return Ok(new CrawlStatusDto
            {
                IsRunning = _crawlStateManager.IsRunning,
                Results = _crawlStateManager.CurrentResults
            });
        }
    }
}
