using Examine;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Collections.Concurrent;
using System.Runtime.CompilerServices;
using System.Threading.Channels;
using System.Threading.Tasks.Dataflow;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Infrastructure.Examine;
using Umbraco.Cms.Infrastructure.Scoping;
using Umbraco.Community.ContentAudit.Common.Configuration;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;
using Umbraco.Community.ContentAudit.Schemas;
using Umbraco.Extensions;
using static Umbraco.Cms.Core.Constants;

namespace Umbraco.Community.ContentAudit.Services
{
    public class AuditService : IAuditService
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

        private readonly HashSet<PageSchema> _internalDtos = new HashSet<PageSchema>();
        private readonly HashSet<ExternalPageSchema> _externalDtos = new HashSet<ExternalPageSchema>();
        private readonly HashSet<ImageSchema> _imageDtos = new HashSet<ImageSchema>();

        private readonly HashSet<KeyValuePair<Guid, string>> _umbracoContent = new HashSet<KeyValuePair<Guid, string>>();

        private readonly HashSet<SeoSchema> _seoDtos = new HashSet<SeoSchema>();
        private readonly HashSet<ContentAnalysisSchema> _contentAnalysisDtos = new HashSet<ContentAnalysisSchema>();
        private readonly HashSet<PerformanceSchema> _performanceDtos = new HashSet<PerformanceSchema>();
        private readonly HashSet<AccessibilitySchema> _accessibilityDtos = new HashSet<AccessibilitySchema>();
        private readonly HashSet<TechnicalSeoSchema> _technicalSeoDtos = new HashSet<TechnicalSeoSchema>();
        private readonly HashSet<SocialMediaSchema> _socialMediaDtos = new HashSet<SocialMediaSchema>();
        private readonly HashSet<ContentQualitySchema> _contentQualityDtos = new HashSet<ContentQualitySchema>();

        private readonly IScopeProvider _scopeProvider;
        private readonly IExamineManager _examineManager;
        private readonly IPublishedUrlProvider _urlProvider;
        private readonly ISitemapService _sitemapService;
        private readonly IRobotsService _robotsService;
        private readonly ICrawlService _pageScanningService;
        private readonly ILogger<AuditService> _logger;

        private readonly Channel<CrawlDto> _crawlResultsChannel;
        private readonly SemaphoreSlim _crawlSemaphore;
        private volatile bool _isDiscoveryComplete;

        public ContentAuditSettings _contentAuditSettings { get; private set; }
        public RequestHandlerSettings _requestHandlerSettings { get; private set; }

        public AuditService(
            IOptionsMonitor<ContentAuditSettings> contentAuditSettings,
            IOptionsMonitor<RequestHandlerSettings> requestHandlerSettings,
            IScopeProvider scopeProvider,
            IExamineManager examineManager,
            IPublishedUrlProvider urlProvider,
            ISitemapService sitemapService,
            IRobotsService robotsService,
            ICrawlService pageScanningService,
            ILogger<AuditService> logger,
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

            _crawlResultsChannel = Channel.CreateUnbounded<CrawlDto>();
            _crawlSemaphore = new SemaphoreSlim(_contentAuditSettings.MaxConcurrentCrawls);
        }

