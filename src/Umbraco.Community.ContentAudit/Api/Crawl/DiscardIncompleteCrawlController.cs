using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Api.Crawl
{
    public class DiscardIncompleteCrawlController : CrawlControllerBase
    {
        private readonly IAuditRepository _auditRepository;
        private readonly ICrawlResultPersistence _persistence;

        public DiscardIncompleteCrawlController(
            IAuditService auditService,
            IAuditRepository auditRepository,
            ICrawlResultPersistence persistence) : base(auditService)
        {
            _auditRepository = auditRepository;
            _persistence = persistence;
        }

        [HttpDelete("incomplete/{id:guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DiscardIncompleteCrawl(Guid id)
        {
            await _persistence.DeleteCrawlStateAsync(id);
            var result = await _auditRepository.DeleteAuditByKey(id);

            return result ? Ok() : NotFoundProblem("Incomplete audit", id);
        }
    }
}
