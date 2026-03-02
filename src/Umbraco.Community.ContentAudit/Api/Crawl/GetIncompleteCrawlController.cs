using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Api.Crawl
{
    public class GetIncompleteCrawlController : CrawlControllerBase
    {
        private readonly IAuditRepository _auditRepository;

        public GetIncompleteCrawlController(
            IAuditService auditService,
            IAuditRepository auditRepository) : base(auditService)
        {
            _auditRepository = auditRepository;
        }

        [HttpGet("incomplete")]
        [ProducesResponseType(typeof(IncompleteCrawlDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> GetIncompleteCrawl()
        {
            var overview = await _auditRepository.GetIncompleteAudit();
            if (overview == null)
                return NoContent();

            return Ok(new IncompleteCrawlDto
            {
                Key = overview.Key,
                RunDate = overview.RunDate,
                Total = overview.Total,
                TotalInternal = overview.TotalInternal
            });
        }
    }
}
