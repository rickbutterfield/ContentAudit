using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Services
{
    /// <summary>
    /// Service for parsing and processing robots.txt files to determine disallowed paths.
    /// </summary>
    public class RobotsService : IRobotsService
    {
        private readonly HttpClient _httpClient;

        /// <summary>
        /// Initializes a new instance of the <see cref="RobotsService"/> class.
        /// </summary>
        /// <param name="httpClient">The HTTP client for fetching robots.txt content.</param>
        public RobotsService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        /// <summary>
        /// Fetches and parses the robots.txt file from a given base URL to extract disallowed paths.
        /// </summary>
        /// <param name="baseUrl">The base URL of the website to fetch robots.txt from.</param>
        /// <returns>A list of absolute URLs that are disallowed according to the robots.txt file.</returns>
        /// <remarks>
        /// If the robots.txt file cannot be fetched or parsed, an empty list is returned and a message is logged to the console.
        /// Only "Disallow:" directives are processed; other directives like "Allow:" are ignored.
        /// </remarks>
        public async Task<List<string>> GetDisallowedPathsAsync(string baseUrl)
        {
            var disallowedPaths = new List<string>();
            string robotsUrl = $"{baseUrl.TrimEnd('/')}/robots.txt";

            try
            {
                string robotsContent = await _httpClient.GetStringAsync(robotsUrl);
                disallowedPaths.AddRange(ParseRobotsTxt(robotsContent, baseUrl));
            }
            catch
            {
                Console.WriteLine("Could not fetch or parse robots.txt. Defaulting to no disallowed paths.");
            }

            return disallowedPaths;
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
    }
}
