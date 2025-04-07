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

        private readonly ConcurrentQueue<UrlQueueItem> _urlQueue = new ConcurrentQueue<UrlQueueItem>();

        private readonly HashSet<string> _visitedInternalUrls = new HashSet<string>();
        private readonly HashSet<string> _visitedExternalUrls = new HashSet<string>();
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

            while (_urlQueue.TryDequeue(out UrlQueueItem? queueItem))
            {
                _logger.LogInformation("Dequeuing URL: {0} (IsExternal: {1}, IsAsset: {2})", queueItem.Url, queueItem.IsExternal, queueItem.IsAsset);

                CrawlDto? crawlResult = null;

                if (!queueItem.IsExternal)
                {
                    if (!queueItem.IsAsset)
                    {
                        crawlResult = await CrawlInternalUrl(queueItem.Url);
                    }
                    else
                    {
                        crawlResult = new CrawlDto
                        {
                            Url = queueItem.Url,
                            External = queueItem.IsExternal,
                            Crawled = true,
                            Asset = queueItem.IsAsset,
                            Blocked = false
                        };
                    }
                }
                else
                {
                    if (!_visitedExternalUrls.Contains(queueItem.Url))
                    {
                        _visitedExternalUrls.Add(queueItem.Url);

                        _externalDtos.Add(new ExternalPageSchema
                        {
                            Url = queueItem.Url,
                            FoundPage = queueItem.SourceUrl,
                            NodeKey = queueItem.NodeKey,
                            IsAsset = queueItem.IsAsset,
                            ContentType = queueItem.ContentType,
                            StatusCode = queueItem.StatusCode
                        });

                        crawlResult = new CrawlDto
                        {
                            Url = queueItem.Url,
                            External = queueItem.IsExternal,
                            Crawled = true,
                            Asset = queueItem.IsAsset,
                            Blocked = false
                        };
                    }
                }

                if (crawlResult != null)
                    yield return crawlResult;
            }

            await SaveCrawlResults();
        }

        private async Task<CrawlDto?> CrawlInternalUrl(string url)
        {
            _logger.LogInformation("Starting internal crawl: {0}", url);
            if (!_visitedInternalUrls.Contains(url) && !IsDisallowed(url))
            {
                _visitedInternalUrls.Add(url);

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

                        if (!_linkedPages.Contains(link.Url))
                        {
                            _linkedPages.Add(absoluteUrl);

                            if (isInternal)
                            {
                                if (!_visitedInternalUrls.Contains(absoluteUrl) && !IsUrlInQueue(absoluteUrl) && !IsDisallowed(absoluteUrl))
                                {
                                    EnqueueUrl(new UrlQueueItem
                                    {
                                        Url = absoluteUrl,
                                        IsExternal = false,
                                        IsAsset = false,
                                        SourceUrl = url,
                                        NodeKey = matchingUmbracoNode.Key
                                    });
                                }
                            }

                            else
                            {
                                EnqueueUrl(new UrlQueueItem
                                {
                                    Url = link.Url,
                                    IsExternal = true,
                                    IsAsset = false,
                                    SourceUrl = url,
                                    NodeKey = matchingUmbracoNode.Key,
                                    ContentType = link.ContentType,
                                    StatusCode = link.StatusCode
                                });
                            }
                        }
                    }
                }

                foreach (var resource in pageData.Resources)
                {
                    if (Uri.TryCreate(_baseUri, resource.Url, out var absoluteUri))
                    {
                        var absoluteUrl = absoluteUri.AbsoluteUri;
                        bool isInternal = absoluteUri.Host == _baseUri.Host;

                        if (isInternal && !_visitedInternalUrls.Contains(absoluteUrl) && !_internalAssetUrls.Contains(absoluteUrl))
                        {
                            _internalAssetUrls.Add(absoluteUrl);

                            EnqueueUrl(new UrlQueueItem
                            {
                                Url = absoluteUrl,
                                IsExternal = false,
                                IsAsset = true,
                                SourceUrl = url,
                                NodeKey = matchingUmbracoNode.Key
                            });
                        }
                        else if (!isInternal)
                        {
                            // External resource
                            EnqueueUrl(new UrlQueueItem
                            {
                                Url = resource.Url,
                                IsExternal = true,
                                IsAsset = true,
                                SourceUrl = url,
                                NodeKey = matchingUmbracoNode.Key,
                                ContentType = resource.ContentType,
                                StatusCode = resource.StatusCode
                            });
                        }
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
                    Blocked = false,
                    NodeKey = matchingUmbracoNode.Key
                };
            }

            _logger.LogInformation("URL has already been crawled: {0}", url);
            return null;
        }

        private void EnqueueUrl(UrlQueueItem item)
        {
            // Strip query string from the URL
            var uri = new Uri(item.Url, UriKind.RelativeOrAbsolute);
            if (uri.IsAbsoluteUri)
            {
                // For absolute URLs, rebuild without query string
                var uriBuilder = new UriBuilder(uri)
                {
                    Query = string.Empty // Remove query string
                };
                item.Url = uriBuilder.Uri.ToString();
            }
            else
            {
                // For relative URLs, manually remove query string
                int queryIndex = item.Url.IndexOf('?');
                if (queryIndex >= 0)
                {
                    item.Url = item.Url.Substring(0, queryIndex);
                }
            }

            // Strip fragment identifier (hash) if present
            int fragmentIndex = item.Url.IndexOf('#');
            if (fragmentIndex >= 0)
            {
                item.Url = item.Url.Substring(0, fragmentIndex);
            }

            // Don't queue URLs that are already in the queue
            if (!IsUrlInQueue(item.Url))
            {
                _urlQueue.Enqueue(item);
                _logger.LogInformation("Enqueuing URL: {0} (IsExternal: {1}, IsAsset: {2})",
                    item.Url, item.IsExternal, item.IsAsset);
            }
        }

        private bool IsUrlInQueue(string url) =>
            _urlQueue.Any(item => item.Url.Equals(url, StringComparison.OrdinalIgnoreCase));

        private async Task SaveCrawlResults()
        {
            using var scope = _scopeProvider.CreateScope();
            var externalUrls = _externalDtos.DistinctBy(x => x.Url);
            var totalUrls = _visitedInternalUrls.Count + _disallowedUrls.Count + _internalAssetUrls.Count + externalUrls.Count();
            var pagesCrawled = _visitedInternalUrls.Except(_internalAssetUrls).Count();

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
                _orphanedPages = _visitedInternalUrls.Except(_linkedPages).Except(_internalAssetUrls).ToHashSet();
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
                    EnqueueUrl(new UrlQueueItem
                    {
                        Url = x,
                        IsExternal = false,
                        IsAsset = false
                    });
                    _logger.LogInformation("Adding {0} to the URL queue from sitemap.xml", x);
                });
            }
            else
            {
                _internalPageUrls.Add(_baseUrl);
                EnqueueUrl(new UrlQueueItem
                {
                    Url = _baseUrl,
                    IsExternal = false,
                    IsAsset = false
                });
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
            _logger.LogInformation("Should we attempt to use Umbraco's content index? {0}", _contentAuditSettings.UseUmbracoContentIndex);
            if (_contentAuditSettings.UseUmbracoContentIndex)
            {
                foreach (var (key, url) in _umbracoContent)
                {
                    if (Uri.TryCreate(_baseUri, url, out var absoluteUri))
                    {
                        var absoluteUrl = absoluteUri.AbsoluteUri;
                        if (!_visitedInternalUrls.Contains(absoluteUrl) && !_internalPageUrls.Contains(absoluteUrl) && !IsDisallowed(absoluteUrl))
                        {
                            _internalPageUrls.Add(absoluteUrl);
                            EnqueueUrl(new UrlQueueItem
                            {
                                Url = absoluteUrl,
                                IsExternal = false,
                                IsAsset = false,
                                NodeKey = key
                            });

                            _logger.LogInformation("Adding {0} to the URL queue from Umbraco content index", absoluteUrl);
                        }
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
