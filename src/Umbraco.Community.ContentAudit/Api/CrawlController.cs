using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Community.ContentAudit.Authorization;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Api
{
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "Crawl")]
    [Authorize(Policy = AuthorizationPolicies.SectionAccessContentAudit)]
    [Route($"{Constants.ManagementApi.RootPath}/crawl")]
    public class CrawlController : ContentAuditManagementApiControllerBase
    {
        private readonly IAuditService _auditService;

        public CrawlController(IAuditService auditService)
            => _auditService = auditService;

        [HttpGet]
        [Produces("text/event-stream")]
        [ProducesResponseType(typeof(CrawlDto), 200)]
        public async Task<ServerSentEventsResult<CrawlDto>> StartCrawl(CancellationToken cancellationToken)
        {
            string absoluteRootUrl = $"{Request.Scheme}://{Request.Host}";

            return TypedResults.ServerSentEvents(_auditService.StartCrawl(absoluteRootUrl, cancellationToken), "crawl");

            //Response.ContentType = "text/event-stream";
            //Response.StatusCode = 200;


            //List<CrawlDto> dtos = new();
            //try
            //{
            //    await foreach (var page in _auditService.StartCrawl(absoluteRootUrl, cancellationToken))
            //    {
            //        dtos.Add(page);
            //        var json = JsonSerializer.Serialize(page);

            //        await Response.WriteAsync($"data: {json}\n\n", cancellationToken);
            //        await Response.Body.FlushAsync(cancellationToken);
            //    }

            //    await Response.WriteAsync("event: end\n\n", cancellationToken);
            //    await Response.Body.FlushAsync(cancellationToken);
            //}
            //catch (OperationCanceledException)
            //{
            //    await Response.WriteAsync("event: cancel\n\n", cancellationToken);
            //    await Response.Body.FlushAsync(cancellationToken);
            //}
            //finally
            //{
            //    await Response.CompleteAsync();
            //}

            //return dtos;
        }
    }
}
