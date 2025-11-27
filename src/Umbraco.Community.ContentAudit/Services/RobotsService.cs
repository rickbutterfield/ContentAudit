using Microsoft.Extensions.Logging;
using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Services
{
    /// <inheritdoc/>
    public class RobotsService : IRobotsService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<RobotsService> _logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="RobotsService"/> class
        /// </summary>
        /// <param name="httpClient">The HTTP client for fetching robots.txt content</param>
        /// <param name="logger">The logger instance</param>
        public RobotsService(HttpClient httpClient, ILogger<RobotsService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
        }

        /// <inheritdoc/>
        public async Task<List<string>> GetDisallowedPathsAsync(string baseUrl)
        {
            var disallowedPaths = new List<string>();
            string robotsUrl = $"{baseUrl.TrimEnd('/')}/robots.txt";

            try
            {
                string robotsContent = await _httpClient.GetStringAsync(robotsUrl);
                disallowedPaths.AddRange(ParseRobotsTxt(robotsContent, baseUrl));
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Could not fetch or parse robots.txt from {RobotsUrl}. Defaulting to no disallowed paths.", robotsUrl);
            }

            return disallowedPaths;
        }

        /// <inheritdoc/>
        public async Task<List<string>> GetSitemapUrlsAsync(string baseUrl)
        {
            var sitemapUrls = new List<string>();
            string robotsUrl = $"{baseUrl.TrimEnd('/')}/robots.txt";

            try
            {
                string robotsContent = await _httpClient.GetStringAsync(robotsUrl);
                sitemapUrls.AddRange(ParseSitemapUrls(robotsContent));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not fetch or parse robots.txt from {RobotsUrl} for sitemap URLs.", robotsUrl);
            }

            return sitemapUrls;
        }

        /// <summary>
        /// Parses the content of a robots.txt file to extract disallowed paths.
        /// </summary>
        /// <param name="content">The raw content of the robots.txt file.</param>
        /// <param name="baseUrl">The base URL to prepend to relative paths.</param>
        /// <returns>A list of absolute URLs that are marked as disallowed.</returns>
        /// <remarks>
        /// This method processes "Disallow:" directives and converts relative paths to absolute URLs.
        /// Empty or whitespace-only disallow paths are ignored.
        /// </remarks>
        private List<string> ParseRobotsTxt(string content, string baseUrl)
        {
            var disallowList = new List<string>();
            var lines = content.Split(new[] { '\r', '\n' }, StringSplitOptions.RemoveEmptyEntries);

            foreach (var line in lines)
            {
                if (line.StartsWith("Disallow:", StringComparison.OrdinalIgnoreCase))
                {
                    string path = line.Substring(9).Trim();
                    if (!string.IsNullOrWhiteSpace(path))
                    {
                        disallowList.Add(baseUrl.TrimEnd('/') + path);
                    }
                }
            }

            return disallowList;
        }

        /// <summary>
        /// Parses the content of a robots.txt file to extract sitemap URLs.
        /// </summary>
        /// <param name="content">The raw content of the robots.txt file.</param>
        /// <returns>A list of sitemap URLs found in the robots.txt file.</returns>
        /// <remarks>
        /// This method processes "Sitemap:" directives according to Google's robots.txt specification.
        /// Sitemap URLs should be absolute URLs and are returned as-is.
        /// </remarks>
        private List<string> ParseSitemapUrls(string content)
        {
            var sitemapList = new List<string>();
            var lines = content.Split(new[] { '\r', '\n' }, StringSplitOptions.RemoveEmptyEntries);

            foreach (var line in lines)
            {
                if (line.StartsWith("Sitemap:", StringComparison.OrdinalIgnoreCase))
                {
                    string url = line.Substring(8).Trim();
                    if (!string.IsNullOrWhiteSpace(url))
                    {
                        sitemapList.Add(url);
                    }
                }
            }

            return sitemapList;
        }
    }
}
