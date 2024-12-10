using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface IAuditService
    {
        Task<AuditOverviewDto> GetLatestAuditOverview();
        Task<Dictionary<string, List<PageResponseDto>>> GetDuplicateContentUrls();
        Task<List<PageResponseDto>> GetPagesWithMissingMetadata();
        Task<List<AuditIssueDto>> GetAllIssues();
    }
}
