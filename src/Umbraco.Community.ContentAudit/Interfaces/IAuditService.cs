using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface IAuditService
    {
        Task<AuditOverviewDto> GetLatestAuditOverview();
        Task<List<PageResponseDto>> GetLatestAuditData(int skip = 0, int take = 20);
        Task<Dictionary<string, List<PageResponseDto>>> GetDuplicateContentUrls();
        Task<List<PageResponseDto>> GetPagesWithMissingMetadata();
        Task<List<AuditIssueDto>> GetAllIssues();
        Task<HealthScoreDto> GetHealthScore();
    }
}
