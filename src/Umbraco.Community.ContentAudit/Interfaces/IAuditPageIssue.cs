using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface IAuditPageIssue : IAuditIssue
    {
        int CheckPages(IEnumerable<InternalPageDto> pages);
    }
}
