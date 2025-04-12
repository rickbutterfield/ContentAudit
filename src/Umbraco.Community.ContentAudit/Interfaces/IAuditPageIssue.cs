using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface IAuditPageIssue : IAuditIssue
    {
        IEnumerable<PageAnalysisDto> CheckPages(IEnumerable<PageAnalysisDto> pages);
    }
}
