using HtmlAgilityPack;
using Microsoft.Extensions.Logging;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Services
{
    public class PageScanningService : IPageScanningService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<PageScanningService> _logger;

        public PageScanningService(
            HttpClient httpClient,
            ILogger<PageScanningService> logger)
        {
            _httpClient = new HttpClient();
            _logger = logger;
        }

        public async Task<InternalPageDto> GetPageData(string url, Guid? nodeKey = null)
        {
            Uri baseUri = new Uri(url);

            var response = new InternalPageDto
            {
                Url = url,
                NodeKey = nodeKey
            };

            HttpResponseMessage initialResponse = await _httpClient.GetAsync(url);
            response.StatusCode = (int)initialResponse.StatusCode;
            response.ContentType = initialResponse.Content.Headers.ContentType?.ToString();

            try
            {
                initialResponse.EnsureSuccessStatusCode();
                var htmlBytes = await initialResponse.Content.ReadAsByteArrayAsync();
                response.Size = htmlBytes.LongLength;

                string html = System.Text.Encoding.UTF8.GetString(htmlBytes);
                response.PageContent = html;

                var doc = new HtmlDocument();
                doc.LoadHtml(html);

                // Extract page title
                var titleNode = doc.DocumentNode.SelectSingleNode("//title");
                if (titleNode != null)
                    response.MetaTitle = titleNode.InnerText.Trim();

                // Extract `meta`
                var metaDescriptionNode = doc.DocumentNode.SelectSingleNode("//meta[@name='description']");
                if (metaDescriptionNode != null)
                    response.MetaDescription = metaDescriptionNode.GetAttributeValue("content", "");

                var metaKeywordsNode = doc.DocumentNode.SelectSingleNode("//meta[@name='keywords']");
                if (metaKeywordsNode != null)
                    response.MetaKeywords = metaKeywordsNode.GetAttributeValue("content", "");

                var metaRobotsNode = doc.DocumentNode.SelectSingleNode("//meta[@name='robots']");
                if (metaRobotsNode != null)
                    response.MetaRobots = metaRobotsNode.GetAttributeValue("content", "");

                // Check canonical URL
                var canonical = doc.DocumentNode.SelectSingleNode("//link[@rel='canonical']");
                if (canonical != null)
                {
                    var canonicalUrl = canonical.GetAttributeValue("href", "");
                    response.CanonicalUrl = canonicalUrl;
                }

                // Collect links from <a> tags
                List<string> linkUrls = new List<string>();
                var aNodes = doc.DocumentNode.SelectNodes("//a[@href]");
                if (aNodes != null)
                    linkUrls.AddRange(aNodes.Select(x => x.GetAttributeValue("href", "")));

                foreach (var relativeUrl in linkUrls.Distinct())
                {
                    if (string.IsNullOrEmpty(relativeUrl))
                        continue;

                    if (relativeUrl.Contains("X.com"))
                    {
                        _ = relativeUrl;
                    }
                    var linkUri = new Uri(baseUri, relativeUrl);
                    var linkDetails = await GetResourceSizeAsync(linkUri);
                    linkDetails.IsExternal = linkUri.Host != baseUri.Host;
                    linkDetails.IsAsset = false;

                    response.Links.Add(linkDetails);
                }

                // Collect H1s and H2s
                var h1s = doc.DocumentNode.SelectNodes("//h1");
                if (h1s != null)
                    response.H1.AddRange(h1s.Select(x => x.InnerText));

                var h2s = doc.DocumentNode.SelectNodes("//h2");
                if (h2s != null)
                    response.H2.AddRange(h2s.Select(x => x.InnerText));

                // Collect asset URLs (images, scripts, links for CSS)
                List<string> assetUrls = new List<string>();
                List<KeyValuePair<string, string>> imageData = new List<KeyValuePair<string, string>>();

                // Images
                var imgNodes = doc.DocumentNode.SelectNodes("//img[@src]");
                if (imgNodes != null)
                {
                    assetUrls.AddRange(imgNodes.Select(x => x.GetAttributeValue("src", "")));
                    imageData.AddRange(imgNodes.Select(x =>
                        new KeyValuePair<string, string>(x.GetAttributeValue("src", ""),
                            x.GetAttributeValue("alt", ""))));
                }

                // Scripts
                var scriptNodes = doc.DocumentNode.SelectNodes("//script[@src]");
                if (scriptNodes != null)
                    assetUrls.AddRange(scriptNodes.Select(x => x.GetAttributeValue("src", "")));

                // Stylesheets
                var linkNodes = doc.DocumentNode.SelectNodes("//link[@rel='stylesheet' and @href]");
                if (linkNodes != null)
                    assetUrls.AddRange(linkNodes.Select(x => x.GetAttributeValue("href", "")));

                // Resolve relative URLs and get sizes
                long totalAssetsSize = 0;

                foreach (var relativeUrl in assetUrls.Distinct())
                {
                    if (string.IsNullOrWhiteSpace(relativeUrl))
                        continue;

                    var assetUri = new Uri(baseUri, relativeUrl);
                    var resourceDetails = await GetResourceSizeAsync(assetUri);
                    resourceDetails.IsExternal = assetUri.Host != baseUri.Host;
                    resourceDetails.IsAsset = true;

                    response.Resources.Add(resourceDetails);
                    if (resourceDetails.Size.HasValue)
                    {
                        totalAssetsSize += (long)resourceDetails.Size.Value;
                    }
                }

                // Resolve relative URLs and get images
                foreach (var kvp in imageData.Distinct())
                {
                    if (string.IsNullOrWhiteSpace(kvp.Key))
                        continue;

                    var assetUri = new Uri(baseUri, kvp.Key);
                    var resourceDetails = await GetResourceSizeAsync(assetUri);
                    resourceDetails.IsExternal = assetUri.Host != baseUri.Host;
                    resourceDetails.IsAsset = true;

                    response.Images.Add(new ImageDto(resourceDetails)
                    {
                        AltText = kvp.Value,
                        FoundPage = url,
                        NodeKey = nodeKey
                    });
                }

                // Update total page size to include assets
                response.Size += totalAssetsSize;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("Page could not be retrieved: {0}", url);
            }

            return response;
        }

        private async Task<ResourceDto> GetResourceSizeAsync(Uri assetUri)
        {
            var resource = new ResourceDto { Url = assetUri.ToString() };

            // Try HEAD request first
            var headRequest = new HttpRequestMessage(HttpMethod.Head, assetUri);
            var headResponse = await _httpClient.SendAsync(headRequest, HttpCompletionOption.ResponseHeadersRead);

            resource.StatusCode = (int)headResponse.StatusCode;
            resource.ContentType = headResponse.Content.Headers.ContentType.ToString();

            if (headResponse.IsSuccessStatusCode && headResponse.Content.Headers.ContentLength.HasValue)
            {
                resource.Size = headResponse.Content.Headers.ContentLength.Value;
            }
            else
            {
                // If we didn't get content length from HEAD, try GET
                var getRequest = new HttpRequestMessage(HttpMethod.Get, assetUri);
                var getResponse = await _httpClient.SendAsync(getRequest, HttpCompletionOption.ResponseHeadersRead);
                resource.StatusCode = (int)getResponse.StatusCode;
                resource.ContentType = getResponse.Content.Headers.ContentType.ToString();

                if (getResponse.IsSuccessStatusCode && getResponse.Content.Headers.ContentLength.HasValue)
                {
                    resource.Size = getResponse.Content.Headers.ContentLength.Value;
                }
                else
                {
                    // Fall back to fully downloading if no content length is provided
                    var assetBytes = await getResponse.Content.ReadAsByteArrayAsync();
                    resource.Size = assetBytes.LongLength;
                }
            }

            return resource;
        }
    }
}
