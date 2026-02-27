namespace Umbraco.Community.ContentAudit.Interfaces
{
    /// <summary>
    /// Service for auditing content in an Umbraco website
    /// </summary>
    public interface IAuditService
    {
        /// <summary>
        /// Starts a crawl of the website from the specified base URL.
        /// Progress is broadcast via SignalR hub.
        /// </summary>
        /// <param name="baseUrl">The base URL to start crawling from</param>
        /// <param name="cancellationToken">Token to cancel the crawl operation</param>
        Task StartCrawl(string baseUrl, CancellationToken cancellationToken);
    }
}