        public async IAsyncEnumerable<CrawlDto> StartCrawl(string baseUrl, [EnumeratorCancellation] CancellationToken cancellationToken)
        {
            _baseUrl = _requestHandlerSettings.AddTrailingSlash ? baseUrl.EnsureEndsWith('/') : baseUrl;
            _baseUri = new Uri(_baseUrl);
            _isDiscoveryComplete = false;

            await GetSitemap();
            await GetRobots();

            LoadUmbracoContentUrls();
            QueueUmbracoContent();

            var processUrlBlock = new ActionBlock<UrlQueueItem>(
                async queueItem => await ProcessUrlAsync(queueItem, _baseUri, cancellationToken),
                new ExecutionDataflowBlockOptions
                {
                    MaxDegreeOfParallelism = _contentAuditSettings.MaxConcurrentCrawls,
                    CancellationToken = cancellationToken,
                    BoundedCapacity = 100
                });

            var urlProcessingTask = Task.Run(async () =>
            {
                try
                {
                    _logger.LogInformation("Starting URL processing with {0} initial URLs in queue", _urlQueue.Count);

                    while (_urlQueue.TryDequeue(out UrlQueueItem? queueItem))
                    {
                        _logger.LogInformation("Processing initial URL from queue: {0}", queueItem.Url);
                        await processUrlBlock.SendAsync(queueItem, cancellationToken);
                    }

                    int emptyChecks = 0;
                    const int maxEmptyChecks = 3;

                    while (!_isDiscoveryComplete || !_urlQueue.IsEmpty)
                    {
                        while (_urlQueue.TryDequeue(out UrlQueueItem? queueItem))
                        {
                            _logger.LogInformation("Processing newly discovered URL: {0}", queueItem.Url);
                            await processUrlBlock.SendAsync(queueItem, cancellationToken);
                            emptyChecks = 0;
                        }

                        if (_urlQueue.IsEmpty && processUrlBlock.InputCount == 0)
                        {
                            emptyChecks++;
                            _logger.LogInformation("Empty state check {0}/{1}", emptyChecks, maxEmptyChecks);

                            if (emptyChecks >= maxEmptyChecks)
                            {
                                _logger.LogInformation("No new URLs discovered after {0} checks, completing crawl", maxEmptyChecks);
                                _isDiscoveryComplete = true;
                                break;
                            }

                            await Task.Delay(5000, cancellationToken);
                        }
                        else
                        {
                            emptyChecks = 0;
                            await Task.Delay(100, cancellationToken);
                        }
                    }

                    _logger.LogInformation("URL processing complete, signaling completion");
                    processUrlBlock.Complete();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error in URL processing task");
                    processUrlBlock.Complete();
                    throw;
                }
            }, cancellationToken);

            var completionTask = Task.Run(async () =>
            {
                try
                {
                    await urlProcessingTask;
                    await processUrlBlock.Completion;

                    _logger.LogInformation("All processing complete, saving crawl results");
                    await SaveCrawlResults();

                    _crawlResultsChannel.Writer.Complete();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error during completion");
                    throw;
                }
            }, cancellationToken);

            await foreach (var result in _crawlResultsChannel.Reader.ReadAllAsync(cancellationToken))
                yield return result;

            await completionTask;
        }

