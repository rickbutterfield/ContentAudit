using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Controllers
{
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "Audit")]
    public class AuditController : ContentAuditControllerBase
    {
        private readonly IAuditService _auditService;

        public AuditController(
            IAuditService auditService)
        {
            _auditService = auditService;
        }

        [HttpGet("latest-audit")]
        [ProducesResponseType(typeof(AuditOverviewDto), 200)]
        public async Task<AuditOverviewDto> GetLatestAuditOverview()
        {
            return await _auditService.GetLatestAuditOverview();
        }

        [HttpGet("duplicate-content")]
        [ProducesResponseType(typeof(Dictionary<string, List<PageResponseDto>>), 200)]
        public async Task<Dictionary<string, List<PageResponseDto>>> GetDuplicateContentUrls()
        {
            return await _auditService.GetDuplicateContentUrls();
        }

        [HttpGet("missing-metadata")]
        [ProducesResponseType(typeof(List<PageResponseDto>), 200)]
        public async Task<List<PageResponseDto>> GetPagesWithMissingMetadata()
        {
            return await _auditService.GetPagesWithMissingMetadata();
        }

        [HttpGet("all-issues")]
        [ProducesResponseType(typeof(List<AuditIssueDto>), 200)]
        public async Task<List<AuditIssueDto>> GetAllIssues()
        {
            var allIssues = await _auditService.GetAllIssues();
            return allIssues.OrderByDescending(x => x.PriorityScore).ToList();
        }

        [HttpGet("health-score")]
        [ProducesResponseType(typeof(HealthScoreDto), 200)]
        public async Task<HealthScoreDto> GetHealthScore()
        {
            return await _auditService.GetHealthScore();
        }
    }
}
