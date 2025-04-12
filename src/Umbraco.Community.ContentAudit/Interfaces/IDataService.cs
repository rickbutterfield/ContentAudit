using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface IDataService
    {
        Task<OverviewDto> GetLatestAuditOverview();
        Task<List<PageAnalysisDto>> GetLatestAuditData(string filter = "", int statusCode = 0);
        Task<List<InternalPageDto>> GetOrphanedPages(string filter = "");
        Task<List<ExternalPageGroupDto>> GetExternalLinks(string filter = "");
        Task<List<InternalPageGroupDto>> GetInternalLinks(string filter = "");
        Task<List<ImageDto>> GetAllImages(string filter = "");
        Task<List<InternalPageGroupDto>> GetDuplicateContentUrls(string filter = "");
        Task<List<InternalPageDto>> GetPagesWithMissingMetadata(string filter = "");
        Task<List<IssueDto>> GetAllIssues();
        Task<IssueDto?> GetIssue(Guid issueGuid);
        Task<HealthScoreDto> GetHealthScore();
    }
}
