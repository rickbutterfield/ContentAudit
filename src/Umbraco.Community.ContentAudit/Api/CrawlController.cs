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
    /// <summary>
    /// Management API controller for initiating and monitoring audit crawl operations.
    /// </summary>
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "Crawl")]
    [Authorize(Policy = AuthorizationPolicies.SectionAccessContentAudit)]
    [Route($"{Constants.ManagementApi.RootPath}/crawl")]
    public class CrawlController : ContentAuditManagementApiControllerBase
    {
        private readonly IAuditService _auditService;

        /// <summary>
        /// Initializes a new instance of the <see cref="CrawlController"/> class.
        /// </summary>
        /// <param name="auditService">The audit service for performing crawl operations.</param>
        public CrawlController(IAuditService auditService)
            => _auditService = auditService;

        /// <summary>
        /// Starts a new audit crawl and streams progress updates via Server-Sent Events (SSE).
        /// </summary>
        /// <param name="cancellationToken">Cancellation token to stop the crawl operation.</param>
        /// <returns>A server-sent events stream of <see cref="CrawlDto"/> containing real-time crawl progress.</returns>
        /// <remarks>
        /// This endpoint uses Server-Sent Events to provide real-time updates about the crawl progress.
        /// Each event contains information about a URL being crawled, including whether it was successfully
        /// crawled, blocked, or is external/internal to the site.
        /// </remarks>
        [HttpGet]
        [Produces("text/event-stream")]
        [ProducesResponseType(typeof(CrawlDto), 200)]
        public async Task<ServerSentEventsResult<CrawlDto>> StartCrawl(CancellationToken cancellationToken)
        {
            string absoluteRootUrl = $"{Request.Scheme}://{Request.Host}";

            return TypedResults.ServerSentEvents(_auditService.StartCrawl(absoluteRootUrl, cancellationToken), "crawl");
        }
    }
}
