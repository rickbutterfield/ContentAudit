using Microsoft.Extensions.Options;
using System.Xml.Linq;
using Umbraco.Community.ContentAudit.Configuration;
using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Services
{
    public class SitemapService : ISitemapService
    {
        private readonly HttpClient _httpClient;
        private readonly ContentAuditSettings _contentAuditSettings;

        public SitemapService(
            HttpClient httpClient,
            IOptionsMonitor<ContentAuditSettings> optionsMonitor)
        {
            _httpClient = httpClient;
            _contentAuditSettings = optionsMonitor.CurrentValue;
        }

        public async Task<List<string>> GetSitemapUrlAsync(string baseUrl)
        {
            string sitemapUrl = string.Empty;
            
            if (!string.IsNullOrEmpty(_contentAuditSettings.SitemapUrl))
            {
                // Add baseUrl to the sitemap URL if it's not an absolute URL
                sitemapUrl = new Uri(new Uri(baseUrl), _contentAuditSettings.SitemapUrl).ToString();
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

        private bool IsXmlContent(string content)
        {
            content = content.TrimStart();
            return content.StartsWith("<?xml", StringComparison.OrdinalIgnoreCase) ||
                   (content.StartsWith("<", StringComparison.OrdinalIgnoreCase) && !content.StartsWith("<!DOCTYPE html>", StringComparison.OrdinalIgnoreCase));
        }

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
