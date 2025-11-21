using CsvHelper;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using Umbraco.Cms.Api.Common.ViewModels.Pagination;
using Umbraco.Community.ContentAudit.ClassMaps;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Api.Audit
{
    /// <summary>
    /// Management API controller for audit operations.
    /// </summary>
    public class AuditController : AuditControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AuditController"/> class.
        /// </summary>
        /// <param name="dataService">The data service for audit operations.</param>
        public AuditController(IDataService dataService)
            : base(dataService) { }

        /// <summary>
        /// Gets the latest audit overview containing summary statistics.
        /// </summary>
        /// <returns>An <see cref="OverviewDto"/> containing the latest audit overview data.</returns>
        [HttpGet("latest-audit")]
        [ProducesResponseType(typeof(OverviewDto), 200)]
        public async Task<OverviewDto> GetLatestAuditOverview()
        {
            return await DataService.GetLatestAuditOverview();
        }

        /// <summary>
        /// Gets a paginated list of URLs with duplicate content.
        /// </summary>
        /// <param name="cancellationToken">Cancellation token for the operation.</param>
        /// <param name="skip">Number of items to skip for pagination. Default is 0.</param>
        /// <param name="take">Number of items to take for pagination. Default is 20.</param>
        /// <param name="filter">Optional filter string to search URLs.</param>
        /// <returns>A paged view model containing pages with duplicate content.</returns>
        [HttpGet("duplicate-content")]
        [ProducesResponseType(typeof(PagedViewModel<PageDto>), 200)]
        public async Task<PagedViewModel<PageDto>> GetDuplicateContentUrls(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20,
            string filter = "")
        {
            var latestData = await DataService.GetDuplicateContentUrls(filter);

            var viewModel = new PagedViewModel<PageDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
            };

            return viewModel;
        }

        /// <summary>
        /// Gets a paginated list of pages with missing metadata.
        /// </summary>
        /// <param name="cancellationToken">Cancellation token for the operation.</param>
        /// <param name="skip">Number of items to skip for pagination. Default is 0.</param>
        /// <param name="take">Number of items to take for pagination. Default is 20.</param>
        /// <param name="filter">Optional filter string to search URLs.</param>
        /// <returns>A paged view model containing pages with missing metadata.</returns>
        [HttpGet("missing-metadata")]
        [ProducesResponseType(typeof(PagedViewModel<PageAnalysisDto>), 200)]
        public async Task<PagedViewModel<PageAnalysisDto>> GetPagesWithMissingMetadata(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20,
            string filter = "")
        {
            var latestData = await DataService.GetPagesWithMissingMetadata(filter);

            var viewModel = new PagedViewModel<PageAnalysisDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
            };

            return viewModel;
        }

        /// <summary>
        /// Gets a paginated list of all detected issues ordered by percentage of total pages affected.
        /// </summary>
        /// <param name="cancellationToken">Cancellation token for the operation.</param>
        /// <param name="skip">Number of items to skip for pagination. Default is 0.</param>
        /// <param name="take">Number of items to take for pagination. Default is 20.</param>
        /// <returns>A paged view model containing all detected issues.</returns>
        [HttpGet("all-issues")]
        [ProducesResponseType(typeof(PagedViewModel<IssueDto>), 200)]
        public async Task<PagedViewModel<IssueDto>> GetAllIssues(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20)
        {
            var allIssues = await DataService.GetAllIssues();
            var orderedIssues = allIssues.OrderByDescending(x => x.PercentOfTotal).ToList();

            var viewModel = new PagedViewModel<IssueDto>
            {
                Total = orderedIssues.Count(),
                Items = orderedIssues.Skip(skip).Take(take)
            };

            return viewModel;
        }

        /// <summary>
        /// Gets detailed information about a specific issue by its unique identifier.
        /// </summary>
        /// <param name="issueGuid">The unique identifier of the issue.</param>
        /// <returns>An <see cref="IssueDto"/> containing the issue details, or null if not found.</returns>
        [HttpGet("issue")]
        [ProducesResponseType(typeof(IssueDto), 200)]
        public async Task<IssueDto?> GetIssue(Guid issueGuid)
        {
            return await DataService.GetIssue(issueGuid);
        }

        /// <summary>
        /// Gets a paginated list of all page analysis data from the latest audit.
        /// </summary>
        /// <param name="cancellationToken">Cancellation token for the operation.</param>
        /// <param name="skip">Number of items to skip for pagination. Default is 0.</param>
        /// <param name="take">Number of items to take for pagination. Default is 20.</param>
        /// <param name="filter">Optional filter string to search URLs.</param>
        /// <param name="statusCode">Optional HTTP status code filter. Default is 0 (no filter).</param>
        /// <returns>A paged view model containing page analysis data.</returns>
        [HttpGet("latest-data")]
        [ProducesResponseType(typeof(PagedViewModel<PageAnalysisDto>), 200)]
        public async Task<PagedViewModel<PageAnalysisDto>> GetLatestAuditData(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20,
            string filter = "",
            int statusCode = 0)
        {
            var latestData = await DataService.GetLatestAuditData(filter, statusCode);

            var viewModel = new PagedViewModel<PageAnalysisDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
            };

            return viewModel;
        }

        /// <summary>
        /// Gets detailed analysis data for a specific page by its unique identifier.
        /// </summary>
        /// <param name="cancellationToken">Cancellation token for the operation.</param>
        /// <param name="unique">The unique identifier of the page.</param>
        /// <returns>A <see cref="PageAnalysisDto"/> containing the page analysis data.</returns>
        [HttpGet("latest-page-data")]
        [ProducesResponseType(typeof(PageAnalysisDto), 200)]
        public async Task<PageAnalysisDto> GetLatestPageAuditData(
            CancellationToken cancellationToken,
            Guid unique)
            {
                var latestData = await DataService.GetLatestPageAuditData(unique);
                return latestData;
            }

        /// <summary>
        /// Gets a paginated list of orphaned pages (pages with no inbound links).
        /// </summary>
        /// <param name="skip">Number of items to skip for pagination. Default is 0.</param>
        /// <param name="take">Number of items to take for pagination. Default is 20.</param>
        /// <param name="filter">Optional filter string to search URLs.</param>
        /// <returns>A paged view model containing orphaned pages.</returns>
        [HttpGet("orphaned-pages")]
        [ProducesResponseType(typeof(PagedViewModel<PageDto>), 200)]
        public async Task<PagedViewModel<PageDto>> GetOrphanedPages(int skip = 0, int take = 20, string filter = "")
        {
            var latestData = await DataService.GetOrphanedPages(filter);

            var viewModel = new PagedViewModel<PageDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
            };

            return viewModel;
        }

        /// <summary>
        /// Gets a paginated list of all images discovered during the audit.
        /// </summary>
        /// <param name="skip">Number of items to skip for pagination. Default is 0.</param>
        /// <param name="take">Number of items to take for pagination. Default is 20.</param>
        /// <param name="filter">Optional filter string to search image URLs.</param>
        /// <returns>A paged view model containing image data.</returns>
        [HttpGet("all-images")]
        [ProducesResponseType(typeof(PagedViewModel<ImageDto>), 200)]
        public async Task<PagedViewModel<ImageDto>> GetAllImages(int skip = 0, int take = 20, string filter = "")
        {
            var latestData = await DataService.GetAllImages(filter);

            var viewModel = new PagedViewModel<ImageDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
            };

            return viewModel;
        }

        /// <summary>
        /// Gets a paginated list of external links grouped by URL.
        /// </summary>
        /// <param name="cancellationToken">Cancellation token for the operation.</param>
        /// <param name="skip">Number of items to skip for pagination. Default is 0.</param>
        /// <param name="take">Number of items to take for pagination. Default is 20.</param>
        /// <param name="filter">Optional filter string to search link URLs.</param>
        /// <returns>A paged view model containing grouped external links.</returns>
        [HttpGet("external-links")]
        [ProducesResponseType(typeof(PagedViewModel<LinkGroupDto>), 200)]
        public async Task<PagedViewModel<LinkGroupDto>> GetExternalLinks(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20,
            string filter = "")
        {
            var latestData = await DataService.GetExternalLinks(filter);

            var viewModel = new PagedViewModel<LinkGroupDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
            };

            return viewModel;
        }

        /// <summary>
        /// Gets a paginated list of internal links grouped by URL.
        /// </summary>
        /// <param name="cancellationToken">Cancellation token for the operation.</param>
        /// <param name="skip">Number of items to skip for pagination. Default is 0.</param>
        /// <param name="take">Number of items to take for pagination. Default is 20.</param>
        /// <param name="filter">Optional filter string to search link URLs.</param>
        /// <returns>A paged view model containing grouped internal links.</returns>
        [HttpGet("internal-links")]
        [ProducesResponseType(typeof(PagedViewModel<LinkGroupDto>), 200)]
        public async Task<PagedViewModel<LinkGroupDto>> GetInteralLinks(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20,
            string filter = "")
        {
            var latestData = await DataService.GetInternalLinks(filter);

            var viewModel = new PagedViewModel<LinkGroupDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
            };

            return viewModel;
        }

        /// <summary>
        /// Gets the overall health score for the site based on detected issues.
        /// </summary>
        /// <returns>A <see cref="HealthScoreDto"/> containing the health score and related statistics.</returns>
        [HttpGet("health-score")]
        [ProducesResponseType(typeof(HealthScoreDto), 200)]
        public async Task<HealthScoreDto> GetHealthScore()
        {
            return await DataService.GetHealthScore();
        }

        /// <summary>
        /// Exports all audit data to a CSV file.
        /// </summary>
        /// <returns>A CSV file containing all audit data with a timestamped filename.</returns>
        [HttpGet("export")]
        [ProducesResponseType(typeof(FileResult), 200, "text/csv")]
        public async Task<FileResult> GetExportData()
        {
            var data = await DataService.GetExportData();

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
