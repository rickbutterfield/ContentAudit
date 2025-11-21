using System.Runtime.CompilerServices;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    /// <summary>
    /// Service for auditing content in an Umbraco website
    /// </summary>
    public interface IAuditService
    {
        /// <summary>
        /// Starts a crawl of the website from the specified base URL
        /// </summary>
        /// <param name="baseUrl">The base URL to start crawling from</param>
        /// <param name="cancellationToken">Token to cancel the crawl operation</param>
        /// <returns>An async enumerable of crawl results</returns>
        IAsyncEnumerable<CrawlDto> StartCrawl(string baseUrl, CancellationToken cancellationToken);
    }
}
