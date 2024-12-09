using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Services
{
    public class RobotsService : IRobotsService
    {
        private readonly HttpClient _httpClient;

        public RobotsService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

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
