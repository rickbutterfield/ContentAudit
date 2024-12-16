using Examine;
using HtmlAgilityPack;
using Microsoft.CodeAnalysis.CSharp.Syntax;
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
        private Uri? _baseUri;

        private readonly ConcurrentQueue<string> _internalUrlQueue = new ConcurrentQueue<string>();
        private readonly HashSet<string> _visitedUrls = new HashSet<string>();
        private readonly HashSet<string> _disallowedUrls = new HashSet<string>();
        private readonly HashSet<string> _robotsDisallowedPaths = new HashSet<string>();
        private readonly HashSet<string> _internalPageUrls = new HashSet<string>();
        private readonly HashSet<string> _internalAssetUrls = new HashSet<string>();
        private readonly HashSet<string> _linkedPages = new HashSet<string>();
        private HashSet<string> _orphanedPages = new HashSet<string>();

        private readonly HashSet<InternalPageSchema> _crawledPages = new HashSet<InternalPageSchema>();
        private readonly HashSet<ImageSchema> _imageData = new HashSet<ImageSchema>();
        private readonly HashSet<ExternalPageSchema> _externalUrls = new HashSet<ExternalPageSchema>();

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
            _baseUrl = _requestHandlerSettings.AddTrailingSlash ? baseUrl.EnsureEndsWith('/') : baseUrl;
            _baseUri = new Uri(_baseUrl);

            await GetSitemap();
            await GetRobots();
            LoadUmbracoContentUrls();
            QueueUmbracoContent();

            while (_internalUrlQueue.TryDequeue(out string? url))
            {
                Console.WriteLine("Dequeuing internal URL: {0}", url);
                var crawlResult = await CrawlInternalUrl(url);
                if (crawlResult != null)
                    yield return crawlResult;
            }

            foreach (var externalUrl in _externalUrls.DistinctBy(x => x.Url))
            {
                yield return new CrawlDto()
                {
                    Url = externalUrl.Url,
                    External = true,
                    Crawled = true,
                    Asset = false,
                    Blocked = false
                };
            }

            await SaveCrawlResults();
        }

        private async Task<CrawlDto?> CrawlInternalUrl(string url)
        {
            Console.WriteLine("Starting crawl: {0}", url);
            if (!_visitedUrls.Contains(url) && !IsDisallowed(url))
            {
                _visitedUrls.Add(url);

                var matchingUmbracoNode = _umbracoContent.FirstOrDefault(x => x.Value == url.EnsureEndsWith('/'));
                var pageData = await GetPageData(url, matchingUmbracoNode.Key);
                if (pageData == null)
                    return null;

                foreach (var link in pageData.Links.Where(x => !_linkedPages.Contains(x.Url)))
                {
                    if (Uri.TryCreate(_baseUri, link.Url, out var absoluteUri))
                    {
                        var absoluteUrl = absoluteUri.AbsoluteUri;
                        bool isInternal = absoluteUri.Host == _baseUri.Host;

                        if (isInternal && !_linkedPages.Contains(link.Url))
                        {
                            _linkedPages.Add(absoluteUrl);

                            if (!_visitedUrls.Contains(absoluteUrl) && !_internalUrlQueue.Contains(absoluteUrl) && !IsDisallowed(absoluteUrl))
                            {
                                _internalUrlQueue.Enqueue(absoluteUrl);
                            }
                        }

                        else
                        {
                            // External link?
                            _externalUrls.Add(new ExternalPageSchema()
                            {
                                Url = link.Url,
                                FoundPage = url,
                                NodeKey = matchingUmbracoNode.Key,
                                IsAsset = false,
                                ContentType = link.ContentType.ToString(),
                                StatusCode = link.StatusCode
                            });
                        }
                    }
                }

                foreach (var resource in pageData.Resources)
                {
                    if (!resource.IsExternal && Uri.TryCreate(_baseUri, resource.Url, out var absoluteUri))
                    {
                        var absoluteUrl = absoluteUri.AbsoluteUri;
                        if (!_visitedUrls.Contains(absoluteUrl) && !_internalAssetUrls.Contains(absoluteUrl))
                        {
                            _internalAssetUrls.Add(absoluteUrl);
                            _internalUrlQueue.Enqueue(absoluteUrl);
                        }
                    }
                    else
                    {
                        // External resource?
                        _externalUrls.Add(new ExternalPageSchema()
                        {
                            Url = resource.Url,
                            FoundPage = url,
                            NodeKey = matchingUmbracoNode.Key,
                            IsAsset = true,
                            ContentType = resource.ContentType.ToString(),
                            StatusCode = resource.StatusCode
                        });
                    }
                }

                _crawledPages.Add(new InternalPageSchema(pageData, 0));
                foreach (var image in pageData.Images)
                    _imageData.Add(new ImageSchema(image));

                return new CrawlDto
                {
                    Url = url,
                    Crawled = true,
                    Asset = _internalAssetUrls.Contains(url),
                    External = false,
                    Blocked = false
                };
            }

            Console.WriteLine("URL has already been crawled: {0}", url);
            return null;
        }

        private async Task<InternalPageDto> GetPageData(string url, Guid? nodeKey = null)
        {
            Uri baseUri = new Uri(url);

            var response = new InternalPageDto
            {
                Url = url,
                NodeKey = nodeKey
            };

            HttpResponseMessage initialResponse = await _httpClient.GetAsync(url);
            response.StatusCode = (int)initialResponse.StatusCode;
            response.ContentType = initialResponse.Content.Headers.ContentType;

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
                Console.WriteLine("Page could not be retrieved: {0}", url);
            }

            return response;
        }

        private async Task SaveCrawlResults()
        {
            using var scope = _scopeProvider.CreateScope();
            var externalUrls = _externalUrls.DistinctBy(x => x.Url);
            var totalUrls = _visitedUrls.Count + _disallowedUrls.Count + externalUrls.Count();
            var pagesCrawled = _visitedUrls.Except(_internalAssetUrls).Count();

            var overview = new OverviewSchema
            {
                RunDate = DateTime.Now,
                Total = totalUrls,
                TotalInternal = pagesCrawled,
                TotalExternal = externalUrls.Count(),
                TotalAssets = _internalAssetUrls.Count,
                TotalBlocked = _robotsDisallowedPaths.Count
            };

            var runData = await scope.Database.InsertAsync(overview);

            if (int.TryParse(runData.ToString(), out int runId))
            {
                _orphanedPages = _visitedUrls.Except(_linkedPages).Except(_internalAssetUrls).ToHashSet();
                foreach (var page in _crawledPages)
                {
                    page.RunId = runId;
                    page.IsOrphaned = _orphanedPages.Contains(page.Url);
                    await scope.Database.InsertAsync(page);
                }

                foreach (var externalPage in _externalUrls)
                {
                    externalPage.RunId = runId;
                    await scope.Database.InsertAsync(externalPage);
                }

                foreach (var image in _imageData)
                {
                    image.RunId = runId;
                    await scope.Database.InsertAsync(image);
                }
            }

            scope.Complete();
        }

        private async Task GetSitemap()
        {
            Console.WriteLine("Should we attempt to use sitemap.xml? {0}", _contentAuditSettings.UseSitemapXml);
            if (_contentAuditSettings.UseSitemapXml)
            {
                var sitemapUrls = await _sitemapService.GetSitemapUrlsAsync(_baseUrl);
                sitemapUrls.ForEach(x =>
                {
                    _internalPageUrls.Add(x);
                    _internalUrlQueue.Enqueue(x);
                    Console.WriteLine("Adding {0} to the URL queue from sitemap.xml", x);
                });
            }
            else
            {
                _internalPageUrls.Add(_baseUrl);
                _internalUrlQueue.Enqueue(_baseUrl);
                Console.WriteLine("Adding {0} to the URL queue", _baseUrl);
            }
        }

        private async Task GetRobots()
        {
            Console.WriteLine("Should we attempt to use robots.txt? {0}", _contentAuditSettings.RespectRobotsTxt);
            if (_contentAuditSettings.RespectRobotsTxt)
            {
                var robotsDisallowedUrls = await _robotsService.GetDisallowedPathsAsync(_baseUrl);
                if (robotsDisallowedUrls != null && robotsDisallowedUrls?.Any() == true)
                    robotsDisallowedUrls.ForEach(x => _robotsDisallowedPaths.Add(x));
            }
        }

        private void QueueUmbracoContent()
        {
            foreach (var (key, url) in _umbracoContent)
            {
                if (Uri.TryCreate(_baseUri, url, out var absoluteUri))
                {
                    var absoluteUrl = absoluteUri.AbsoluteUri;
                    if (!_visitedUrls.Contains(absoluteUrl) && !_internalPageUrls.Contains(absoluteUrl) && !IsDisallowed(absoluteUrl))
                    {
                        _internalPageUrls.Add(absoluteUrl);
                        _internalUrlQueue.Enqueue(absoluteUrl);

                        Console.WriteLine("Adding {0} to the URL queue from Umbraco content index", absoluteUrl);
                    }
                }
            }
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

        private void LoadUmbracoContentUrls()
        {
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
                            _umbracoContent.Add(new KeyValuePair<Guid, string>(key, url));
                    }
                }
            }
        }

        private bool IsDisallowed(string url)
        {
            return _robotsDisallowedPaths.Any(disallowed => url.StartsWith(disallowed, StringComparison.OrdinalIgnoreCase));
        }
    }
}
