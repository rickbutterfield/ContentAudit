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

        Task<IEnumerable<SeoSchema>> GetAllSeoDataByAuditKey(Guid auditKey);
        Task<IEnumerable<ContentAnalysisSchema>> GetAllContentAnalysisDataByAuditKey(Guid auditKey);
        Task<IEnumerable<PerformanceSchema>> GetAllPerformanceDataByAuditKey(Guid auditKey);
        Task<IEnumerable<AccessibilitySchema>> GetAllAccessibilityDataByAuditKey(Guid auditKey);
        Task<IEnumerable<TechnicalSeoSchema>> GetAllTechnicalSeoDataByAuditKey(Guid auditKey);
        Task<IEnumerable<SocialMediaSchema>> GetAllSocialMediaDataByAuditKey(Guid auditKey);
        Task<IEnumerable<ContentQualitySchema>> GetAllContentQualityDataByAuditKey(Guid auditKey);
        Task<IEnumerable<LinkSchema>> GetAllLinkDataByAuditKey(Guid auditKey);
        Task<IEnumerable<ResourceSchema>> GetAllResourceDataByAuditKey(Guid auditKey);
        Task<IEnumerable<ImageSchema>> GetAllImageDataByAuditKey(Guid auditKey);

        /// <summary>
        /// Gets overview data for all historical audits
        /// </summary>
        /// <returns>Collection of overview schema records for all audits</returns>
        Task<IEnumerable<OverviewSchema>> GetAuditOverviews();

        Task<IEnumerable<IssueResultSchema>> GetAllIssueResultsByAuditKey(Guid auditKey);
        Task<IEnumerable<IssueResultSchema>> GetIssueResultsByIssueId(Guid auditKey, Guid issueId);
        Task<IEnumerable<IssueResultSchema>> GetIssueResultsByPageUnique(Guid auditKey, Guid pageUnique);

        /// <summary>
        /// Deletes an audit and all associated data
        /// </summary>
        /// <param name="auditKey">The unique identifier of the audit to delete</param>
        /// <returns>True if the audit was successfully deleted, otherwise false</returns>
        Task<bool> DeleteAuditByKey(Guid auditKey);
    }
}
