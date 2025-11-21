using Microsoft.Extensions.Options;
using System.Xml.Linq;
using Umbraco.Community.ContentAudit.Configuration;
using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Services
{
    /// <summary>
    /// Service for fetching and parsing XML sitemaps to extract URLs for crawling.
    /// </summary>
    public class SitemapService : ISitemapService
    {
        private readonly HttpClient _httpClient;
        private readonly ContentAuditSettings _contentAuditSettings;
        private readonly IRobotsService _robotsService;

        /// <summary>
        /// Initializes a new instance of the <see cref="SitemapService"/> class.
        /// </summary>
        /// <param name="httpClient">The HTTP client for fetching sitemap content.</param>
        /// <param name="optionsMonitor">The options monitor for accessing Content Audit settings.</param>
        /// <param name="robotsService">The robots service for discovering sitemap URLs from robots.txt.</param>
        public SitemapService(
            HttpClient httpClient,
            IOptionsMonitor<ContentAuditSettings> optionsMonitor,
            IRobotsService robotsService)
        {
            _httpClient = httpClient;
            _contentAuditSettings = optionsMonitor.CurrentValue;
            _robotsService = robotsService;
        }

        /// <summary>
        /// Fetches and parses a sitemap (or sitemap index) to extract all URLs.
        /// </summary>
        /// <param name="baseUrl">The base URL of the website.</param>
        /// <returns>A list of URLs extracted from the sitemap(s), or the base URL if no sitemap is found or parseable.</returns>
        /// <remarks>
        /// This method supports both regular sitemaps and sitemap index files. If a sitemap index is detected,
        /// all nested sitemaps are fetched and parsed. If the SitemapUrl is not configured in settings, 
        /// the method will attempt to discover sitemap URLs from robots.txt. If any error occurs or no URLs are found, 
        /// the base URL is returned as a fallback.
        /// </remarks>
        public async Task<List<string>> GetSitemapUrlAsync(string baseUrl)
        {
            string sitemapUrl = string.Empty;
            
            if (!string.IsNullOrEmpty(_contentAuditSettings.SitemapUrl))
            {
                sitemapUrl = new Uri(new Uri(baseUrl), _contentAuditSettings.SitemapUrl).ToString();
            }
            else
            {
                var sitemapUrlsFromRobots = await _robotsService.GetSitemapUrlsAsync(baseUrl);
                if (sitemapUrlsFromRobots.Any())
                {
                    sitemapUrl = sitemapUrlsFromRobots.First();
                    Console.WriteLine($"Discovered sitemap URL from robots.txt: {sitemapUrl}");
                }
            }

            try
            {
                string sitemapContent = await _httpClient.GetStringAsync(sitemapUrl);

                // Validate if the content is likely XML
                if (!IsXmlContent(sitemapContent))
                {
                    Console.WriteLine("Sitemap content is not valid XML. Defaulting to base URL crawling.");
                    return new List<string> { baseUrl };
                }

                // Determine if it's a sitemap index or a regular sitemap
                if (IsSitemapIndex(sitemapContent))
                {
                    var allUrls = new List<string>();
                    var sitemapIndexUrls = await ProcessSitemapIndex(sitemapContent);
                    foreach (var nestedSitemapUrl in sitemapIndexUrls)
                    {
                        try
                        {
                            string nestedContent = await _httpClient.GetStringAsync(nestedSitemapUrl);
                            if (IsXmlContent(nestedContent))
                            {
                                allUrls.AddRange(ParseSitemap(nestedContent));
                            }
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"Error fetching nested sitemap {nestedSitemapUrl}: {ex.Message}");
                        }
                    }

                    // If no URLs found, default to baseUrl
                    return allUrls.Any() ? allUrls : new List<string> { baseUrl };
                }
                else
                {
                    var urls = ParseSitemap(sitemapContent);
                    return urls.Any() ? urls : new List<string> { baseUrl };
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Could not fetch or parse sitemap.xml: {ex.Message}. Defaulting to base URL crawling.");
                return new List<string>();
            }
        }

        /// <summary>
        /// Determines whether the given XML content represents a sitemap index rather than a regular sitemap.
        /// </summary>
        /// <param name="content">The XML content to analyze.</param>
        /// <returns><c>true</c> if the content is a sitemap index; otherwise, <c>false</c>.</returns>
        private bool IsSitemapIndex(string content)
        {
            try
            {
                XDocument doc = XDocument.Parse(content);
                return doc.Root?.Name.LocalName == "sitemapindex";
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Validates whether the given content is XML format.
        /// </summary>
        /// <param name="content">The content to validate.</param>
        /// <returns><c>true</c> if the content appears to be XML; otherwise, <c>false</c>.</returns>
        /// <remarks>
        /// This method performs a simple check by looking for XML declaration or opening tags,
        /// and explicitly excludes HTML content.
        /// </remarks>
        private bool IsXmlContent(string content)
        {
            content = content.TrimStart();
            return content.StartsWith("<?xml", StringComparison.OrdinalIgnoreCase) ||
                   (content.StartsWith("<", StringComparison.OrdinalIgnoreCase) && !content.StartsWith("<!DOCTYPE html>", StringComparison.OrdinalIgnoreCase));
        }

        /// <summary>
        /// Parses a regular sitemap XML to extract all URL locations.
        /// </summary>
        /// <param name="content">The sitemap XML content.</param>
        /// <returns>A list of URLs extracted from the sitemap.</returns>
        /// <remarks>
        /// This method extracts &lt;loc&gt; elements from &lt;url&gt; elements in the sitemap.
        /// If parsing fails, an empty list is returned and an error is logged to the console.
        /// </remarks>
        private List<string> ParseSitemap(string content)
        {
            try
            {
                XDocument sitemap = XDocument.Parse(content);
                XNamespace? ns = sitemap.Root?.GetDefaultNamespace();

                var urls = sitemap.Descendants(ns + "url")
                                  .Select(x => x.Element(ns + "loc")?.Value)
                                  .Where(x => !string.IsNullOrWhiteSpace(x))
                                  .ToList();

                return urls!;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error parsing sitemap content: {ex.Message}");
                return new List<string>();
            }
        }

        /// <summary>
        /// Processes a sitemap index XML to extract URLs of nested sitemaps.
        /// </summary>
        /// <param name="content">The sitemap index XML content.</param>
        /// <returns>A list of URLs pointing to nested sitemaps.</returns>
        /// <remarks>
        /// This method extracts &lt;loc&gt; elements from &lt;sitemap&gt; elements in the sitemap index.
        /// If processing fails, an empty list is returned and an error is logged to the console.
        /// </remarks>
        private async Task<List<string>> ProcessSitemapIndex(string content)
        {
            var allUrls = new List<string>();

            try
            {
                XDocument sitemapIndex = XDocument.Parse(content);
                XNamespace? ns = sitemapIndex.Root?.GetDefaultNamespace();

                var sitemapUrls = sitemapIndex.Descendants(ns + "sitemap")
                                    .Select(x => x.Element(ns + "loc")?.Value)
                                    .Where(x => !string.IsNullOrWhiteSpace(x))
                                    .ToList();

                return sitemapUrls!;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error processing sitemap index: {ex.Message}.");
                return allUrls;
            }
        }
    }
}
