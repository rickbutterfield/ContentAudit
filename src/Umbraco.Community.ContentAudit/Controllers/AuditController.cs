using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.ViewModels.Pagination;
using Umbraco.Cms.Core.Models;
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
        [ProducesResponseType(typeof(PagedViewModel<AuditIssueDto>), 200)]
        public async Task<PagedViewModel<AuditIssueDto>> GetAllIssues(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20)
        {
            var allIssues = await _auditService.GetAllIssues();
            var orderedIssues = allIssues.OrderByDescending(x => x.PriorityScore).ToList();

            var pagedModel = new PagedModel<AuditIssueDto>
            {
                Total = orderedIssues.Count(),
                Items = orderedIssues.Skip(skip).Take(take)
            };

            var viewModel = new PagedViewModel<AuditIssueDto>
            {
                Total = pagedModel.Total,
                Items = pagedModel.Items
            };

            return viewModel;
        }

        [HttpGet("latest-data")]
        [ProducesResponseType(typeof(PagedViewModel<PageResponseDto>), 200)]
        public async Task<PagedViewModel<PageResponseDto>> GetLatestAuditData(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20)
        {
            var latestData = await _auditService.GetLatestAuditData(skip, take);

            var pagedModel = new PagedModel<PageResponseDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
            };

            var viewModel = new PagedViewModel<PageResponseDto>
            {
                Total = pagedModel.Total,
                Items = pagedModel.Items
            };

            return viewModel;
        }

        [HttpGet("health-score")]
        [ProducesResponseType(typeof(HealthScoreDto), 200)]
        public async Task<HealthScoreDto> GetHealthScore()
        {
            return await _auditService.GetHealthScore();
        }
    }
}
