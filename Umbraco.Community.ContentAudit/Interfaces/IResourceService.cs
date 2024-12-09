using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface IResourceService
    {
        Task<PageResponseDto> GetPageWithAssetsAsync(string url, Guid? nodeKey = null);
    }
}
