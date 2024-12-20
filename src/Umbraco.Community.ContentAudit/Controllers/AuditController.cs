using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Umbraco.AuthorizedServices.Services;
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
        [ProducesResponseType(typeof(OverviewDto), 200)]
        public async Task<OverviewDto> GetLatestAuditOverview()
        {
            return await _auditService.GetLatestAuditOverview();
        }

        [HttpGet("duplicate-content")]
        [ProducesResponseType(typeof(Dictionary<string, List<InternalPageDto>>), 200)]
        public async Task<Dictionary<string, List<InternalPageDto>>> GetDuplicateContentUrls()
        {
            return await _auditService.GetDuplicateContentUrls();
        }

        [HttpGet("missing-metadata")]
        [ProducesResponseType(typeof(PagedViewModel<InternalPageDto>), 200)]
        public async Task<PagedViewModel<InternalPageDto>> GetPagesWithMissingMetadata(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20,
            string filter = "")
        {
            var latestData = await _auditService.GetPagesWithMissingMetadata(skip, take, filter);

            var pagedModel = new PagedModel<InternalPageDto>
            {
                Total = latestData.Count(),
                Items = latestData
            };

            var viewModel = new PagedViewModel<InternalPageDto>
            {
                Total = pagedModel.Total,
                Items = pagedModel.Items
            };

            return viewModel;
        }

        [HttpGet("all-issues")]
        [ProducesResponseType(typeof(PagedViewModel<IssueDto>), 200)]
        public async Task<PagedViewModel<IssueDto>> GetAllIssues(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20)
        {
            var allIssues = await _auditService.GetAllIssues();
            var orderedIssues = allIssues.OrderByDescending(x => x.PriorityScore).ToList();

            var pagedModel = new PagedModel<IssueDto>
            {
                Total = orderedIssues.Count(),
                Items = orderedIssues.Skip(skip).Take(take)
            };

            var viewModel = new PagedViewModel<IssueDto>
            {
                Total = pagedModel.Total,
                Items = pagedModel.Items
            };

            return viewModel;
        }

        [HttpGet("issue")]
        [ProducesResponseType(typeof(IssueDto), 200)]
        public async Task<IssueDto?> GetIssue(Guid issueGuid)
        {
            return await _auditService.GetIssue(issueGuid);
        }

        [HttpGet("latest-data")]
        [ProducesResponseType(typeof(PagedViewModel<InternalPageDto>), 200)]
        public async Task<PagedViewModel<InternalPageDto>> GetLatestAuditData(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20,
            string filter = "",
            int statusCode = 0)
        {
            var latestData = await _auditService.GetLatestAuditData(skip, take, filter, statusCode);

            var pagedModel = new PagedModel<InternalPageDto>
            {
                Total = latestData.Count(),
                Items = latestData
            };

            var viewModel = new PagedViewModel<InternalPageDto>
            {
                Total = pagedModel.Total,
                Items = pagedModel.Items
            };

            return viewModel;
        }

        [HttpGet("orphaned-pages")]
        [ProducesResponseType(typeof(PagedViewModel<InternalPageDto>), 200)]
        public async Task<PagedViewModel<InternalPageDto>> GetOrphanedPages(int skip = 0, int take = 20, string filter = "")
        {
            var data = await _auditService.GetOrphanedPages(skip, take, filter);

            var pagedModel = new PagedModel<InternalPageDto>
            {
                Total = data.Count(),
                Items = data
            };

            var viewModel = new PagedViewModel<InternalPageDto>
            {
                Total = pagedModel.Total,
                Items = pagedModel.Items
            };

            return viewModel;
        }

        [HttpGet("all-images")]
        [ProducesResponseType(typeof(PagedViewModel<ImageDto>), 200)]
        public async Task<PagedViewModel<ImageDto>> GetAllImages(int skip = 0, int take = 20, string filter = "")
        {
            var data = await _auditService.GetAllImages(skip, take, filter);

            var pagedModel = new PagedModel<ImageDto>
            {
                Total = data.Count(),
                Items = data
            };

            var viewModel = new PagedViewModel<ImageDto>
            {
                Total = pagedModel.Total,
                Items = pagedModel.Items
            };

            return viewModel;
        }

        [HttpGet("external-links")]
        [ProducesResponseType(typeof(PagedViewModel<ExternalPageGroupDto>), 200)]
        public async Task<PagedViewModel<ExternalPageGroupDto>> GetExternalLinks(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20,
            string filter = "")
        {
            var latestData = await _auditService.GetExternalLinks(skip, take, filter);

            var pagedModel = new PagedModel<ExternalPageGroupDto>
            {
                Total = latestData.Count(),
                Items = latestData
            };

            var viewModel = new PagedViewModel<ExternalPageGroupDto>
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
