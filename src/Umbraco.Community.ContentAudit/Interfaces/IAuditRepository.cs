using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    /// <summary>
    /// Repository for accessing audit data from the database
    /// </summary>
    public interface IAuditRepository
    {
        /// <summary>
        /// Retrieves the unique identifier of the most recent audit
        /// </summary>
        /// <returns>The audit key if found, otherwise null</returns>
        Task<Guid?> GetLatestAuditKey();

        /// <summary>
        /// Retrieves the unique identifier of the most recent completed audit excluding a specific key
        /// </summary>
        /// <param name="excludeKey">The audit key to exclude (typically the current audit)</param>
        /// <returns>The audit key if found, otherwise null</returns>
        Task<Guid?> GetLatestCompletedAuditKeyExcluding(Guid excludeKey);

        /// <summary>
        /// Gets the overview data for a specific audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <returns>The overview schema record if found, otherwise null</returns>
        Task<OverviewSchema?> GetAuditOverview(Guid auditKey);

        /// <summary>
        /// Gets all pages associated with a specific audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <returns>Collection of page schema records</returns>
        Task<IEnumerable<PageSchema>> GetPagesByAuditKey(Guid auditKey);

        /// <summary>
        /// Gets a single page by audit key and URL
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <param name="url">The URL of the page</param>
        /// <returns>The page schema record if found, otherwise null</returns>
        Task<PageSchema?> GetPageByAuditKeyAndUrl(Guid auditKey, string url);

        /// <summary>
        /// Gets SEO data for a specific page in an audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <param name="url">The URL of the page</param>
        /// <returns>Collection of SEO schema records</returns>
        Task<IEnumerable<SeoSchema>> GetSeoData(Guid auditKey, string url);

        /// <summary>
        /// Gets content analysis data for a specific page in an audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <param name="url">The URL of the page</param>
        /// <returns>Collection of content analysis schema records</returns>
        Task<IEnumerable<ContentAnalysisSchema>> GetContentAnalysisData(Guid auditKey, string url);

        /// <summary>
        /// Gets performance metrics for a specific page in an audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <param name="url">The URL of the page</param>
        /// <returns>Collection of performance schema records</returns>
        Task<IEnumerable<PerformanceSchema>> GetPerformanceData(Guid auditKey, string url);

        /// <summary>
        /// Gets accessibility data for a specific page in an audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <param name="url">The URL of the page</param>
        /// <returns>Collection of accessibility schema records</returns>
        Task<IEnumerable<AccessibilitySchema>> GetAccessibilityData(Guid auditKey, string url);

        /// <summary>
        /// Gets technical SEO data for a specific page in an audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <param name="url">The URL of the page</param>
        /// <returns>Collection of technical SEO schema records</returns>
        Task<IEnumerable<TechnicalSeoSchema>> GetTechnicalSeoData(Guid auditKey, string url);

        /// <summary>
        /// Gets social media metadata for a specific page in an audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <param name="url">The URL of the page</param>
        /// <returns>Collection of social media schema records</returns>
        Task<IEnumerable<SocialMediaSchema>> GetSocialMediaData(Guid auditKey, string url);

        /// <summary>
        /// Gets content quality metrics for a specific page in an audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <param name="url">The URL of the page</param>
        /// <returns>Collection of content quality schema records</returns>
        Task<IEnumerable<ContentQualitySchema>> GetContentQualityData(Guid auditKey, string url);

        /// <summary>
        /// Gets all links found on a specific page in an audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <param name="foundPage">The URL of the page</param>
        /// <returns>Collection of link schema records</returns>
        Task<IEnumerable<LinkSchema>> GetLinkData(Guid auditKey, string foundPage);

        /// <summary>
        /// Gets all resources (CSS, JS, fonts, etc.) loaded by a specific page in an audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <param name="foundPage">The URL of the page</param>
        /// <returns>Collection of resource schema records</returns>
        Task<IEnumerable<ResourceSchema>> GetResourceData(Guid auditKey, string foundPage);

        /// <summary>
        /// Gets all images found on a specific page in an audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <param name="foundPage">The URL of the page</param>
        /// <returns>Collection of image schema records</returns>
        Task<IEnumerable<ImageSchema>> GetImageData(Guid auditKey, string foundPage);

        /// <summary>
        /// Gets all SEO data for an audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <returns>Collection of SEO schema records</returns>
        Task<IEnumerable<SeoSchema>> GetAllSeoDataByAuditKey(Guid auditKey);

        /// <summary>
        /// Gets all content analysis data for an audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <returns>Collection of content analysis schema records</returns>
        Task<IEnumerable<ContentAnalysisSchema>> GetAllContentAnalysisDataByAuditKey(Guid auditKey);

        /// <summary>
        /// Gets all performance data for an audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <returns>Collection of performance schema records</returns>
        Task<IEnumerable<PerformanceSchema>> GetAllPerformanceDataByAuditKey(Guid auditKey);

        /// <summary>
        /// Gets all accessibility data for an audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <returns>Collection of accessibility schema records</returns>
        Task<IEnumerable<AccessibilitySchema>> GetAllAccessibilityDataByAuditKey(Guid auditKey);

        /// <summary>
        /// Gets all technical SEO data for an audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <returns>Collection of technical SEO schema records</returns>
        Task<IEnumerable<TechnicalSeoSchema>> GetAllTechnicalSeoDataByAuditKey(Guid auditKey);

        /// <summary>
        /// Gets all social media data for an audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <returns>Collection of social media schema records</returns>
        Task<IEnumerable<SocialMediaSchema>> GetAllSocialMediaDataByAuditKey(Guid auditKey);

        /// <summary>
        /// Gets all content quality data for an audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <returns>Collection of content quality schema records</returns>
        Task<IEnumerable<ContentQualitySchema>> GetAllContentQualityDataByAuditKey(Guid auditKey);

        /// <summary>
        /// Gets all links for an audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <returns>Collection of link schema records</returns>
        Task<IEnumerable<LinkSchema>> GetAllLinkDataByAuditKey(Guid auditKey);

        /// <summary>
        /// Gets all resources for an audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <returns>Collection of resource schema records</returns>
        Task<IEnumerable<ResourceSchema>> GetAllResourceDataByAuditKey(Guid auditKey);

        /// <summary>
        /// Gets all images for an audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <returns>Collection of image schema records</returns>
        Task<IEnumerable<ImageSchema>> GetAllImageDataByAuditKey(Guid auditKey);

        /// <summary>
        /// Gets overview data for all historical audits
        /// </summary>
        /// <returns>Collection of overview schema records for all audits</returns>
        Task<IEnumerable<OverviewSchema>> GetAuditOverviews();

        /// <summary>
        /// Gets all issue results for an audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <returns>Collection of issue result schema records</returns>
        Task<IEnumerable<IssueResultSchema>> GetAllIssueResultsByAuditKey(Guid auditKey);

        /// <summary>
        /// Gets issue results for a specific issue type in an audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <param name="issueId">The unique identifier of the issue type</param>
        /// <returns>Collection of issue result schema records</returns>
        Task<IEnumerable<IssueResultSchema>> GetIssueResultsByIssueId(Guid auditKey, Guid issueId);

        /// <summary>
        /// Gets issue results for a specific page in an audit
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit</param>
        /// <param name="pageUnique">The unique identifier of the page</param>
        /// <returns>Collection of issue result schema records</returns>
        Task<IEnumerable<IssueResultSchema>> GetIssueResultsByPageUnique(Guid auditKey, Guid pageUnique);

        /// <summary>
        /// Gets the most recent incomplete (InProgress) audit, if one exists
        /// </summary>
        /// <returns>The overview schema record if found, otherwise null</returns>
        Task<OverviewSchema?> GetIncompleteAudit();

        /// <summary>
        /// Deletes an audit and all associated data
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit to delete</param>
        /// <returns>True if the audit was successfully deleted, otherwise false</returns>
        Task<bool> DeleteAuditByKey(Guid auditKey);
    }
}
