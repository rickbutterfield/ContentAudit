namespace Umbraco.Community.ContentAudit.Interfaces
{
    /// <summary>
    /// Service for discovering and parsing sitemap.xml files
    /// </summary>
    public interface ISitemapService
    {
        /// <summary>
        /// Retrieves all URLs from sitemap files, including sitemap indexes
        /// </summary>
        /// <param name="baseUrl">The base URL of the website</param>
        /// <returns>List of URLs discovered from sitemap.xml and any child sitemaps</returns>
        Task<List<string>> GetSitemapUrlAsync(string baseUrl);
    }
}
