using Examine;
using Microsoft.Extensions.Logging;
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

        private readonly HashSet<InternalPageSchema> _internalDtos = new HashSet<InternalPageSchema>();
        private readonly HashSet<ExternalPageSchema> _externalDtos = new HashSet<ExternalPageSchema>();
        private readonly HashSet<ImageSchema> _imageDtos = new HashSet<ImageSchema>();

        private readonly HashSet<KeyValuePair<Guid, string>> _umbracoContent = new HashSet<KeyValuePair<Guid, string>>();

        private readonly IScopeProvider _scopeProvider;
        private readonly IExamineManager _examineManager;
        private readonly IPublishedUrlProvider _urlProvider;
        private readonly ISitemapService _sitemapService;
        private readonly IRobotsService _robotsService;
        private readonly IPageScanningService _pageScanningService;
        private readonly ILogger<CrawlerService> _logger;

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
            IPageScanningService pageScanningService,
            ILogger<CrawlerService> logger,
            HttpClient httpClient)
        {
            _scopeProvider = scopeProvider;
            _examineManager = examineManager;
            _urlProvider = urlProvider;
            _sitemapService = sitemapService;
            _robotsService = robotsService;
            _pageScanningService = pageScanningService;
            _logger = logger;

            _contentAuditSettings = contentAuditSettings.CurrentValue;
            _requestHandlerSettings = requestHandlerSettings.CurrentValue;
        }
        
        public async IAsyncEnumerable<CrawlDto> StartCrawl(string baseUrl, CancellationToken cancellationToken)
        {
            _baseUrl = _requestHandlerSettings.AddTrailingSlash ? baseUrl.EnsureEndsWith('/') : baseUrl;
            _baseUri = new Uri(_baseUrl);

            await GetSitemap();
            await GetRobots();
            LoadUmbracoContentUrls();
            QueueUmbracoContent();

            while (_internalUrlQueue.TryDequeue(out string? url))
            {
                _logger.LogInformation("Dequeuing internal URL: {0}", url);
                var crawlResult = await CrawlInternalUrl(url);
                if (crawlResult != null)
                    yield return crawlResult;
            }

            foreach (var externalUrl in _externalDtos.DistinctBy(x => x.Url))
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
            _logger.LogInformation("Starting crawl: {0}", url);
            if (!_visitedUrls.Contains(url) && !IsDisallowed(url))
            {
                _visitedUrls.Add(url);

                var matchingUmbracoNode = _umbracoContent.FirstOrDefault(x => x.Value == url.EnsureEndsWith('/'));
                var pageData = await _pageScanningService.GetPageData(url, matchingUmbracoNode.Key);
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
                            _externalDtos.Add(new ExternalPageSchema()
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
                        _externalDtos.Add(new ExternalPageSchema()
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

                _internalDtos.Add(new InternalPageSchema(pageData, 0));
                foreach (var image in pageData.Images)
                    _imageDtos.Add(new ImageSchema(image));

                return new CrawlDto
                {
                    Url = url,
                    Crawled = true,
                    Asset = _internalAssetUrls.Contains(url),
                    External = false,
                    Blocked = false
                };
            }

            _logger.LogInformation("URL has already been crawled: {0}", url);
            return null;
        }

        private async Task SaveCrawlResults()
        {
            using var scope = _scopeProvider.CreateScope();
            var externalUrls = _externalDtos.DistinctBy(x => x.Url);
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
                foreach (var page in _internalDtos)
                {
                    page.RunId = runId;
                    page.IsAsset = _internalAssetUrls.Contains(page.Url);
                    page.IsOrphaned = _orphanedPages.Contains(page.Url);
                    await scope.Database.InsertAsync(page);
                }

                foreach (var externalPage in _externalDtos)
                {
                    externalPage.RunId = runId;
                    await scope.Database.InsertAsync(externalPage);
                }

                foreach (var image in _imageDtos)
                {
                    image.RunId = runId;
                    await scope.Database.InsertAsync(image);
                }
            }

            scope.Complete();
        }

        private async Task GetSitemap()
        {
            _logger.LogInformation("Should we attempt to use sitemap.xml? {0}", _contentAuditSettings.UseSitemapXml);
            if (_contentAuditSettings.UseSitemapXml)
            {
                var sitemapUrls = await _sitemapService.GetSitemapUrlsAsync(_baseUrl);
                sitemapUrls.ForEach(x =>
                {
                    _internalPageUrls.Add(x);
                    _internalUrlQueue.Enqueue(x);
                    _logger.LogInformation("Adding {0} to the URL queue from sitemap.xml", x);
                });
            }
            else
            {
                _internalPageUrls.Add(_baseUrl);
                _internalUrlQueue.Enqueue(_baseUrl);
                _logger.LogInformation("Adding {0} to the URL queue", _baseUrl);
            }
        }

        private async Task GetRobots()
        {
            _logger.LogInformation("Should we attempt to use robots.txt? {0}", _contentAuditSettings.RespectRobotsTxt);
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

                        _logger.LogInformation("Adding {0} to the URL queue from Umbraco content index", absoluteUrl);
                    }
                }
            }
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
