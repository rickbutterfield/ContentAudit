using Examine;
using HtmlAgilityPack;
using Microsoft.Extensions.Options;
using System.Collections.Concurrent;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Infrastructure.Examine;
using Umbraco.Cms.Infrastructure.Scoping;
using Umbraco.Community.ContentAudit.Common.Configuration;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Schemas;
using Umbraco.Extensions;
using static Umbraco.Cms.Core.Constants;

namespace Umbraco.Community.ContentAudit.Services
{
    public class CrawlerService : ICrawlerService
    {
        private string? _baseUrl;

        private readonly ConcurrentQueue<string> _urlQueue = new ConcurrentQueue<string>();
        private readonly HashSet<string> _visitedUrls = new HashSet<string>();
        private readonly HashSet<string> _disallowedUrls = new HashSet<string>();
        private readonly HashSet<string> _robotsDisallowedPaths = new HashSet<string>();
        private readonly HashSet<string> _internalUrls = new HashSet<string>();
        private readonly HashSet<string> _internalPageUrls = new HashSet<string>();
        private readonly HashSet<string> _internalAssetUrls = new HashSet<string>();
        private readonly HashSet<string> _externalUrls = new HashSet<string>();
        private readonly HashSet<string> _linkedPages = new HashSet<string>();
        private HashSet<string> _orphanedPages = new HashSet<string>();

        private readonly HashSet<PageSchema> _crawledPages = new HashSet<PageSchema>();
        private readonly HashSet<ImageSchema> _imageData = new HashSet<ImageSchema>();

        private readonly HashSet<KeyValuePair<Guid, string>> _umbracoContent = new HashSet<KeyValuePair<Guid, string>>();

        private readonly HttpClient _httpClient;

        private readonly IScopeProvider _scopeProvider;
        private readonly IExamineManager _examineManager;
        private readonly IPublishedUrlProvider _urlProvider;
        private readonly ISitemapService _sitemapService;
        private readonly IRobotsService _robotsService;

        public ContentAuditSettings _contentAuditSettings { get; private set; }
        public RequestHandlerSettings _requestHandlerSettings { get; private set; }

        public CrawlerService(
            IOptionsMonitor<ContentAuditSettings> contentAuditSettings,
            IOptionsMonitor<RequestHandlerSettings> requestHandlerSettings,
            IScopeProvider scopeProvider,
            IExamineManager examineManager,
            IPublishedUrlProvider urlProvider,
            ISitemapService sitemapService,
            IRobotsService robotsService,
            HttpClient httpClient)
        {
            _scopeProvider = scopeProvider;
            _examineManager = examineManager;
            _urlProvider = urlProvider;
            _sitemapService = sitemapService;
            _robotsService = robotsService;

            _httpClient = httpClient;

            _contentAuditSettings = contentAuditSettings.CurrentValue;
            _requestHandlerSettings = requestHandlerSettings.CurrentValue;
        }

