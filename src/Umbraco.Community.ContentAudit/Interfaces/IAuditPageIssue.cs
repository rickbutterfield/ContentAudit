using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface IAuditPageIssue : IAuditIssue
    {
        IEnumerable<InternalPageDto> CheckPages(IEnumerable<InternalPageDto> pages);
    }
}
