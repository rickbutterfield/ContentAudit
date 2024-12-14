using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface IAuditImageIssue : IAuditIssue
    {
        int CheckImages(IEnumerable<ImageDto> images, IEnumerable<PageDto> pages);
    }
}
