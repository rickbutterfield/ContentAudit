using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface IDataService
    {
        Task<OverviewDto> GetLatestAuditOverview();
        Task<List<PageAnalysisDto>> GetLatestAuditData(string filter = "", int statusCode = 0);
        Task<PageAnalysisDto> GetLatestPageAuditData(Guid unique);
        Task<List<PageDto>> GetOrphanedPages(string filter = "");
        Task<List<LinkGroupDto>> GetExternalLinks(string filter = "");
        Task<List<LinkGroupDto>> GetInternalLinks(string filter = "");
        Task<List<ImageDto>> GetAllImages(string filter = "");
        Task<List<PageDto>> GetDuplicateContentUrls(string filter = "");
        Task<List<PageAnalysisDto>> GetPagesWithMissingMetadata(string filter = "");
        Task<List<IssueDto>> GetAllIssues();
        Task<IssueDto?> GetIssue(Guid issueGuid);
        Task<HealthScoreDto> GetHealthScore();
    }
}
