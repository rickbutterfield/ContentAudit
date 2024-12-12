using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface ICrawlerService
    {
        IAsyncEnumerable<CrawlDto> StartCrawl(string baseUrl);
    }
}