        public async IAsyncEnumerable<CrawlDto> StartCrawl(string baseUrl)
        {
            if (_requestHandlerSettings.AddTrailingSlash)
            {
                baseUrl = baseUrl.EnsureEndsWith('/');
            }

            _baseUrl = baseUrl;
            var baseUri = new Uri(_baseUrl);
            bool useSitemap = false;

            if (_contentAuditSettings.RespectRobotsTxt)
            {
                var robotsDisallowedUrls = await _robotsService.GetDisallowedPathsAsync(baseUrl);
                if (robotsDisallowedUrls != null && robotsDisallowedUrls?.Any() == true)
                    robotsDisallowedUrls.ForEach(x => _robotsDisallowedPaths.Add(x));
            }

            var sitemapUrls = await _sitemapService.GetSitemapUrlsAsync(baseUrl);
            if (_contentAuditSettings.UseSitemapXml && sitemapUrls != null && sitemapUrls?.Any() == true)
            {
                useSitemap = true;
                sitemapUrls.ForEach(x =>
                {
                    _urlQueue.Enqueue(x);
                    _internalPageUrls.Add(x);
                });
            }
            else
            {
                _internalPageUrls.Add(_baseUrl);
                _urlQueue.Enqueue(_baseUrl);
            }

            var umbracoContentData = LoadUmbracoContentUrls();
            if (umbracoContentData.Any())
                umbracoContentData.ForEach(x => _umbracoContent.Add(x));

            foreach (var kvp in _umbracoContent)
            {
                if (Uri.TryCreate(baseUri, kvp.Value, out Uri? absoluteUri))
                {
                    string absoluteUrl = absoluteUri.AbsoluteUri;
                    _internalPageUrls.Add(absoluteUrl);

                    if (!_visitedUrls.Contains(absoluteUrl) && !IsDisallowed(absoluteUrl))
                    {
                        _urlQueue.Enqueue(absoluteUrl);
                    }
                }
            }

            while (_urlQueue.TryDequeue(out string? url))
            {
                // Turn the URL into a C# Uri
                var currentUri = new Uri(url);

                // Check if it's an internal or external link
                bool isInternal = currentUri.Host.Equals(baseUri.Host, StringComparison.OrdinalIgnoreCase);
                if (isInternal)
                {
                    _internalUrls.Add(url);
                }
                else
                {
                    _externalUrls.Add(url);
                }

                bool isAsset = _internalAssetUrls.Contains(url);

                // Skip if this page has already been visited
                if (_visitedUrls.Contains(url)) continue;

                // Check if robots.txt is saying we shouldn't visit
                if (IsDisallowed(url))
                {
                    _disallowedUrls.Add(url);
                    yield return new CrawlDto
                    {
                        Url = url,
                        External = !isInternal,
                        Asset = isAsset,
                        Crawled = false,
                        Blocked = true
                    };
                    continue;
                }

                // Now let's get the actual URL and associated data
                // - Find the matching internal Umbraco node (might be useful in the future)
                // - Visit the page and get the assets
                // - Add it to our visited list
                var matchingUmbracoNode = _umbracoContent.FirstOrDefault(x => x.Value == url.EnsureEndsWith('/'));
                var pageResponse = await GetPageWithAssetsAsync(url, matchingUmbracoNode.Key);
                if (pageResponse == null) continue;

                pageResponse.IsExternal = !isInternal;
                pageResponse.IsAsset = isAsset;

                pageResponse.Images.ForEach(x => _imageData.Add(new ImageSchema(x)));

                _visitedUrls.Add(url);

                yield return new CrawlDto
                {
                    Url = url,
                    Asset = isAsset,
                    External = !isInternal,
                    Crawled = true,
                    Blocked = false
                };

                var notVisitedLinks = pageResponse.Links.Where(x => !_linkedPages.Contains(x));
                foreach (var link in notVisitedLinks)
                {
                    if (Uri.TryCreate(baseUri, link, out Uri? absoluteUri))
                    {
                        string absoluteUrl = absoluteUri.AbsoluteUri;

                        _linkedPages.Add(absoluteUrl);

                        bool hasBeenVisited = _visitedUrls.Contains(absoluteUrl);
                        bool isDisallowed = IsDisallowed(absoluteUrl);
                        if (!hasBeenVisited && !isDisallowed)
                        {
                            _urlQueue.Enqueue(absoluteUrl);
                        }
                        else
                        {
                            // We've not visited this page yet
                            _ = absoluteUri;
                        }
                    }
                }

                foreach (var resource in pageResponse.Resources)
                {
                    if (Uri.TryCreate(baseUri, resource.Url, out Uri? absoluteUri))
                    {
                        string absoluteUrl = absoluteUri.AbsoluteUri;

                        if (!resource.IsExternal)
                        {
                            _internalAssetUrls.Add(resource.Url);

                            if (!_visitedUrls.Contains(resource.Url) && !IsDisallowed(resource.Url))
                                _urlQueue.Enqueue(resource.Url);
                        }
                        else
                        {
                            // This must be an external URL? We don't want to crawl these currently
                            _ = absoluteUri;
                        }
                    }
                }

                var dto = new PageSchema(pageResponse, 0);
                _crawledPages.Add(dto);

                if (_urlQueue.IsEmpty)
                    break;
            }

            var totalUrls = _visitedUrls.Count + _disallowedUrls.Count;
            _orphanedPages = _internalPageUrls.Except(_linkedPages).ToHashSet();

            using var scope = _scopeProvider.CreateScope();
            int runId = 0;
            try
            {
                var overview = await scope.Database.InsertAsync(new OverviewSchema()
                {
                    RunDate = DateTime.Now,
                    TotalUrls = totalUrls,
                    TotalPagesCrawled = _internalPageUrls.Count,
                    TotalAssetsCrawled = _internalAssetUrls.Count,
                    TotalBlockedUrls = _disallowedUrls.Count
                });

                int.TryParse(overview.ToString(), out runId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }

            try
            {
                foreach (var page in _crawledPages)
                {
                    page.RunId = runId;
                    page.IsOrphaned = _orphanedPages.Contains(page.Url);
                    await scope.Database.InsertAsync(page);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }

            try
            {
                foreach (var image in _imageData)
                {
                    image.RunId = runId;
                    await scope.Database.InsertAsync(image);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
            scope.Complete();
        }

        private async Task<PageDto> GetPageWithAssetsAsync(string url, Guid? nodeKey = null)
        {
            Uri baseUri = new Uri(url);

            var response = new PageDto
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

            response.Links.AddRange(linkUrls.Distinct());

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
                imageData.AddRange(imgNodes.Select(x => new KeyValuePair<string, string>(x.GetAttributeValue("src", ""), x.GetAttributeValue("alt", ""))));
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
                    FoundPage = url
                });
            }

            // Update total page size to include assets
            response.Size += totalAssetsSize;

            return response;
        }

        private async Task<ResourceDto> GetResourceSizeAsync(Uri assetUri)
        {
            var resource = new ResourceDto { Url = assetUri.ToString() };

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

        private List<KeyValuePair<Guid, string>> LoadUmbracoContentUrls()
        {
            List<KeyValuePair<Guid, string>> contentData = new List<KeyValuePair<Guid, string>>();

            if (_examineManager.TryGetIndex(UmbracoIndexes.InternalIndexName, out var contentIndex))
            {
                var searcher = contentIndex.Searcher;

                // Query for all nodes in the index
                var query = searcher.CreateQuery("content").NativeQuery("+__IndexType:content");
                var results = query.Execute();

                foreach (var result in results)
                {
                    // Retrieve the key (GUID) and URL for each node
                    if (result.Values.TryGetValue(UmbracoExamineFieldNames.NodeKeyFieldName, out var keyString) &&
                        Guid.TryParse(keyString, out var key) &&
                        result.Values.TryGetValue(UmbracoExamineFieldNames.ItemIdFieldName, out var idString) &&
                        int.TryParse(idString, out var nodeId))
                    {
                        var url = _urlProvider.GetUrl(nodeId, UrlMode.Absolute);
                        if (!string.IsNullOrEmpty(url))
                        {
                            contentData.Add(new KeyValuePair<Guid, string>(key, url));
                        }
                    }
                }
            }

            return contentData;
        }

        private bool IsDisallowed(string url)
        {
            return _robotsDisallowedPaths.Any(disallowed => url.StartsWith(disallowed, StringComparison.OrdinalIgnoreCase));
        }
    }
}
