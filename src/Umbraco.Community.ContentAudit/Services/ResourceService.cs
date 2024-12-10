using HtmlAgilityPack;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Services
{
    public class ResourceService : IResourceService
    {
        private readonly HttpClient _httpClient;

        public ResourceService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<PageResponseDto> GetPageWithAssetsAsync(string url, Guid? nodeKey = null)
        {
            Uri baseUri = new Uri(url);

            var response = new PageResponseDto
            {
                Url = url,
                NodeKey = nodeKey
            };

            HttpResponseMessage initialResponse = await _httpClient.GetAsync(url);
            response.StatusCode = (int)initialResponse.StatusCode;
            response.ContentType = initialResponse.Content.Headers.ContentType;

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
                response.MetaDescription = metaDescriptionNode.InnerText.Trim();

            var metaKeywordsNode = doc.DocumentNode.SelectSingleNode("//meta[@name='keywords']");
            if (metaKeywordsNode != null)
                response.MetaKeywords = metaKeywordsNode.GetAttributeValue("content", "");

            // Check canonical URL
            var canonical = doc.DocumentNode.SelectSingleNode("//link[@rel='canonical']");
            if (canonical != null)
            {
                var canonicalUrl = canonical.GetAttributeValue("href", "");
                response.CanonicalUrl = canonicalUrl;

                if (canonicalUrl == url)
                {
                    response.Canonicalised = true;
                }
            }

            // Collect links from <a> tags
            List<string> linkUrls = new List<string>();
            var aNodes = doc.DocumentNode.SelectNodes("//a[@href]");
            if (aNodes != null)
                linkUrls.AddRange(aNodes.Select(x => x.GetAttributeValue("href", "")));

            response.Links.AddRange(linkUrls.Distinct());

            // Collect asset URLs (images, scripts, links for CSS)
            List<string> assetUrls = new List<string>();

            // Images
            var imgNodes = doc.DocumentNode.SelectNodes("//img[@src]");
            if (imgNodes != null)
                assetUrls.AddRange(imgNodes.Select(x => x.GetAttributeValue("src", "")));

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
                response.Resources.Add(resourceDetails);
                if (resourceDetails.Size.HasValue)
                {
                    totalAssetsSize += resourceDetails.Size.Value;
                }
            }

            // Update total page size to include assets
            response.Size += totalAssetsSize;

            return response;
        }

        private async Task<PageResourceDto> GetResourceSizeAsync(Uri assetUri)
        {
            var resource = new PageResourceDto { Url = assetUri.ToString() };

            // Try HEAD request first
            var headRequest = new HttpRequestMessage(HttpMethod.Head, assetUri);
            var headResponse = await _httpClient.SendAsync(headRequest, HttpCompletionOption.ResponseHeadersRead);

            resource.StatusCode = (int)headResponse.StatusCode;
            resource.ContentType = headResponse.Content.Headers.ContentType;

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
