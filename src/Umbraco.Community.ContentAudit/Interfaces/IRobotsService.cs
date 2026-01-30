namespace Umbraco.Community.ContentAudit.Interfaces
{
    /// <summary>
    /// Service for parsing and interpreting robots.txt files
    /// </summary>
    public interface IRobotsService
    {
        /// <summary>
        /// Retrieves all disallowed paths from the robots.txt file
        /// </summary>
        /// <param name="baseUrl">The base URL of the website</param>
        /// <returns>List of disallowed URL paths that should not be crawled</returns>
        Task<List<string>> GetDisallowedPathsAsync(string baseUrl);

        /// <summary>
        /// Extracts sitemap URLs declared in the robots.txt file
        /// </summary>
        /// <param name="baseUrl">The base URL of the website</param>
        /// <returns>List of sitemap URLs found in robots.txt</returns>
        Task<List<string>> GetSitemapUrlsAsync(string baseUrl);

        /// <summary>
        /// Gets the Crawl-delay directive value from robots.txt
        /// </summary>
        /// <param name="baseUrl">The base URL of the website</param>
        /// <returns>Crawl delay in milliseconds, or null if not specified</returns>
        Task<int?> GetCrawlDelayAsync(string baseUrl);
    }
}
