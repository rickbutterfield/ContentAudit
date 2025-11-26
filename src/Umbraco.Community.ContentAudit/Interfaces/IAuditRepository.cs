using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface IAuditRepository
    {
        Task<Guid?> GetLatestAuditKey();
        Task<IEnumerable<OverviewSchema>> GetLatestAuditOverview(Guid auditKey);
        Task<IEnumerable<PageSchema>> GetPagesByAuditKey(Guid auditKey);
        Task<IEnumerable<SeoSchema>> GetSeoData(Guid auditKey, string url);
        Task<IEnumerable<ContentAnalysisSchema>> GetContentAnalysisData(Guid auditKey, string url);
        Task<IEnumerable<PerformanceSchema>> GetPerformanceData(Guid auditKey, string url);
        Task<IEnumerable<AccessibilitySchema>> GetAccessibilityData(Guid auditKey, string url);
        Task<IEnumerable<TechnicalSeoSchema>> GetTechnicalSeoData(Guid auditKey, string url);
        Task<IEnumerable<SocialMediaSchema>> GetSocialMediaData(Guid auditKey, string url);
        Task<IEnumerable<ContentQualitySchema>> GetContentQualityData(Guid auditKey, string url);
        Task<IEnumerable<LinkSchema>> GetLinkData(Guid auditKey, string foundPage);
        Task<IEnumerable<ResourceSchema>> GetResourceData(Guid auditKey, string foundPage);
        Task<IEnumerable<ImageSchema>> GetImageData(Guid auditKey, string foundPage);
        Task<IEnumerable<OverviewSchema>> GetAllAuditOverviews();
    }
}
