using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface IAuditService
    {
        Task<OverviewDto> GetLatestAuditOverview();
        Task<List<InternalPageDto>> GetLatestAuditData(int skip = 0, int take = 20, string filter = "", int statusCode = 0);
        Task<List<InternalPageDto>> GetOrphanedPages(int skip = 0, int take = 20, string filter = "");
        Task<List<ExternalPageGroupDto>> GetExternalLinks(int skip = 0, int take = 20, string filter = "");
        Task<List<ImageDto>> GetAllImages(int skip = 0, int take = 20, string filter = "");
        Task<Dictionary<string, List<InternalPageDto>>> GetDuplicateContentUrls();
        Task<List<InternalPageDto>> GetPagesWithMissingMetadata(int skip = 0, int take = 20, string filter = "");
        Task<List<IssueDto>> GetAllIssues();
        Task<IssueDto?> GetIssue(Guid issueGuid);
        Task<HealthScoreDto> GetHealthScore();
    }
}
