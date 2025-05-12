using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface IAuditRepository
    {
        Task<int?> GetLatestAuditId();
        Task<IEnumerable<OverviewSchema>> GetLatestAuditOverview(int latestRunId);
        Task<IEnumerable<PageSchema>> GetPagesByRunId(int runId);
        Task<IEnumerable<SeoSchema>> GetSeoData(int runId, string url);
        Task<IEnumerable<ContentAnalysisSchema>> GetContentAnalysisData(int runId, string url);
        Task<IEnumerable<PerformanceSchema>> GetPerformanceData(int runId, string url);
        Task<IEnumerable<AccessibilitySchema>> GetAccessibilityData(int runId, string url);
        Task<IEnumerable<TechnicalSeoSchema>> GetTechnicalSeoData(int runId, string url);
        Task<IEnumerable<SocialMediaSchema>> GetSocialMediaData(int runId, string url);
        Task<IEnumerable<ContentQualitySchema>> GetContentQualityData(int runId, string url);
        Task<IEnumerable<LinkSchema>> GetLinkData(int runId, string foundPage);
        Task<IEnumerable<ResourceSchema>> GetResourceData(int runId, string foundPage);
        Task<IEnumerable<ImageSchema>> GetImageData(int runId, string foundPage);
    }
}
