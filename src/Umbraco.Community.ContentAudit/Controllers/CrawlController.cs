using Asp.Versioning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Controllers
{
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "Crawl")]
    public class CrawlController : ContentAuditControllerBase
    {
        private readonly IAuditService _auditService;

        public CrawlController(
            IAuditService auditService)
        {
            _auditService = auditService;
        }

        [HttpGet("start-crawl")]
        [Produces("text/event-stream")]
        [ProducesResponseType(typeof(List<CrawlDto>), 200)]
        public async Task StartCrawl(CancellationToken cancellationToken)
        {
            Response.ContentType = "text/event-stream";
            Response.StatusCode = 200;

            string absoluteRootUrl = $"{Request.Scheme}://{Request.Host}";

            try
            {
                await foreach (var page in _auditService.StartCrawl(absoluteRootUrl, cancellationToken))
                {
                    var json = JsonSerializer.Serialize(page);

                    await Response.WriteAsync($"data: {json}\n\n", cancellationToken);
                    await Response.Body.FlushAsync(cancellationToken);
                }

                await Response.WriteAsync("event: end\n\n", cancellationToken);
                await Response.Body.FlushAsync(cancellationToken);
            }
            catch (OperationCanceledException)
            {
                await Response.WriteAsync("event: cancel\n\n", cancellationToken);
                await Response.Body.FlushAsync(cancellationToken);
            }
            finally
            {
                await Response.CompleteAsync();
            }
        }
    }
}
