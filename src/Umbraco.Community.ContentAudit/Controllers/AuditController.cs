using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.ViewModels.Pagination;
using Umbraco.Cms.Core.Models;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Controllers
{
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "Audit")]
    public class AuditController : ContentAuditControllerBase
    {
        private readonly IDataService _auditService;

        public AuditController(
            IDataService auditService)
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
        [ProducesResponseType(typeof(PagedViewModel<InternalPageGroupDto>), 200)]
        public async Task<PagedViewModel<InternalPageGroupDto>> GetDuplicateContentUrls(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20,
            string filter = "")
        {
            var latestData = await _auditService.GetDuplicateContentUrls(filter);

            var viewModel = new PagedViewModel<InternalPageGroupDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
            };

            return viewModel;
        }

        [HttpGet("missing-metadata")]
        [ProducesResponseType(typeof(PagedViewModel<InternalPageDto>), 200)]
        public async Task<PagedViewModel<InternalPageDto>> GetPagesWithMissingMetadata(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20,
            string filter = "")
        {
            var latestData = await _auditService.GetPagesWithMissingMetadata(filter);

            var viewModel = new PagedViewModel<InternalPageDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
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
            var orderedIssues = allIssues.OrderByDescending(x => x.PercentOfTotal).ToList();

            var viewModel = new PagedViewModel<IssueDto>
            {
                Total = orderedIssues.Count(),
                Items = orderedIssues.Skip(skip).Take(take)
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
        [ProducesResponseType(typeof(PagedViewModel<PageAnalysisDto>), 200)]
        public async Task<PagedViewModel<PageAnalysisDto>> GetLatestAuditData(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20,
            string filter = "",
            int statusCode = 0)
        {
            var latestData = await _auditService.GetLatestAuditData(filter, statusCode);

            var viewModel = new PagedViewModel<PageAnalysisDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
            };

            return viewModel;
        }

        [HttpGet("orphaned-pages")]
        [ProducesResponseType(typeof(PagedViewModel<InternalPageDto>), 200)]
        public async Task<PagedViewModel<InternalPageDto>> GetOrphanedPages(int skip = 0, int take = 20, string filter = "")
        {
            var latestData = await _auditService.GetOrphanedPages(filter);

            var viewModel = new PagedViewModel<InternalPageDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
            };

            return viewModel;
        }

        [HttpGet("all-images")]
        [ProducesResponseType(typeof(PagedViewModel<ImageDto>), 200)]
        public async Task<PagedViewModel<ImageDto>> GetAllImages(int skip = 0, int take = 20, string filter = "")
        {
            var latestData = await _auditService.GetAllImages(filter);

            var viewModel = new PagedViewModel<ImageDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
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
            var latestData = await _auditService.GetExternalLinks(filter);

            var viewModel = new PagedViewModel<ExternalPageGroupDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
            };

            return viewModel;
        }

        [HttpGet("internal-links")]
        [ProducesResponseType(typeof(PagedViewModel<InternalPageGroupDto>), 200)]
        public async Task<PagedViewModel<InternalPageGroupDto>> GetInteralLinks(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20,
            string filter = "")
        {
            var latestData = await _auditService.GetInternalLinks(filter);

            var viewModel = new PagedViewModel<InternalPageGroupDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
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
