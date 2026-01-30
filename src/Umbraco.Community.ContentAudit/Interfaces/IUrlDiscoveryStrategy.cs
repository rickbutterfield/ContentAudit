namespace Umbraco.Community.ContentAudit.Interfaces
{
    /// <summary>
    /// Strategy for discovering URLs to crawl
    /// </summary>
    public interface IUrlDiscoveryStrategy
    {
        /// <summary>
        /// Gets the display name of this strategy
        /// </summary>
        string Name { get; }

        /// <summary>
        /// Gets the priority of this strategy. Higher values run first.
        /// </summary>
        int Priority { get; }

        /// <summary>
        /// Discovers URLs from this strategy's source
        /// </summary>
        /// <param name="baseUrl">The base URL of the website</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Collection of discovered URLs</returns>
        Task<IEnumerable<DiscoveredUrl>> DiscoverUrlsAsync(string baseUrl, CancellationToken cancellationToken = default);
    }

    /// <summary>
    /// Represents a URL discovered by a discovery strategy
    /// </summary>
    /// <param name="Url">The discovered URL</param>
    /// <param name="ContentId">Optional content identifier (e.g., Umbraco node GUID)</param>
    /// <param name="Metadata">Optional additional metadata about the URL</param>
    public record DiscoveredUrl(string Url, Guid? ContentId = null, Dictionary<string, object>? Metadata = null);
}