        private async Task ProcessUrlAsync(UrlQueueItem queueItem, Uri baseUri, CancellationToken cancellationToken)
        {
            try
            {
                await _crawlSemaphore.WaitAsync(cancellationToken);
                _logger.LogInformation("Started processing URL: {0}", queueItem.Url);

                CrawlDto? crawlResult = null;

                if (!queueItem.IsExternal)
                {
                    if (!queueItem.IsAsset)
                    {
                        crawlResult = await CrawlInternalUrl(queueItem.Url, baseUri);
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
                    lock (_visitedExternalUrls)
                    {
                        if (!_visitedExternalUrls.Contains(queueItem.Url))
                        {
                            _visitedExternalUrls.Add(queueItem.Url);

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

                    lock (_externalDtos)
                    {
                        _externalDtos.Add(new ExternalPageSchema
                        {
                            Url = queueItem.Url,
                            FoundPage = queueItem.SourceUrl,
                            NodeKey = queueItem.NodeKey,
                            IsAsset = queueItem.IsAsset
                        });
                    }
                }

                if (crawlResult != null)
                {
                    _logger.LogInformation("Writing crawl result for URL: {0}", queueItem.Url);
                    await _crawlResultsChannel.Writer.WriteAsync(crawlResult, cancellationToken);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing URL: {0}", queueItem.Url);
            }
            finally
            {
                _crawlSemaphore.Release();
                _logger.LogInformation("Finished processing URL: {0}", queueItem.Url);
            }
        }

        private async Task<CrawlDto?> CrawlInternalUrl(string url, Uri baseUri)
        {
            _logger.LogInformation("Starting internal crawl: {0}", url);
            if (!_visitedInternalUrls.Contains(url) && !IsDisallowed(url))
            {
                _visitedInternalUrls.Add(url);
                _logger.LogInformation("Added {0} to visited URLs", url);

                var matchingUmbracoNode = _umbracoContent.FirstOrDefault(x => x.Value == url.EnsureEndsWith('/'));
                var pageAnalysis = await _pageScanningService.GetPageAnalysis(url, baseUri, matchingUmbracoNode.Key);
                if (pageAnalysis == null)
                {
                    _logger.LogWarning("Failed to get page data for URL: {0}", url);
                    return null;
                }

                if (pageAnalysis.SeoData != null)
                {
                    _seoDtos.Add(new SeoSchema(pageAnalysis.SeoData));
                }

                if (pageAnalysis.ContentAnalysis != null)
                {
                    _contentAnalysisDtos.Add(new ContentAnalysisSchema(pageAnalysis.ContentAnalysis));
                }

                if (pageAnalysis.PerformanceData != null)
                {
                    _performanceDtos.Add(new PerformanceSchema(pageAnalysis.PerformanceData));
                }

                if (pageAnalysis.AccessibilityData != null)
                {
                    _accessibilityDtos.Add(new AccessibilitySchema(pageAnalysis.AccessibilityData));
                }

                if (pageAnalysis.TechnicalSeoData != null)
                {
                    _technicalSeoDtos.Add(new TechnicalSeoSchema(pageAnalysis.TechnicalSeoData));
                }

                if (pageAnalysis.SocialMediaData != null)
                {
                    _socialMediaDtos.Add(new SocialMediaSchema(pageAnalysis.SocialMediaData));
                }

                if (pageAnalysis.ContentQualityData != null)
                {
                    _contentQualityDtos.Add(new ContentQualitySchema(pageAnalysis.ContentQualityData));
                }

                _logger.LogInformation("Found {0} links and {1} resources on page {2}",
                    pageAnalysis.Links.Count(), pageAnalysis.Resources.Count(), url);

                foreach (var link in pageAnalysis.Links.Where(x => !_linkedPages.Contains(x)))
                {
                    if (Uri.TryCreate(_baseUri, link, out var absoluteUri))
                    {
                        var absoluteUrl = absoluteUri.AbsoluteUri;
                        _logger.LogInformation("Processing discovered link: {0} from page {1}", absoluteUrl, url);

                        if (!_linkedPages.Contains(absoluteUrl))
                        {
                            _linkedPages.Add(absoluteUrl);
                            _logger.LogInformation("Added {0} to linked pages", absoluteUrl);
                            bool isExternal = !absoluteUrl.StartsWith(baseUri.AbsoluteUri);

                            if (!isExternal)
                            {
                                if (!_visitedInternalUrls.Contains(absoluteUrl) && !IsDisallowed(absoluteUrl))
                                {
                                    _logger.LogInformation("Enqueueing new internal URL: {0}", absoluteUrl);
                                    EnqueueUrl(new UrlQueueItem
                                    {
                                        Url = absoluteUrl,
                                        IsExternal = false,
                                        IsAsset = false,
                                        SourceUrl = url,
                                        NodeKey = matchingUmbracoNode.Key
                                    });
                                }
                                else
                                {
                                    _logger.LogInformation("Skipping already visited or disallowed URL: {0}", absoluteUrl);
                                }
                            }
                            else
                            {
                                _logger.LogInformation("Enqueueing new external URL: {0}", link);
                                EnqueueUrl(new UrlQueueItem
                                {
                                    Url = link,
                                    IsExternal = true,
                                    IsAsset = false,
                                    SourceUrl = url,
                                    NodeKey = matchingUmbracoNode.Key
                                });
                            }
                        }
                    }
                }

                foreach (var resource in pageAnalysis.Resources)
                {
                    if (Uri.TryCreate(_baseUri, resource.Url, out var absoluteUri))
                    {
                        var absoluteUrl = absoluteUri.AbsoluteUri;

                        if (!resource.IsExternal && !_visitedInternalUrls.Contains(absoluteUrl) && !_internalAssetUrls.Contains(absoluteUrl))
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
                        else if (resource.IsExternal)
                        {
                            EnqueueUrl(new UrlQueueItem
                            {
                                Url = absoluteUrl,
                                IsExternal = true,
                                IsAsset = true,
                                SourceUrl = url,
                                NodeKey = matchingUmbracoNode.Key
                            });
                        }
                    }
                }

                _internalDtos.Add(new PageSchema(pageAnalysis.PageData, 0));

                foreach (var image in pageAnalysis.Images)
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
            if (item.IsAsset)
            {
                var uri = new Uri(item.Url, UriKind.RelativeOrAbsolute);
                if (uri.IsAbsoluteUri)
                {
                    var uriBuilder = new UriBuilder(uri)
                    {
                        Query = string.Empty
                    };
                    item.Url = uriBuilder.Uri.ToString();
                }
                else
                {
                    int queryIndex = item.Url.IndexOf('?');
                    if (queryIndex >= 0)
                    {
                        item.Url = item.Url.Substring(0, queryIndex);
                    }
                }
            }

            var fragmentIndex = item.Url.IndexOf('#');
            if (fragmentIndex >= 0)
            {
                item.Url = item.Url.Substring(0, fragmentIndex);
            }

            _urlQueue.Enqueue(item);
            _logger.LogInformation("Enqueued new URL for crawling: {0} (IsExternal: {1}, IsAsset: {2}, Source: {3})",
                item.Url, item.IsExternal, item.IsAsset, item.SourceUrl ?? "Initial");
        }

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

                foreach (var seoData in _seoDtos)
                {
                    seoData.RunId = runId;
                    await scope.Database.InsertAsync(seoData);
                }

                foreach (var contentAnalysis in _contentAnalysisDtos)
                {
                    contentAnalysis.RunId = runId;
                    await scope.Database.InsertAsync(contentAnalysis);
                }

                foreach (var performanceData in _performanceDtos)
                {
                    performanceData.RunId = runId;
                    await scope.Database.InsertAsync(performanceData);
                }

                foreach (var accessibilityData in _accessibilityDtos)
                {
                    accessibilityData.RunId = runId;
                    await scope.Database.InsertAsync(accessibilityData);
                }

                foreach (var technicalSeoData in _technicalSeoDtos)
                {
                    technicalSeoData.RunId = runId;
                    await scope.Database.InsertAsync(technicalSeoData);
                }

                foreach (var socialMediaData in _socialMediaDtos)
                {
                    socialMediaData.RunId = runId;
                    await scope.Database.InsertAsync(socialMediaData);
                }

                foreach (var contentQualityData in _contentQualityDtos)
                {
                    contentQualityData.RunId = runId;
                    await scope.Database.InsertAsync(contentQualityData);
                }

                foreach (var page in _internalDtos)
                {
                    page.RunId = runId;
                    page.IsAsset = _internalAssetUrls.Contains(page.Url);
                    //page.IsOrphaned = _orphanedPages.Contains(page.Url);
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

                var query = searcher.CreateQuery("content").NativeQuery("+__IndexType:content");
                var results = query.Execute();

                foreach (var result in results)
                {
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

        private bool IsDisallowed(string url) =>
            _robotsDisallowedPaths.Any(disallowed => url.StartsWith(disallowed, StringComparison.OrdinalIgnoreCase));
    }
}
