using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface IAuditService
    {
        IAsyncEnumerable<CrawlDto> StartCrawl(string baseUrl, CancellationToken cancellationToken);
    }
}
