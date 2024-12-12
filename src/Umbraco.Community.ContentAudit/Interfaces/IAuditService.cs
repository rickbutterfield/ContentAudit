using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface IAuditService
    {
        Task<OverviewDto> GetLatestAuditOverview();
        Task<List<PageDto>> GetLatestAuditData(int skip = 0, int take = 20, string filter = "", int statusCode = 0);
        Task<List<PageDto>> GetOrphanedPages(int skip = 0, int take = 20, string filter = "");
        Task<List<ImageDto>> GetAllImages(int skip = 0, int take = 20, string filter = "");
        Task<Dictionary<string, List<PageDto>>> GetDuplicateContentUrls();
        Task<List<PageDto>> GetPagesWithMissingMetadata();
        Task<List<IssueDto>> GetAllIssues();
        Task<HealthScoreDto> GetHealthScore();
    }
}
