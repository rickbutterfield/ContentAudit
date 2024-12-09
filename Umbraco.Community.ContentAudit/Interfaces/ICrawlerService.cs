using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface ICrawlerService
    {
        IAsyncEnumerable<PageResponseDto> StartCrawl(string baseUrl);
    }
}
