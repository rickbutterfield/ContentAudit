using Asp.Versioning;
using CsvHelper;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using Umbraco.Cms.Api.Common.ViewModels.Pagination;
using Umbraco.Community.ContentAudit.ClassMaps;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Controllers
{
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "Audit")]
    public class AuditController : ContentAuditControllerBase
    {
        private readonly IDataService _dataService;

        public AuditController(
            IDataService dataService)
        {
            _dataService = dataService;
        }

        [HttpGet("latest-audit")]
        [ProducesResponseType(typeof(OverviewDto), 200)]
        public async Task<OverviewDto> GetLatestAuditOverview()
        {
            return await _dataService.GetLatestAuditOverview();
        }

        [HttpGet("duplicate-content")]
        [ProducesResponseType(typeof(PagedViewModel<PageDto>), 200)]
        public async Task<PagedViewModel<PageDto>> GetDuplicateContentUrls(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20,
            string filter = "")
        {
            var latestData = await _dataService.GetDuplicateContentUrls(filter);

            var viewModel = new PagedViewModel<PageDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
            };

            return viewModel;
        }

        [HttpGet("missing-metadata")]
        [ProducesResponseType(typeof(PagedViewModel<PageAnalysisDto>), 200)]
        public async Task<PagedViewModel<PageAnalysisDto>> GetPagesWithMissingMetadata(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20,
            string filter = "")
        {
            var latestData = await _dataService.GetPagesWithMissingMetadata(filter);

            var viewModel = new PagedViewModel<PageAnalysisDto>
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
            var allIssues = await _dataService.GetAllIssues();
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
            return await _dataService.GetIssue(issueGuid);
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
            var latestData = await _dataService.GetLatestAuditData(filter, statusCode);

            var viewModel = new PagedViewModel<PageAnalysisDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
            };

            return viewModel;
        }

        [HttpGet("latest-page-data")]
        [ProducesResponseType(typeof(PageAnalysisDto), 200)]
        public async Task<PageAnalysisDto> GetLatestPageAuditData(
            CancellationToken cancellationToken,
            Guid unique)
            {
                var latestData = await _dataService.GetLatestPageAuditData(unique);
                return latestData;
            }

        [HttpGet("orphaned-pages")]
        [ProducesResponseType(typeof(PagedViewModel<PageDto>), 200)]
        public async Task<PagedViewModel<PageDto>> GetOrphanedPages(int skip = 0, int take = 20, string filter = "")
        {
            var latestData = await _dataService.GetOrphanedPages(filter);

            var viewModel = new PagedViewModel<PageDto>
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
            var latestData = await _dataService.GetAllImages(filter);

            var viewModel = new PagedViewModel<ImageDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
            };

            return viewModel;
        }

        [HttpGet("external-links")]
        [ProducesResponseType(typeof(PagedViewModel<LinkGroupDto>), 200)]
        public async Task<PagedViewModel<LinkGroupDto>> GetExternalLinks(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20,
            string filter = "")
        {
            var latestData = await _dataService.GetExternalLinks(filter);

            var viewModel = new PagedViewModel<LinkGroupDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
            };

            return viewModel;
        }

        [HttpGet("internal-links")]
        [ProducesResponseType(typeof(PagedViewModel<LinkGroupDto>), 200)]
        public async Task<PagedViewModel<LinkGroupDto>> GetInteralLinks(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20,
            string filter = "")
        {
            var latestData = await _dataService.GetInternalLinks(filter);

            var viewModel = new PagedViewModel<LinkGroupDto>
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
            return await _dataService.GetHealthScore();
        }

        [HttpGet("export")]
        [ProducesResponseType(typeof(FileResult), 200, "text/csv")]
        public async Task<FileResult> GetExportData()
        {
            var data = await _dataService.GetExportData();

            using (var memoryStream = new MemoryStream())
            {
                using (var streamWriter = new StreamWriter(memoryStream))
                using (var csv = new CsvWriter(streamWriter, CultureInfo.InvariantCulture))
                {
                    csv.Context.RegisterClassMap<PageDtoMap>();
                    csv.Context.RegisterClassMap<SeoDtoMap>();
                    csv.Context.RegisterClassMap<ContentAnalysisDtoMap>();
                    csv.Context.RegisterClassMap<PerformanceDtoMap>();
                    csv.Context.RegisterClassMap<AccessibilityDtoMap>();
                    csv.Context.RegisterClassMap<TechnicalSeoDtoMap>();
                    csv.Context.RegisterClassMap<SocialMediaDtoMap>();
                    csv.Context.RegisterClassMap<ContentQualityDtoMap>();
                    csv.Context.RegisterClassMap<EmissionsDtoMap>();

                    csv.WriteRecords(data);
                }

                return File(memoryStream.ToArray(), "text/csv", $"Export-{DateTime.Now.ToString("s")}.csv");
            }
        }
    }
}
