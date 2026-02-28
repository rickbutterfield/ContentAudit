using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    /// <summary>
    /// Service for retrieving and managing audit data and analytics
    /// </summary>
    public interface IDataService
    {
        /// <summary>
        /// Gets the overview data for the most recent audit
        /// </summary>
        /// <returns>The latest audit overview containing summary statistics</returns>
        Task<OverviewDto> GetAuditOverview(Guid? id = null);

        /// <summary>
        /// Gets detailed page analysis for a specific audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <returns>Page analysis data for the specified audit</returns>
        Task<PageAnalysisDto> GetAuditPageAnalysisByKey(Guid auditKey);

        /// <summary>
        /// Gets audit data for the latest crawl with optional filtering
        /// </summary>
        /// <param name="filter">Optional text filter to apply to URLs</param>
        /// <param name="statusCode">Optional HTTP status code filter (0 for all)</param>
        /// <returns>List of page analysis results matching the criteria</returns>
        Task<List<PageAnalysisDto>> GetLatestAuditData(string filter = "", int statusCode = 0);

        /// <summary>
        /// Gets lightweight audit data for the list view (pages + content type only)
        /// </summary>
        /// <param name="filter">Optional text filter to apply to URLs</param>
        /// <param name="statusCode">Optional HTTP status code filter (0 for all)</param>
        /// <returns>List of lightweight page items matching the criteria</returns>
        Task<List<PageListItemDto>> GetLatestAuditDataLightweight(string filter = "", int statusCode = 0);

        /// <summary>
        /// Gets the latest audit data for a specific page
        /// </summary>
        /// <param name="unique">The unique identifier of the page</param>
        /// <returns>Page analysis data for the specified page</returns>
        Task<PageAnalysisDto> GetLatestPageAuditData(Guid unique);

        /// <summary>
        /// Gets links found on a specific page
        /// </summary>
        /// <param name="unique">The unique identifier of the page</param>
        /// <returns>List of links found on the page</returns>
        Task<List<LinkDto>> GetPageLinks(Guid unique);

        /// <summary>
        /// Gets images found on a specific page
        /// </summary>
        /// <param name="unique">The unique identifier of the page</param>
        /// <returns>List of images found on the page</returns>
        Task<List<ImageDto>> GetPageImages(Guid unique);

        /// <summary>
        /// Gets resources loaded by a specific page
        /// </summary>
        /// <param name="unique">The unique identifier of the page</param>
        /// <returns>List of resources loaded by the page</returns>
        Task<List<ResourceDto>> GetPageResources(Guid unique);

        /// <summary>
        /// Gets audit issues detected on a specific page
        /// </summary>
        /// <param name="unique">The unique identifier of the page</param>
        /// <returns>List of issues found on the page</returns>
        Task<List<IssueDto>> GetPageIssues(Guid unique);

        /// <summary>
        /// Gets all pages that have no incoming links (orphaned pages)
        /// </summary>
        /// <param name="filter">Optional text filter to apply to URLs</param>
        /// <returns>List of orphaned pages matching the filter</returns>
        Task<List<PageDto>> GetOrphanedPages(string filter = "");

        /// <summary>
        /// Gets all external links found during the latest crawl
        /// </summary>
        /// <param name="filter">Optional text filter to apply to URLs</param>
        /// <returns>List of external link groups matching the filter</returns>
        Task<List<LinkGroupDto>> GetExternalLinks(string filter = "");

        /// <summary>
        /// Gets all internal links found during the latest crawl
        /// </summary>
        /// <param name="filter">Optional text filter to apply to URLs</param>
        /// <returns>List of internal link groups matching the filter</returns>
        Task<List<LinkGroupDto>> GetInternalLinks(string filter = "");

        /// <summary>
        /// Gets all images found during the latest crawl
        /// </summary>
        /// <param name="filter">Optional text filter to apply to image sources</param>
        /// <returns>List of images matching the filter</returns>
        Task<List<ImageDto>> GetAllImages(string filter = "");

        /// <summary>
        /// Gets all URLs with duplicate content based on content hash comparison
        /// </summary>
        /// <param name="filter">Optional text filter to apply to URLs</param>
        /// <returns>List of pages with duplicate content matching the filter</returns>
        Task<List<PageDto>> GetDuplicateContentUrls(string filter = "");

        /// <summary>
        /// Gets lightweight metadata list items for all pages (page + SEO data only)
        /// </summary>
        /// <param name="filter">Optional text filter to apply to URLs</param>
        /// <returns>List of metadata list items matching the filter</returns>
        Task<List<MetadataListItemDto>> GetMetadataListItems(string filter = "");

        /// <summary>
        /// Gets lightweight carbon rating list items for all pages
        /// </summary>
        /// <param name="filter">Optional text filter to apply to URLs</param>
        /// <returns>List of carbon rating list items matching the filter</returns>
        Task<List<CarbonRatingListItemDto>> GetCarbonRatingListItems(string filter = "");

        /// <summary>
        /// Gets lightweight Core Web Vitals list items for all pages
        /// </summary>
        /// <param name="filter">Optional text filter to apply to URLs</param>
        /// <returns>List of Core Web Vitals list items matching the filter</returns>
        Task<List<CoreWebVitalsListItemDto>> GetCoreWebVitalsListItems(string filter = "");

        /// <summary>
        /// Gets all detected audit issues from the latest crawl
        /// </summary>
        /// <returns>List of all audit issues found</returns>
        Task<List<IssueDto>> GetAllIssues();

        /// <summary>
        /// Gets details for a specific audit issue type
        /// </summary>
        /// <param name="issueGuid">The unique identifier of the issue type</param>
        /// <returns>Issue details if found, otherwise null</returns>
        Task<IssueDto?> GetIssue(Guid issueGuid);

        /// <summary>
        /// Calculates and returns the overall health score for the latest audit
        /// </summary>
        /// <returns>Health score with weighted metrics</returns>
        Task<HealthScoreDto> GetHealthScore();

        /// <summary>
        /// Gets audit data formatted for export (CSV, etc.)
        /// </summary>
        /// <param name="id">Optional audit identifier; if null, exports the latest audit</param>
        /// <returns>Complete list of page analysis data for export</returns>
        Task<List<PageAnalysisDto>> GetExportData(Guid? id = default);

        /// <summary>
        /// Gets overview data for all historical audits
        /// </summary>
        /// <returns>List of audit overviews ordered by date</returns>
        Task<List<OverviewDto>> GetAuditOverviews();

        /// <summary>
        /// Deletes a specific audit and all associated data
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit to delete</param>
        /// <returns>True if the audit was successfully deleted, otherwise false</returns>
        Task<bool> DeleteAudit(Guid auditKey);
    }
}
