using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface IPageScanningService
    {
        Task<InternalPageDto> GetPageData(string url, Guid? nodeKey = null);
    }
}
