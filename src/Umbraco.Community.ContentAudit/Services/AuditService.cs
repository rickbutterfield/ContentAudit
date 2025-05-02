using Examine;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Org.BouncyCastle.Asn1;
using Polly.Caching;
using System.Collections.Concurrent;
using System.Runtime.CompilerServices;
using System.Threading.Channels;
using System.Threading.Tasks.Dataflow;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Infrastructure.Examine;
using Umbraco.Cms.Infrastructure.Scoping;
using Umbraco.Community.ContentAudit.Configuration;
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
        private string _baseUrl;
        private Uri _baseUri;

        private ConcurrentQueue<UrlQueueItem> _urlQueue = new ConcurrentQueue<UrlQueueItem>();

        private HashSet<string> _visitedUrls = new HashSet<string>();
        private HashSet<string> _robotsDisallowedPaths = new HashSet<string>();
        private HashSet<CrawlDto> _crawlResults = new HashSet<CrawlDto>();

        private HashSet<KeyValuePair<Guid, string>> _umbracoContent = new HashSet<KeyValuePair<Guid, string>>();

        private HashSet<PageDto> _pageDtos = new HashSet<PageDto>();
        private HashSet<ImageDto> _imageDtos = new HashSet<ImageDto>();
        private HashSet<LinkDto> _linkDtos = new HashSet<LinkDto>();
        private HashSet<ResourceDto> _resourceDtos = new HashSet<ResourceDto>();
        private HashSet<SeoDto> _seoDtos = new HashSet<SeoDto>();
        private HashSet<ContentAnalysisDto> _contentAnalysisDtos = new HashSet<ContentAnalysisDto>();
        private HashSet<PerformanceDto> _performanceDtos = new HashSet<PerformanceDto>();
        private HashSet<AccessibilityDto> _accessibilityDtos = new HashSet<AccessibilityDto>();
        private HashSet<TechnicalSeoDto> _technicalSeoDtos = new HashSet<TechnicalSeoDto>();
        private HashSet<SocialMediaDto> _socialMediaDtos = new HashSet<SocialMediaDto>();
        private HashSet<ContentQualityDto> _contentQualityDtos = new HashSet<ContentQualityDto>();

        private readonly IScopeProvider _scopeProvider;
        private readonly IExamineManager _examineManager;
        private readonly IPublishedUrlProvider _urlProvider;
        private readonly ISitemapService _sitemapService;
        private readonly IRobotsService _robotsService;
        private readonly ICrawlService _crawlService;
        private readonly ILogger<AuditService> _logger;
        private readonly IAppPolicyCache _runtimeCache;
        private readonly GlobalSettings _globalSettings;
        private readonly WebRoutingSettings _webRoutingSettings;

        private readonly Channel<CrawlDto> _crawlResultsChannel;
        private readonly SemaphoreSlim _crawlSemaphore;
        private volatile bool _isDiscoveryComplete;

        public ContentAuditSettings _contentAuditSettings { get; private set; }
        public RequestHandlerSettings _requestHandlerSettings { get; private set; }

        public AuditService(
            IOptionsMonitor<ContentAuditSettings> contentAuditSettings,
            IOptionsMonitor<RequestHandlerSettings> requestHandlerSettings,
            IOptionsMonitor<GlobalSettings> globalSettings,
            IOptionsMonitor<WebRoutingSettings> webRoutingSettings,
            IScopeProvider scopeProvider,
            IExamineManager examineManager,
            IPublishedUrlProvider urlProvider,
            ISitemapService sitemapService,
            IRobotsService robotsService,
            ICrawlService pageScanningService,
            ILogger<AuditService> logger,
            HttpClient httpClient,
            AppCaches appCaches)
        {
            _scopeProvider = scopeProvider;
            _examineManager = examineManager;
            _urlProvider = urlProvider;
            _sitemapService = sitemapService;
            _robotsService = robotsService;
            _crawlService = pageScanningService;
            _logger = logger;
            _runtimeCache = appCaches.RuntimeCache;
            _globalSettings = globalSettings.CurrentValue;
            _webRoutingSettings = webRoutingSettings.CurrentValue;

            _contentAuditSettings = contentAuditSettings.CurrentValue;
            _requestHandlerSettings = requestHandlerSettings.CurrentValue;

            _crawlResultsChannel = Channel.CreateUnbounded<CrawlDto>();
            _crawlSemaphore = new SemaphoreSlim(_contentAuditSettings.MaxConcurrentCrawls);
        }

        public async IAsyncEnumerable<CrawlDto> StartCrawl(string baseUrl, [EnumeratorCancellation] CancellationToken cancellationToken)
        {
            _baseUrl = !string.IsNullOrEmpty(_contentAuditSettings.BaseUrl)
                ? _contentAuditSettings.BaseUrl
                : _requestHandlerSettings.AddTrailingSlash ? baseUrl.EnsureEndsWith('/') : baseUrl;

            var umbracoApplicationUrl = _webRoutingSettings.UmbracoApplicationUrl;
            
            if (string.IsNullOrEmpty(_baseUrl))
            {
                throw new ArgumentException("Base URL must be provided either through configuration or as a parameter", nameof(baseUrl));
            }

            _baseUri = new Uri(_baseUrl);
            _isDiscoveryComplete = false;

            await GetSitemap();
            await GetRobots();

            LoadUmbracoContentUrls();
            QueueUmbracoContent();

            if (_urlQueue.IsEmpty)
            {
                _urlQueue.Enqueue(new UrlQueueItem()
                {
                    Url = _baseUrl,
                    IsExternal = false,
                    IsAsset = false,
                    Unique = Guid.Empty
                });
            }

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
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error in URL processing task");
                    throw;
                }
                finally
                {
                    processUrlBlock.Complete();
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
                    _crawlResultsChannel.Writer.Complete(ex);
                    throw;
                }
            }, cancellationToken);

            await foreach (var result in _crawlResultsChannel.Reader.ReadAllAsync(cancellationToken))
                yield return result;

            await completionTask;
        }

        private async Task ProcessUrlAsync(UrlQueueItem queueItem, Uri baseUri, CancellationToken cancellationToken)
        {
            string url = queueItem.Url;
            bool isExternal = queueItem.IsExternal;
            bool isAsset = queueItem.IsAsset;

            try
            {
                await _crawlSemaphore.WaitAsync(cancellationToken);

                _logger.LogInformation("Started processing URL: {0}", url);

                CrawlDto crawlResult = new()
                {
                    Url = url,
                    External = isExternal,
                    Asset = isAsset,
                    Crawled = false,
                    Blocked = false,
                    Unique = queueItem.Unique
                };

                bool crawlAlreadyReported = _crawlResults.Any(x => x.Url == url && x.External == isExternal && x.Asset == isAsset);
                if (!crawlAlreadyReported)
                {
                    if (!IsDisallowed(url))
                    {
                        if (!isAsset && !isExternal && !_visitedUrls.Contains(url))
                        {
                            _visitedUrls.Add(url);
                            crawlResult = await CrawlInternalUrl(url, baseUri);
                        }

                        crawlResult.Crawled = true;
                    }
                    else
                    {
                        crawlResult.Blocked = true;
                        crawlResult.Crawled = true;
                    }
                    _logger.LogInformation("Writing crawl result for URL: {0}", url);
                    _crawlResults.Add(crawlResult);
                    await _crawlResultsChannel.Writer.WriteAsync(crawlResult, cancellationToken);
                }
                else
                {
                    _logger.LogInformation("Skipping writing crawl for URL: {0}", url);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing URL: {0}", url);
            }
            finally
            {
                _crawlSemaphore.Release();
                _logger.LogInformation("Finished processing URL: {0}", url);
            }
        }

        private async Task<CrawlDto> CrawlInternalUrl(string url, Uri baseUri)
        {
            _logger.LogInformation("Starting internal crawl: {0}", url);

            var matchingUmbracoNode = _umbracoContent.FirstOrDefault(x => x.Value == (_requestHandlerSettings.AddTrailingSlash ? url.EnsureEndsWith('/') : url));
            var pageAnalysis = await _crawlService.GetPageAnalysis(url, baseUri, matchingUmbracoNode.Key);
            if (pageAnalysis == null)
            {
                _logger.LogWarning("Failed to get page data for URL: {0}", url);
                return new() { Url = url, Crawled = false };
            }

            if (pageAnalysis.PageData != null)
            {
                _pageDtos.Add(pageAnalysis.PageData);

                if (pageAnalysis.PageData.Redirect && !string.IsNullOrEmpty(pageAnalysis.PageData.RedirectUrl))
                {
                    var urlQueueItem = new UrlQueueItem()
                    {
                        Url = pageAnalysis.PageData.RedirectUrl,
                        IsExternal = false,
                        IsAsset = false,
                        SourceUrl = url,
                        Unique = matchingUmbracoNode.Key
                    };

                    EnqueueUrl(urlQueueItem);

                    return new() { Url = url, Crawled = false };
                }
            }


            if (pageAnalysis.SeoData != null)
            {
                _seoDtos.Add(pageAnalysis.SeoData);
            }

            if (pageAnalysis.ContentAnalysis != null)
            {
                _contentAnalysisDtos.Add(pageAnalysis.ContentAnalysis);
            }

            if (pageAnalysis.PerformanceData != null)
            {
                _performanceDtos.Add(pageAnalysis.PerformanceData);
            }

            if (pageAnalysis.AccessibilityData != null)
            {
                _accessibilityDtos.Add(pageAnalysis.AccessibilityData);
            }

            if (pageAnalysis.TechnicalSeoData != null)
            {
                _technicalSeoDtos.Add(pageAnalysis.TechnicalSeoData);
            }

            if (pageAnalysis.SocialMediaData != null)
            {
                _socialMediaDtos.Add(pageAnalysis.SocialMediaData);
            }

            if (pageAnalysis.ContentQualityData != null)
            {
                _contentQualityDtos.Add(pageAnalysis.ContentQualityData);
            }

            _logger.LogInformation("Found {0} links and {1} resources on page {2}",
                pageAnalysis.Links.Count(), pageAnalysis.Resources.Count(), url);

            if (!pageAnalysis.SeoData.HasNoFollow)
            {
                foreach (var link in pageAnalysis.Links)
                {
                    if (Uri.TryCreate(_baseUri, link.Url, out var absoluteUri))
                    {
                        var absoluteUrl = absoluteUri.AbsoluteUri;
                        bool isExternal = absoluteUri.Host != baseUri.Host;

                        _logger.LogInformation("Processing discovered link: {0} from page {1}", absoluteUrl, url);

                        var existingLinkDto = _linkDtos.FirstOrDefault(x => x.Url == absoluteUrl);
                        if (existingLinkDto == null)
                        {
                            var headResponse = await _crawlService.GetHeadResponse(absoluteUrl);

                            if (headResponse != null)
                            {
                                link.StatusCode = headResponse.StatusCode;
                                link.ContentType = headResponse.ContentType;
                            }
                        }
                        else
                        {
                            link.StatusCode = existingLinkDto.StatusCode;
                            link.ContentType = existingLinkDto.ContentType;
                        }

                        link.Url = absoluteUrl;
                        _linkDtos.Add(link);

                        var urlQueueItem = new UrlQueueItem()
                        {
                            Url = absoluteUrl,
                            IsExternal = isExternal,
                            IsAsset = false,
                            SourceUrl = url,
                            Unique = matchingUmbracoNode.Key
                        };

                        EnqueueUrl(urlQueueItem);
                    }
                }
            }

            foreach (var resource in pageAnalysis.Resources)
            {
                if (Uri.TryCreate(_baseUri, resource.Url, out var absoluteUri))
                {
                    var absoluteUrl = absoluteUri.AbsoluteUri;
                    bool isExternal = absoluteUri.Host != baseUri.Host;

                    _logger.LogInformation("Processing discovered resource: {0} from page {1}", absoluteUrl, url);

                    var existingResourceDto = _resourceDtos.FirstOrDefault(x => x.Url == absoluteUrl);
                    if (existingResourceDto == null)
                    {
                        var headResponse = await _crawlService.GetHeadResponse(absoluteUrl);

                        if (headResponse != null)
                        {
                            resource.StatusCode = headResponse.StatusCode;
                            resource.ContentType = headResponse.ContentType;
                            resource.Size = headResponse.ContentLength;
                        }
                    }
                    else
                    {
                        resource.StatusCode = existingResourceDto.StatusCode;
                        resource.ContentType = existingResourceDto.ContentType;
                        resource.Size = existingResourceDto.Size;
                    }

                    _resourceDtos.Add(resource);

                    var urlQueueItem = new UrlQueueItem()
                    {
                        Url = absoluteUrl,
                        IsExternal = isExternal,
                        IsAsset = true,
                        SourceUrl = url,
                        Unique = matchingUmbracoNode.Key
                    };

                    EnqueueUrl(urlQueueItem);
                }
            }

            _logger.LogInformation("Found {0} images on page {1}", pageAnalysis.Images.Count(), url);
            foreach (var image in pageAnalysis.Images)
            {
                _imageDtos.Add(image);
            }

            return new CrawlDto
            {
                Url = url,
                Crawled = true,
                Asset = false,
                External = false,
                Blocked = false,
                Unique = matchingUmbracoNode.Key
            };
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

            var pagesCrawledCount = _pageDtos.Count();

            var internalLinks = _linkDtos.Where(x => !x.IsExternal).DistinctBy(x => x.Url);
            var externalLinks = _linkDtos.Where(x => x.IsExternal).DistinctBy(x => x.Url);
            var externalLinkCount = externalLinks.Count();

            var assetUrls = _resourceDtos.DistinctBy(x => x.Url);
            var assetUrlsCount = assetUrls.Count();

            var disallowedUrlsCount = _robotsDisallowedPaths.Count;

            var totalUrls = pagesCrawledCount + externalLinkCount + assetUrlsCount + disallowedUrlsCount;

            var overview = new OverviewSchema
            {
                RunDate = DateTime.Now,
                Total = totalUrls,
                TotalInternal = pagesCrawledCount,
                TotalExternal = externalLinkCount,
                TotalAssets = assetUrlsCount,
                TotalBlocked = disallowedUrlsCount
            };

            var runData = await scope.Database.InsertAsync(overview);

            if (int.TryParse(runData.ToString(), out int runId))
            {
                foreach (var seoData in _seoDtos)
                {
                    seoData.RunId = runId;

                    seoData.IsOrphaned = internalLinks.Any(x => seoData.Url?.Contains(x.Url) == true) == false;
                    await scope.Database.InsertAsync(new SeoSchema(seoData));
                }

                foreach (var contentAnalysisData in _contentAnalysisDtos)
                {
                    contentAnalysisData.RunId = runId;
                    await scope.Database.InsertAsync(new ContentAnalysisSchema(contentAnalysisData));
                }

                foreach (var performanceData in _performanceDtos)
                {
                    performanceData.RunId = runId;
                    await scope.Database.InsertAsync(new PerformanceSchema(performanceData));
                }

                foreach (var accessibilityData in _accessibilityDtos)
                {
                    accessibilityData.RunId = runId;
                    await scope.Database.InsertAsync(new AccessibilitySchema(accessibilityData));
                }

                foreach (var technicalSeoData in _technicalSeoDtos)
                {
                    technicalSeoData.RunId = runId;
                    await scope.Database.InsertAsync(new TechnicalSeoSchema(technicalSeoData));
                }

                foreach (var socialMediaData in _socialMediaDtos)
                {
                    socialMediaData.RunId = runId;
                    await scope.Database.InsertAsync(new SocialMediaSchema(socialMediaData));
                }

                foreach (var contentQualityData in _contentQualityDtos)
                {
                    contentQualityData.RunId = runId;
                    await scope.Database.InsertAsync(new ContentQualitySchema(contentQualityData));
                }

                foreach (var page in _pageDtos)
                {
                    await scope.Database.InsertAsync(new PageSchema(page, runId));
                }

                foreach (var image in _imageDtos)
                {
                    image.RunId = runId;
                    await scope.Database.InsertAsync(new ImageSchema(image));
                }

                foreach (var resource in _resourceDtos)
                {
                    resource.RunId = runId;
                    await scope.Database.InsertAsync(new ResourceSchema(resource));
                }

                foreach (var link in _linkDtos)
                {
                    link.RunId = runId;
                    await scope.Database.InsertAsync(new LinkSchema(link));
                }
            }

            scope.Complete();

            _runtimeCache.Clear(Constants.Cache.Key);
        }

        private async Task GetSitemap()
        {
            _logger.LogInformation("Should we attempt to use sitemap.xml? {0}", _contentAuditSettings.UseSitemapXml);
            if (_contentAuditSettings.UseSitemapXml)
            {
                var sitemapUrls = await _sitemapService.GetSitemapUrlAsync(_baseUrl);
                sitemapUrls.ForEach(x =>
                {
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

                        if (!_visitedUrls.Contains(absoluteUrl) && !IsDisallowed(absoluteUrl))
                        { 
                            EnqueueUrl(new UrlQueueItem
                            {
                                Url = absoluteUrl,
                                IsExternal = false,
                                IsAsset = false,
                                Unique = key
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
