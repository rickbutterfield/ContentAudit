using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Collections.Concurrent;
using System.Reflection;
using System.Text.Json;
using System.Threading.Tasks.Dataflow;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Community.ContentAudit.Composing;
using Umbraco.Community.ContentAudit.Configuration;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Extensions;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;
using Umbraco.Community.ContentAudit.Schemas;
using Umbraco.Extensions;

namespace Umbraco.Community.ContentAudit.Services
{
    /// <inheritdoc />
    public class AuditService : IAuditService
    {
        private const int EmptyQueueCheckDelayMs = 5000;
        private const int QueuePollingDelayMs = 100;

        private string? _baseUrl;
        private Uri? _baseUri;

        private readonly ConcurrentQueue<UrlQueueItem> _urlQueue = new();

        private readonly ConcurrentDictionary<string, byte> _visitedUrls = new();
        private readonly ConcurrentDictionary<string, byte> _robotsDisallowedPaths = new();
        private readonly ConcurrentDictionary<string, CrawlDto> _crawlResults = new();
        private readonly ConcurrentDictionary<string, HeadResponseDto> _headResponseCache = new();
        private readonly ConcurrentDictionary<string, byte> _enqueuedUrls = new();

        private readonly Dictionary<string, Guid> _umbracoContent = new(StringComparer.OrdinalIgnoreCase);

        private readonly ConcurrentBag<PageDto> _pageDtos = new();
        private readonly ConcurrentBag<ImageDto> _imageDtos = new();
        private readonly ConcurrentBag<LinkDto> _linkDtos = new();
        private readonly ConcurrentBag<ResourceDto> _resourceDtos = new();
        private readonly ConcurrentBag<SeoDto> _seoDtos = new();
        private readonly ConcurrentBag<ContentAnalysisDto> _contentAnalysisDtos = new();
        private readonly ConcurrentBag<PerformanceDto> _performanceDtos = new();
        private readonly ConcurrentBag<AccessibilityDto> _accessibilityDtos = new();
        private readonly ConcurrentBag<TechnicalSeoDto> _technicalSeoDtos = new();
        private readonly ConcurrentBag<SocialMediaDto> _socialMediaDtos = new();
        private readonly ConcurrentBag<ContentQualityDto> _contentQualityDtos = new();

        private readonly IRobotsService _robotsService;
        private readonly ICrawlService _crawlService;
        private readonly ICrawlResultPersistence _persistence;
        private readonly IAuditRepository _auditRepository;
        private readonly IDomainRateLimiter _domainRateLimiter;
        private readonly ICrawlStateManager _crawlStateManager;
        private readonly IEnrichmentService _enrichmentService;
        private readonly IEnrichmentStateManager _enrichmentStateManager;
        private readonly ILogger<AuditService> _logger;
        private readonly WebRoutingSettings _webRoutingSettings;
        private readonly AuditIssueCollection _auditIssueCollection;
        private readonly IEnumerable<IUrlDiscoveryStrategy> _urlDiscoveryStrategies;

        private int _isDiscoveryComplete;
        private int _activeWorkerCount;

        private Guid _currentAuditKey;
        private volatile int _pagesSinceLastFlush;
        private const int FlushThreshold = 50;

        private Dictionary<string, PageFingerprintDto> _previousFingerprints = new(StringComparer.OrdinalIgnoreCase);
        private readonly ConcurrentBag<PageFingerprintDto> _newFingerprints = new();
        private Guid? _previousAuditKey;

        // Circuit breaker for repeated failures
        private readonly ConcurrentDictionary<string, int> _pathFailureCounts = new();
        private readonly ConcurrentDictionary<string, byte> _trippedPaths = new();
        private const int CircuitBreakerThreshold = 5;

        // Crawl delay (from config or robots.txt)
        private int _effectiveCrawlDelayMs;

        /// <summary>
        /// Gets the content audit settings
        /// </summary>
        public ContentAuditSettings _contentAuditSettings { get; private set; }

        /// <summary>
        /// Gets the request handler settings
        /// </summary>
        public RequestHandlerSettings _requestHandlerSettings { get; private set; }

        /// <summary>
        /// Initializes a new instance of the AuditService
        /// </summary>
        public AuditService(
            IOptionsMonitor<ContentAuditSettings> contentAuditSettings,
            IOptionsMonitor<RequestHandlerSettings> requestHandlerSettings,
            IOptionsMonitor<WebRoutingSettings> webRoutingSettings,
            IRobotsService robotsService,
            ICrawlService pageScanningService,
            ICrawlResultPersistence persistence,
            IAuditRepository auditRepository,
            IDomainRateLimiter domainRateLimiter,
            ICrawlStateManager crawlStateManager,
            IEnrichmentService enrichmentService,
            IEnrichmentStateManager enrichmentStateManager,
            AuditIssueCollection auditIssueCollection,
            ILogger<AuditService> logger,
            IEnumerable<IUrlDiscoveryStrategy> urlDiscoveryStrategies)
        {
            _robotsService = robotsService;
            _crawlService = pageScanningService;
            _persistence = persistence;
            _auditRepository = auditRepository;
            _domainRateLimiter = domainRateLimiter;
            _crawlStateManager = crawlStateManager;
            _enrichmentService = enrichmentService;
            _enrichmentStateManager = enrichmentStateManager;
            _auditIssueCollection = auditIssueCollection;
            _logger = logger;
            _webRoutingSettings = webRoutingSettings.CurrentValue;
            _urlDiscoveryStrategies = urlDiscoveryStrategies;

            _contentAuditSettings = contentAuditSettings.CurrentValue;
            _requestHandlerSettings = requestHandlerSettings.CurrentValue;
        }

        /// <inheritdoc />
        public async Task StartCrawl(string baseUrl, CancellationToken cancellationToken)
        {
            _baseUrl = !string.IsNullOrEmpty(_contentAuditSettings.BaseUrl)
                ? _contentAuditSettings.BaseUrl
                : _requestHandlerSettings.AddTrailingSlash ? baseUrl.EnsureEndsWith('/') : baseUrl;

            var umbracoApplicationUrl = _webRoutingSettings.UmbracoApplicationUrl;

            if (string.IsNullOrEmpty(_baseUrl))
            {
                throw new ArgumentException("Base URL must be provided either through configuration or as a parameter", nameof(baseUrl));
            }

            using var timeoutCts = _contentAuditSettings.MaxCrawlDurationMinutes > 0
                ? new CancellationTokenSource(TimeSpan.FromMinutes(_contentAuditSettings.MaxCrawlDurationMinutes))
                : new CancellationTokenSource();
            using var linkedCts = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken, timeoutCts.Token);
            var linkedToken = linkedCts.Token;

            if (_contentAuditSettings.MaxCrawlDurationMinutes > 0)
            {
                _logger.LogInformation("Crawl timeout set to {0} minutes", _contentAuditSettings.MaxCrawlDurationMinutes);
            }

            _baseUri = new Uri(_baseUrl);
            Interlocked.Exchange(ref _isDiscoveryComplete, 0);
            _pagesSinceLastFlush = 0;

            var existingAuditKey = await _persistence.GetIncompleteAuditAsync(_baseUrl, linkedToken);
            if (existingAuditKey.HasValue)
            {
                _currentAuditKey = existingAuditKey.Value;
                _crawlStateManager.SetPhase("Resuming crawl");
                _logger.LogInformation("Resuming incomplete audit {AuditKey}", _currentAuditKey);

                var state = await _persistence.LoadCrawlStateAsync(_currentAuditKey, linkedToken);
                if (state != null)
                {
                    foreach (var url in state.VisitedUrls)
                        _visitedUrls.TryAdd(url, 0);

                    foreach (var item in state.PendingUrls)
                    {
                        _urlQueue.Enqueue(item);
                        _enqueuedUrls.TryAdd($"{item.Url}|{item.IsExternal}|{item.IsAsset}", 0);
                    }

                    foreach (var path in state.DisallowedPaths)
                        _robotsDisallowedPaths.TryAdd(path, 0);

                    _logger.LogDebug("Restored state: {VisitedCount} visited, {PendingCount} pending",
                        state.VisitedUrls.Count(), state.PendingUrls.Count());
                }

                // Re-discover URLs from sitemap/content index and re-parse robots.txt
                // Safe: _visitedUrls prevents re-crawling of already-processed pages
                await DiscoverInitialUrlsAsync(linkedToken);
                _crawlStateManager.SetPhase("Parsing robots.txt");
                await GetRobots();

                // Re-enqueue link targets from already-persisted data to recover
                // URLs discovered between the last checkpoint and interruption
                await ReEnqueuePersistedLinksAsync();
            }
            else
            {
                _currentAuditKey = await _persistence.CreateAuditAsync(_baseUrl, linkedToken);
                _logger.LogInformation("Created new audit {AuditKey}", _currentAuditKey);

                await DiscoverInitialUrlsAsync(linkedToken);
                _crawlStateManager.SetPhase("Parsing robots.txt");
                await GetRobots();
            }

            if (_contentAuditSettings.UseIncrementalCrawl)
            {
                _previousFingerprints = await _persistence.GetPageFingerprintsAsync(_baseUrl, linkedToken);
                _previousAuditKey = await _auditRepository.GetLatestCompletedAuditKeyExcluding(_currentAuditKey);
                _logger.LogDebug("Loaded {Count} fingerprints for incremental crawl (previous audit: {PreviousKey})",
                    _previousFingerprints.Count, _previousAuditKey);
            }

            if (_urlQueue.IsEmpty)
            {
                _urlQueue.Enqueue(new UrlQueueItem()
                {
                    Url = _baseUrl,
                    IsExternal = false,
                    IsAsset = false,
                    Unique = Guid.Empty,
                    Depth = 0 // Starting URL is depth 0
                });
            }

            _crawlStateManager.SetPhase("Crawling pages");

            var processUrlBlock = new ActionBlock<UrlQueueItem>(
                async queueItem => await ProcessUrlAsync(queueItem, _baseUri, linkedToken),
                new ExecutionDataflowBlockOptions
                {
                    MaxDegreeOfParallelism = _contentAuditSettings.MaxConcurrentCrawls,
                    CancellationToken = linkedToken,
                    BoundedCapacity = 100
                });

            // Suppress ExecutionContext flow to prevent Umbraco's ambient scope (AsyncLocal)
            // from leaking into Task.Run threads, which causes ObjectDisposedException
            // when the parent scope is disposed before the child scope.
            Task urlProcessingTask;
            var suppressedFlow = ExecutionContext.SuppressFlow();
            try
            {
                urlProcessingTask = Task.Run(async () =>
                {
                    try
                    {
                        _logger.LogInformation("Starting URL processing with {0} initial URLs in queue", _urlQueue.Count);

                        while (_urlQueue.TryDequeue(out UrlQueueItem? queueItem))
                        {
                            _logger.LogDebug("Processing initial URL from queue: {0}", queueItem.Url);
                            await processUrlBlock.SendAsync(queueItem, linkedToken);
                        }

                        int emptyChecks = 0;
                        const int maxEmptyChecks = 3;

                        while (Interlocked.CompareExchange(ref _isDiscoveryComplete, 0, 0) == 0 || !_urlQueue.IsEmpty)
                        {
                            while (_urlQueue.TryDequeue(out UrlQueueItem? queueItem))
                            {
                                _logger.LogDebug("Processing newly discovered URL: {0}", queueItem.Url);
                                await processUrlBlock.SendAsync(queueItem, linkedToken);
                                emptyChecks = 0;
                            }

                            if (_urlQueue.IsEmpty && processUrlBlock.InputCount == 0
                                && Volatile.Read(ref _activeWorkerCount) == 0)
                            {
                                emptyChecks++;
                                _logger.LogDebug("Empty state check {0}/{1}", emptyChecks, maxEmptyChecks);

                                if (emptyChecks >= maxEmptyChecks)
                                {
                                    _logger.LogInformation("No new URLs discovered after {0} checks, completing crawl", maxEmptyChecks);
                                    Interlocked.Exchange(ref _isDiscoveryComplete, 1);
                                    break;
                                }

                                await Task.Delay(EmptyQueueCheckDelayMs, linkedToken);
                            }
                            else
                            {
                                emptyChecks = 0;
                                await Task.Delay(QueuePollingDelayMs, linkedToken);
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
                }, linkedToken);
            }
            finally
            {
                suppressedFlow.Dispose();
            }

            try
            {
                await urlProcessingTask;
                await processUrlBlock.Completion;

                _crawlStateManager.SetPhase("Checking external links");
                await ProcessDeferredHeadRequestsAsync(linkedToken);

                _logger.LogInformation("All processing complete, saving crawl results");
                _crawlStateManager.SetPhase("Saving results");
                await SaveCrawlResults();

                _crawlStateManager.CompleteCrawl();
                await RunAutoEnrichIfConfiguredAsync(cancellationToken);
            }
            catch (OperationCanceledException) when (timeoutCts.IsCancellationRequested)
            {
                _logger.LogWarning("Crawl timed out after {0} minutes", _contentAuditSettings.MaxCrawlDurationMinutes);
                _crawlStateManager.SetPhase("Saving results");
                await SaveCrawlResults();
                _crawlStateManager.CompleteCrawl();
                await RunAutoEnrichIfConfiguredAsync(cancellationToken);
            }
            catch (OperationCanceledException)
            {
                _logger.LogInformation("Crawl was cancelled");
                _crawlStateManager.SetPhase("Saving results");
                await SaveCrawlResults();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during completion");
                await _persistence.FailAuditAsync(_currentAuditKey);
                _crawlStateManager.FailCrawl();
                throw;
            }
        }

        private async Task ProcessUrlAsync(UrlQueueItem queueItem, Uri baseUri, CancellationToken cancellationToken)
        {
            Interlocked.Increment(ref _activeWorkerCount);
            string url = queueItem.Url;

            try
            {
                // Apply crawl delay if configured
                if (_effectiveCrawlDelayMs > 0)
                {
                    await Task.Delay(_effectiveCrawlDelayMs, cancellationToken);
                }

                _logger.LogDebug("Started processing URL: {0}", url);

                var crawlResultKey = $"{url}|False|False";

                CrawlDto crawlResult = new()
                {
                    Url = url,
                    External = false,
                    Resource = false,
                    Image = false,
                    Crawled = false,
                    Blocked = false,
                    Unique = queueItem.Unique
                };

                if (_crawlResults.TryAdd(crawlResultKey, crawlResult))
                {
                    if (IsCircuitBroken(url))
                    {
                        crawlResult.Blocked = true;
                        crawlResult.Crawled = false;
                        _logger.LogDebug("Skipping URL due to circuit breaker: {0}", url);
                    }
                    else if (!IsDisallowed(url))
                    {
                        if (_visitedUrls.TryAdd(url, 0))
                        {
                            crawlResult = await CrawlInternalUrl(url, baseUri, queueItem.Depth, queueItem.Unique);
                            _crawlResults[crawlResultKey] = crawlResult;

                            if (crawlResult.Crawled && crawlResult.Unique != Guid.Empty)
                            {
                                RecordSuccess(url);
                            }
                            else if (!crawlResult.Crawled || crawlResult.Unique == Guid.Empty)
                            {
                                RecordFailure(url);
                            }
                        }

                        crawlResult.Crawled = true;
                    }
                    else
                    {
                        crawlResult.Blocked = true;
                        crawlResult.Crawled = true;
                    }
                    _logger.LogDebug("Writing crawl result for URL: {0}", url);
                    _crawlStateManager.AddResult(crawlResult);

                    Interlocked.Increment(ref _pagesSinceLastFlush);
                    if (_pagesSinceLastFlush >= FlushThreshold)
                    {
                        await SaveCrawlStateAsync();
                    }
                }
                else
                {
                    _logger.LogDebug("Skipping writing crawl for URL: {0}", url);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing URL: {0}", url);
                RecordFailure(url);
            }
            finally
            {
                Interlocked.Decrement(ref _activeWorkerCount);
                _logger.LogDebug("Finished processing URL: {0}", url);
            }
        }

        private async Task<CrawlDto> CrawlInternalUrl(string url, Uri baseUri, int currentDepth, Guid fallbackNodeKey = default)
        {
            _logger.LogDebug("Starting internal crawl: {0} (depth: {1})", url, currentDepth);

            var normalizedUrl = _requestHandlerSettings.AddTrailingSlash ? url.EnsureEndsWith('/') : url;
            _umbracoContent.TryGetValue(normalizedUrl, out var nodeKey);

            if (nodeKey == Guid.Empty && fallbackNodeKey != Guid.Empty)
                nodeKey = fallbackNodeKey;

            var matchingUmbracoNode = new KeyValuePair<Guid, string>(nodeKey, normalizedUrl);

            if (_contentAuditSettings.UseIncrementalCrawl && _previousAuditKey.HasValue
                && _previousFingerprints.TryGetValue(url, out var previousFingerprint))
            {
                var changeCheck = await _crawlService.CheckPageChangedAsync(url, previousFingerprint);
                if (!changeCheck.HasChanged)
                {
                    _logger.LogDebug("Page {Url} unchanged, skipping full crawl", url);

                    _newFingerprints.Add(new PageFingerprintDto
                    {
                        Url = url,
                        ContentHash = changeCheck.NewContentHash ?? previousFingerprint.ContentHash,
                        ETag = changeCheck.NewETag ?? previousFingerprint.ETag,
                        LastModified = changeCheck.NewLastModified ?? previousFingerprint.LastModified,
                        UmbracoUpdateDate = previousFingerprint.UmbracoUpdateDate
                    });

                    await CopyPageDataFromPreviousAuditAsync(url, matchingUmbracoNode.Key, baseUri);

                    return new CrawlDto
                    {
                        Url = url,
                        Crawled = true,
                        Resource = false,
                        Image = false,
                        External = false,
                        Blocked = false,
                        Unique = matchingUmbracoNode.Key,
                        Skipped = true
                    };
                }
            }

            var pageAnalysis = await _crawlService.GetPageAnalysisLightweightAsync(url, baseUri, matchingUmbracoNode.Key);
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
                        Unique = matchingUmbracoNode.Key,
                        Depth = currentDepth // Redirects keep same depth
                    };

                    EnqueueUrl(urlQueueItem);

                    return new() { Url = url, Crawled = true, Unique = matchingUmbracoNode.Key };
                }
            }


            if (pageAnalysis.SeoData != null)
            {
                _seoDtos.Add(pageAnalysis.SeoData);

                // Follow canonical URL if it's different and internal
                if (!string.IsNullOrEmpty(pageAnalysis.SeoData.CanonicalUrl) &&
                    pageAnalysis.SeoData.CanonicalUrl != url)
                {
                    if (Uri.TryCreate(_baseUri, pageAnalysis.SeoData.CanonicalUrl, out var canonicalUri))
                    {
                        var canonicalUrl = canonicalUri.AbsoluteUri;
                        bool isCanonicalExternal = canonicalUri.Host != baseUri.Host;

                        if (!isCanonicalExternal)
                        {
                            _logger.LogDebug("Following canonical URL: {Canonical} from page {Url}", canonicalUrl, url);
                            EnqueueUrl(new UrlQueueItem
                            {
                                Url = canonicalUrl,
                                IsExternal = false,
                                IsAsset = false,
                                SourceUrl = url,
                                Unique = matchingUmbracoNode.Key,
                                Depth = currentDepth // Canonical keeps same depth
                            });
                        }
                    }
                }
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

            _logger.LogDebug("Found {0} links and {1} resources on page {2}",
                pageAnalysis.Links.Count(), pageAnalysis.Resources.Count(), url);

            if (pageAnalysis.SeoData?.HasNoFollow == false)
            {
                foreach (var link in pageAnalysis.Links)
                {
                    if (Uri.TryCreate(_baseUri, link.Url, out var absoluteUri))
                    {
                        var absoluteUrl = absoluteUri.AbsoluteUri;

                        link.Url = absoluteUrl;
                        _linkDtos.Add(link);

                        if (link.IsExternal)
                        {
                            RegisterCrawlResult(absoluteUrl, isExternal: true, isResource: false, isImage: false);
                        }
                        else
                        {
                            EnqueueUrl(new UrlQueueItem
                            {
                                Url = absoluteUrl,
                                IsExternal = false,
                                IsAsset = false,
                                SourceUrl = url,
                                Unique = matchingUmbracoNode.Key,
                                Depth = currentDepth + 1
                            });
                        }
                    }
                }
            }

            var imageUrlSet = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
            foreach (var img in pageAnalysis.Images)
            {
                if (Uri.TryCreate(_baseUri, img.Url, out var imgUri))
                    imageUrlSet.Add(imgUri.AbsoluteUri);
            }

            foreach (var resource in pageAnalysis.Resources)
            {
                if (string.Equals(resource.Url, Constants.Crawl.WebVitalsScriptUrl, StringComparison.OrdinalIgnoreCase))
                    continue;

                if (Uri.TryCreate(_baseUri, resource.Url, out var absoluteUri))
                {
                    var absoluteUrl = absoluteUri.AbsoluteUri;

                    resource.Url = absoluteUrl;
                    _resourceDtos.Add(resource);

                    var isImage = imageUrlSet.Contains(absoluteUrl);
                    RegisterCrawlResult(absoluteUrl, isExternal: resource.IsExternal, isResource: !isImage, isImage: isImage);
                }
            }

            foreach (var image in pageAnalysis.Images)
            {
                if (Uri.TryCreate(_baseUri, image.Url, out var absoluteUri))
                {
                    var absoluteUrl = absoluteUri.AbsoluteUri;
                    image.Url = absoluteUrl;

                    RegisterCrawlResult(absoluteUrl, isExternal: image.IsExternal, isResource: false, isImage: true);
                }

                _imageDtos.Add(image);
            }

            if (_contentAuditSettings.UseIncrementalCrawl)
            {
                _newFingerprints.Add(new PageFingerprintDto
                {
                    Url = url,
                    ContentHash = pageAnalysis.ContentHash,
                    ETag = pageAnalysis.ETag,
                    LastModified = pageAnalysis.LastModified,
                    UmbracoUpdateDate = matchingUmbracoNode.Key != Guid.Empty ? DateTime.Now : null
                });
            }

            return new CrawlDto
            {
                Url = url,
                Crawled = true,
                Resource = false,
                Image = false,
                External = false,
                Blocked = false,
                Unique = matchingUmbracoNode.Key
            };
        }

        private void EnqueueUrl(UrlQueueItem item)
        {
            // Normalize URL for consistent comparison and deduplication
            if (item.IsAsset)
            {
                // Assets: remove query strings and normalize
                item.Url = item.Url.NormalizeUrlWithoutQuery(_requestHandlerSettings.AddTrailingSlash);
            }
            else
            {
                // Pages: normalize but preserve query strings (may be meaningful)
                item.Url = item.Url.NormalizeUrl(_requestHandlerSettings.AddTrailingSlash);
            }

            // Check URL pattern exclusions (only for internal URLs)
            if (!item.IsExternal && item.Url.ShouldExcludeUrl(
                Constants.Crawl.DefaultExcludePatterns.Concat(_contentAuditSettings.ExcludePatterns),
                _contentAuditSettings.IncludePatterns))
            {
                _logger.LogDebug("Skipping URL due to pattern exclusion: {0}", item.Url);
                return;
            }

            // Check max crawl depth (0 = unlimited)
            if (_contentAuditSettings.MaxCrawlDepth > 0 && item.Depth > _contentAuditSettings.MaxCrawlDepth)
            {
                _logger.LogDebug("Skipping URL due to depth limit ({Depth} > {MaxDepth}): {Url}",
                    item.Depth, _contentAuditSettings.MaxCrawlDepth, item.Url);
                return;
            }

            var enqueueKey = $"{item.Url}|{item.IsExternal}|{item.IsAsset}";
            if (!_enqueuedUrls.TryAdd(enqueueKey, 0))
            {
                return;
            }

            _urlQueue.Enqueue(item);
            _logger.LogDebug("Enqueued new URL for crawling: {0} (IsExternal: {1}, IsAsset: {2}, Source: {3})",
                item.Url, item.IsExternal, item.IsAsset, item.SourceUrl ?? "Initial");
        }

        private void RegisterCrawlResult(string url, bool isExternal, bool isResource, bool isImage)
        {
            if (isResource || isImage)
            {
                url = url.NormalizeUrlWithoutQuery(_requestHandlerSettings.AddTrailingSlash);
            }
            else
            {
                url = url.NormalizeUrl(_requestHandlerSettings.AddTrailingSlash);
            }

            var crawlResultKey = $"{url}|{isExternal}|{isResource || isImage}";
            if (!_enqueuedUrls.TryAdd(crawlResultKey, 0))
                return;

            if (IsCircuitBroken(url))
                return;

            var crawlResult = new CrawlDto
            {
                Url = url,
                External = isExternal,
                Resource = isResource,
                Image = isImage,
                Crawled = true,
                Blocked = false,
                Unique = Guid.Empty
            };

            if (_crawlResults.TryAdd(crawlResultKey, crawlResult))
            {
                _crawlStateManager.AddResult(crawlResult);
            }
        }

        private async Task ReEnqueuePersistedLinksAsync()
        {
            var persistedLinks = await _auditRepository.GetAllLinkDataByAuditKey(_currentAuditKey);
            var reEnqueuedCount = 0;

            foreach (var link in persistedLinks)
            {
                if (string.IsNullOrEmpty(link.Url) || _visitedUrls.ContainsKey(link.Url))
                    continue;

                if (link.IsExternal)
                {
                    RegisterCrawlResult(link.Url, isExternal: true, isResource: false, isImage: false);
                }
                else
                {
                    EnqueueUrl(new UrlQueueItem
                    {
                        Url = link.Url,
                        IsExternal = false,
                        IsAsset = false,
                        SourceUrl = link.FoundPage,
                        Depth = 0
                    });
                }
                reEnqueuedCount++;
            }

            _logger.LogInformation("Re-enqueued {Count} URLs from persisted link data", reEnqueuedCount);
        }

        private async Task SaveCrawlResults()
        {
            await FlushDataToDatabase();

            if (_contentAuditSettings.UseIncrementalCrawl && _newFingerprints.Any())
            {
                await _persistence.SavePageFingerprintsAsync(_currentAuditKey, _newFingerprints);
                _logger.LogInformation("Saved {Count} page fingerprints for incremental crawl", _newFingerprints.Count);
            }

            // Calculate totals from _crawlResults which includes ALL processed URLs (including skipped)
            var allCrawlResults = _crawlResults.Values.ToList();

            var internalCount = allCrawlResults.Count(x => !x.External && !x.Resource && !x.Image && !x.Blocked);
            var externalCount = allCrawlResults.Count(x => x.External && !x.Resource && !x.Image);
            var resourceCount = allCrawlResults.Count(x => x.Resource);
            var imageCount = allCrawlResults.Count(x => x.Image);
            var blockedCount = allCrawlResults.Count(x => x.Blocked);

            var totalUrls = internalCount + externalCount + resourceCount + imageCount + blockedCount;

            var metadata = new AuditMetadata(
                TotalUrls: totalUrls,
                TotalInternal: internalCount,
                TotalExternal: externalCount,
                TotalResources: resourceCount,
                TotalImages: imageCount,
                TotalBlocked: blockedCount);

            await _persistence.UpdateAuditTotalsAsync(_currentAuditKey, metadata);

            _crawlStateManager.SetPhase("Evaluating issues");
            double healthScore = await EvaluateAndPersistIssues();
            await _persistence.CompleteAuditAsync(_currentAuditKey, healthScore);
            await _persistence.DeleteCrawlStateAsync(_currentAuditKey);
        }

        private async Task ProcessDeferredHeadRequestsAsync(CancellationToken cancellationToken)
        {
            var urlsToCheck = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

            foreach (var link in _linkDtos)
            {
                if (link.IsExternal && !string.IsNullOrEmpty(link.Url))
                    urlsToCheck.Add(link.Url);
            }

            foreach (var resource in _resourceDtos)
            {
                if (!string.IsNullOrEmpty(resource.Url))
                    urlsToCheck.Add(resource.Url);
            }

            foreach (var image in _imageDtos)
            {
                if (!string.IsNullOrEmpty(image.Url))
                    urlsToCheck.Add(image.Url);
            }

            if (urlsToCheck.Count == 0)
                return;

            _logger.LogInformation("Checking {Count} unique external/resource/image URLs", urlsToCheck.Count);

            var headBlock = new ActionBlock<string>(
                async url =>
                {
                    try
                    {
                        if (_headResponseCache.ContainsKey(url))
                            return;

                        bool isExternal = Uri.TryCreate(url, UriKind.Absolute, out var uri)
                            && uri.Host != _baseUri!.Host;

                        if (isExternal)
                            await _domainRateLimiter.WaitAsync(url);

                        var headResponse = await _crawlService.GetHeadResponse(url);
                        if (headResponse != null)
                            _headResponseCache.TryAdd(url, headResponse);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogDebug(ex, "HEAD request failed for {Url}", url);
                    }
                },
                new ExecutionDataflowBlockOptions
                {
                    MaxDegreeOfParallelism = Math.Min(_contentAuditSettings.MaxConcurrentCrawls * 4, 20),
                    CancellationToken = cancellationToken
                });

            foreach (var url in urlsToCheck)
                await headBlock.SendAsync(url, cancellationToken);

            headBlock.Complete();
            await headBlock.Completion;

            _logger.LogInformation("HEAD requests complete, {CachedCount} responses cached", _headResponseCache.Count);

            foreach (var link in _linkDtos)
            {
                if (link.Url != null && _headResponseCache.TryGetValue(link.Url, out var cached))
                {
                    link.StatusCode = cached.StatusCode;
                    link.ContentType = cached.ContentType;
                }
            }

            foreach (var resource in _resourceDtos)
            {
                if (resource.Url != null && _headResponseCache.TryGetValue(resource.Url, out var cached))
                {
                    resource.StatusCode = cached.StatusCode;
                    resource.ContentType = cached.ContentType;
                    resource.Size = cached.ContentLength;
                }
            }

            foreach (var image in _imageDtos)
            {
                if (image.Url != null && _headResponseCache.TryGetValue(image.Url, out var cached))
                {
                    image.ContentType = cached.ContentType;
                    image.Size = cached.ContentLength;
                }
            }
        }

        private async Task FlushDataToDatabase()
        {
            var pages = _pageDtos.ToList();
            var seoData = _seoDtos.ToList();
            var contentAnalysis = _contentAnalysisDtos.ToList();
            var performance = _performanceDtos.ToList();
            var accessibility = _accessibilityDtos.ToList();
            var technicalSeo = _technicalSeoDtos.ToList();
            var socialMedia = _socialMediaDtos.ToList();
            var contentQuality = _contentQualityDtos.ToList();
            var images = _imageDtos.ToList();
            var resources = _resourceDtos.ToList();
            var links = _linkDtos.ToList();

            var internalLinks = links.Where(x => !x.IsExternal).DistinctBy(x => x.Url).ToList();

            await _persistence.SavePagesAsync(_currentAuditKey, pages);
            await _persistence.SaveSeoDataAsync(_currentAuditKey, seoData, internalLinks);
            await _persistence.SaveContentAnalysisAsync(_currentAuditKey, contentAnalysis);
            await _persistence.SavePerformanceAsync(_currentAuditKey, performance);
            await _persistence.SaveAccessibilityAsync(_currentAuditKey, accessibility);
            await _persistence.SaveTechnicalSeoAsync(_currentAuditKey, technicalSeo);
            await _persistence.SaveSocialMediaAsync(_currentAuditKey, socialMedia);
            await _persistence.SaveContentQualityAsync(_currentAuditKey, contentQuality);
            await _persistence.SaveImagesAsync(_currentAuditKey, images);
            await _persistence.SaveResourcesAsync(_currentAuditKey, resources);
            await _persistence.SaveLinksAsync(_currentAuditKey, links);

            _pagesSinceLastFlush = 0;
        }

        private async Task SaveCrawlStateAsync()
        {
            var state = new CrawlState(
                _visitedUrls.Keys,
                _urlQueue.ToArray(),
                _robotsDisallowedPaths.Keys);

            await _persistence.SaveCrawlStateAsync(_currentAuditKey, state);
        }

        private async Task CopyPageDataFromPreviousAuditAsync(string url, Guid unique, Uri baseUri)
        {
            if (!_previousAuditKey.HasValue)
                return;

            _logger.LogDebug("Copying data from previous audit for unchanged page: {Url}", url);

            var previousAuditKey = _previousAuditKey.Value;
            var previousPage = await _auditRepository.GetPageByAuditKeyAndUrl(previousAuditKey, url);
            if (previousPage != null)
            {
                var pageDto = new PageDto(previousPage);
                pageDto.Unique = unique;
                _pageDtos.Add(pageDto);

                var seoTask = _auditRepository.GetSeoData(previousAuditKey, url);
                var contentAnalysisTask = _auditRepository.GetContentAnalysisData(previousAuditKey, url);
                var performanceTask = _auditRepository.GetPerformanceData(previousAuditKey, url);
                var accessibilityTask = _auditRepository.GetAccessibilityData(previousAuditKey, url);
                var technicalSeoTask = _auditRepository.GetTechnicalSeoData(previousAuditKey, url);
                var socialMediaTask = _auditRepository.GetSocialMediaData(previousAuditKey, url);
                var contentQualityTask = _auditRepository.GetContentQualityData(previousAuditKey, url);
                var linksTask = _auditRepository.GetLinkData(previousAuditKey, url);
                var resourcesTask = _auditRepository.GetResourceData(previousAuditKey, url);
                var imagesTask = _auditRepository.GetImageData(previousAuditKey, url);

                await Task.WhenAll(seoTask, contentAnalysisTask, performanceTask, accessibilityTask,
                    technicalSeoTask, socialMediaTask, contentQualityTask, linksTask, resourcesTask, imagesTask);

                var previousSeo = seoTask.Result?.FirstOrDefault();
                if (previousSeo != null)
                    _seoDtos.Add(new SeoDto(previousSeo));

                var previousContentAnalysis = contentAnalysisTask.Result?.FirstOrDefault();
                if (previousContentAnalysis != null)
                    _contentAnalysisDtos.Add(new ContentAnalysisDto(previousContentAnalysis));

                var previousPerformance = performanceTask.Result?.FirstOrDefault();
                if (previousPerformance != null)
                    _performanceDtos.Add(new PerformanceDto(previousPerformance));

                var previousAccessibility = accessibilityTask.Result?.FirstOrDefault();
                if (previousAccessibility != null)
                    _accessibilityDtos.Add(new AccessibilityDto(previousAccessibility));

                var previousTechnicalSeo = technicalSeoTask.Result?.FirstOrDefault();
                if (previousTechnicalSeo != null)
                    _technicalSeoDtos.Add(new TechnicalSeoDto(previousTechnicalSeo));

                var previousSocialMedia = socialMediaTask.Result?.FirstOrDefault();
                if (previousSocialMedia != null)
                    _socialMediaDtos.Add(new SocialMediaDto(previousSocialMedia));

                var previousContentQuality = contentQualityTask.Result?.FirstOrDefault();
                if (previousContentQuality != null)
                    _contentQualityDtos.Add(new ContentQualityDto(previousContentQuality));

                if (linksTask.Result != null)
                {
                    foreach (var link in linksTask.Result)
                    {
                        var linkDto = new LinkDto(link);
                        _linkDtos.Add(linkDto);

                        if (linkDto.IsExternal)
                        {
                            RegisterCrawlResult(linkDto.Url ?? string.Empty, isExternal: true, isResource: false, isImage: false);
                        }
                    }
                }

                if (resourcesTask.Result != null)
                {
                    foreach (var resource in resourcesTask.Result)
                        _resourceDtos.Add(new ResourceDto(resource));
                }

                if (imagesTask.Result != null)
                {
                    foreach (var image in imagesTask.Result)
                        _imageDtos.Add(new ImageDto(image));
                }
            }
        }

        private async Task<double> EvaluateAndPersistIssues()
        {
            if (!_pageDtos.Any())
                return 0;

            var emissionsService = new EmissionsService();
            var pageAnalysisList = new List<PageAnalysisDto>();

            var seoByUrl = _seoDtos.GroupBy(s => s.Url ?? "").ToDictionary(g => g.Key, g => g.First(), StringComparer.OrdinalIgnoreCase);
            var contentAnalysisByUrl = _contentAnalysisDtos.GroupBy(c => c.Url ?? "").ToDictionary(g => g.Key, g => g.First(), StringComparer.OrdinalIgnoreCase);
            var performanceByUrl = _performanceDtos.GroupBy(p => p.Url ?? "").ToDictionary(g => g.Key, g => g.First(), StringComparer.OrdinalIgnoreCase);
            var accessibilityByUrl = _accessibilityDtos.GroupBy(a => a.Url ?? "").ToDictionary(g => g.Key, g => g.First(), StringComparer.OrdinalIgnoreCase);
            var technicalSeoByUrl = _technicalSeoDtos.GroupBy(t => t.Url ?? "").ToDictionary(g => g.Key, g => g.First(), StringComparer.OrdinalIgnoreCase);
            var socialMediaByUrl = _socialMediaDtos.GroupBy(s => s.Url ?? "").ToDictionary(g => g.Key, g => g.First(), StringComparer.OrdinalIgnoreCase);
            var contentQualityByUrl = _contentQualityDtos.GroupBy(c => c.Url ?? "").ToDictionary(g => g.Key, g => g.First(), StringComparer.OrdinalIgnoreCase);
            var linksByFoundPage = _linkDtos.GroupBy(l => l.FoundPage ?? "").ToDictionary(g => g.Key, g => g.ToList(), StringComparer.OrdinalIgnoreCase);
            var resourcesByFoundPage = _resourceDtos.GroupBy(r => r.FoundPage ?? "").ToDictionary(g => g.Key, g => g.ToList(), StringComparer.OrdinalIgnoreCase);
            var imagesByFoundPage = _imageDtos.GroupBy(i => i.FoundPage ?? "").ToDictionary(g => g.Key, g => g.ToList(), StringComparer.OrdinalIgnoreCase);

            foreach (var page in _pageDtos)
            {
                var url = page.Url ?? "";
                var pageAnalysis = new PageAnalysisDto
                {
                    PageData = page,
                    SeoData = seoByUrl.GetValueOrDefault(url)!,
                    ContentAnalysis = contentAnalysisByUrl.GetValueOrDefault(url)!,
                    PerformanceData = performanceByUrl.GetValueOrDefault(url)!,
                    AccessibilityData = accessibilityByUrl.GetValueOrDefault(url)!,
                    TechnicalSeoData = technicalSeoByUrl.GetValueOrDefault(url)!,
                    SocialMediaData = socialMediaByUrl.GetValueOrDefault(url)!,
                    ContentQualityData = contentQualityByUrl.GetValueOrDefault(url)!,
                    Links = linksByFoundPage.GetValueOrDefault(url) ?? [],
                    Resources = resourcesByFoundPage.GetValueOrDefault(url) ?? [],
                    Images = imagesByFoundPage.GetValueOrDefault(url) ?? []
                };

                if (pageAnalysis.PerformanceData?.TotalBytes.HasValue == true)
                {
                    pageAnalysis.EmissionsData = new();
                    var score = emissionsService.PerVisit(pageAnalysis.PerformanceData.TotalBytes.Value, false, false, true);
                    if (score.Total.HasValue)
                        pageAnalysis.EmissionsData.EmissionsPerPageView = Math.Round(score.Total.Value, 2);
                    pageAnalysis.EmissionsData.CarbonRating = score.Rating;
                }

                pageAnalysisList.Add(pageAnalysis);
            }

            var issueResults = new List<IssueResultSchema>();
            var pagesWithErrors = new HashSet<Guid>();

            var pageIssues = _auditIssueCollection.OfType<IAuditPageIssue>().ToList();
            foreach (var issue in pageIssues)
            {
                var affectedPages = issue.CheckPages(pageAnalysisList);
                if (affectedPages == null) continue;

                foreach (var page in affectedPages)
                {
                    pagesWithErrors.Add(page.PageData.Unique);

                    var schema = new IssueResultSchema
                    {
                        AuditKey = _currentAuditKey,
                        IssueId = issue.Id,
                        ReferenceType = "page",
                        ReferenceUnique = page.PageData.Unique,
                        ReferenceUrl = page.PageData.Url,
                    };

                    if (issue.ExposedProperties != null && issue.ExposedProperties.Any())
                    {
                        schema.ExposedValuesJson = JsonSerializer.Serialize(
                            ExtractExposedValues(page, issue.ExposedProperties));
                    }

                    issueResults.Add(schema);
                }
            }

            var imageIssues = _auditIssueCollection.OfType<IAuditImageIssue>().ToList();
            var allImages = pageAnalysisList.SelectMany(x => x.Images ?? Enumerable.Empty<ImageDto>());

            foreach (var issue in imageIssues)
            {
                var affectedImages = issue.CheckImages(allImages, pageAnalysisList);
                if (affectedImages == null) continue;

                foreach (var image in affectedImages)
                {
                    issueResults.Add(new IssueResultSchema
                    {
                        AuditKey = _currentAuditKey,
                        IssueId = issue.Id,
                        ReferenceType = "image",
                        ReferenceUnique = image.Unique,
                        ReferenceUrl = image.Url,
                        FoundPage = image.FoundPage,
                    });
                }
            }

            await _persistence.SaveIssueResultsAsync(_currentAuditKey, issueResults);

            int totalPages = pageAnalysisList.Count;
            double healthScore = ((double)(totalPages - pagesWithErrors.Count) / totalPages) * 100.0;
            return healthScore;
        }

        private static Dictionary<string, object?>? ExtractExposedValues(
            PageAnalysisDto page, IEnumerable<AuditIssueProperty>? properties)
        {
            if (properties == null || !properties.Any()) return null;

            var values = new Dictionary<string, object?>();
            foreach (var prop in properties)
            {
                if (string.IsNullOrEmpty(prop.Alias)) continue;

                object? current = page;
                foreach (var part in prop.Alias.Split('.'))
                {
                    if (current == null) break;
                    var pi = current.GetType().GetProperty(part,
                        BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                    current = pi?.GetValue(current);
                }

                values[prop.Alias] = current;
            }

            return values;
        }

        private async Task DiscoverInitialUrlsAsync(CancellationToken cancellationToken)
        {
            var orderedStrategies = _urlDiscoveryStrategies.OrderByDescending(s => s.Priority);
            var urlsToEnqueue = new Dictionary<string, DiscoveredUrl>(StringComparer.OrdinalIgnoreCase);

            foreach (var strategy in orderedStrategies)
            {
                _crawlStateManager.SetPhase($"Discovering URLs: {strategy.Name}");
                _logger.LogInformation("Running URL discovery strategy: {Name} (Priority: {Priority}, Queue: {Queue})",
                    strategy.Name, strategy.Priority, strategy.ContributesToCrawlQueue);

                try
                {
                    var urls = await strategy.DiscoverUrlsAsync(_baseUrl!, cancellationToken);
                    int count = 0;

                    foreach (var discoveredUrl in urls)
                    {
                        count++;
                        var normalizedUrl = _requestHandlerSettings.AddTrailingSlash
                            ? discoveredUrl.Url.EnsureEndsWith('/')
                            : discoveredUrl.Url;

                        if (discoveredUrl.ContentId.HasValue)
                        {
                            _umbracoContent[normalizedUrl] = discoveredUrl.ContentId.Value;
                        }

                        if (strategy.ContributesToCrawlQueue && !urlsToEnqueue.ContainsKey(normalizedUrl))
                        {
                            urlsToEnqueue[normalizedUrl] = discoveredUrl;
                        }
                    }

                    _logger.LogInformation("Strategy {Name} discovered {Count} URLs", strategy.Name, count);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error running URL discovery strategy: {Name}", strategy.Name);
                }
            }

            foreach (var kvp in urlsToEnqueue)
            {
                var discoveredUrl = kvp.Value;

                if (Uri.TryCreate(_baseUri, discoveredUrl.Url, out var absoluteUri))
                {
                    var absoluteUrl = absoluteUri.AbsoluteUri;
                    var contentId = discoveredUrl.ContentId
                        ?? (_umbracoContent.TryGetValue(kvp.Key, out var existingId) ? existingId : Guid.Empty);

                    if (contentId == Guid.Empty)
                        contentId = Guid.NewGuid();

                    EnqueueUrl(new UrlQueueItem
                    {
                        Url = absoluteUrl,
                        IsExternal = false,
                        IsAsset = false,
                        Unique = contentId,
                        Depth = 0
                    });

                    _logger.LogDebug("Adding {Url} to the URL queue from discovery strategy", absoluteUrl);
                }
            }

            _logger.LogInformation("URL discovery complete. {ContentNodes} content nodes resolved, {QueuedUrls} URLs queued",
                _umbracoContent.Count, urlsToEnqueue.Count);
        }

        private async Task GetRobots()
        {
            _logger.LogInformation("Should we attempt to use robots.txt? {0}", _contentAuditSettings.RespectRobotsTxt);
            // Start with configured crawl delay
            _effectiveCrawlDelayMs = _contentAuditSettings.CrawlDelayMs;

            if (_contentAuditSettings.RespectRobotsTxt)
            {
                var robotsDisallowedUrls = await _robotsService.GetDisallowedPathsAsync(_baseUrl!);
                if (robotsDisallowedUrls != null && robotsDisallowedUrls?.Any() == true)
                    robotsDisallowedUrls.ForEach(x => _robotsDisallowedPaths.TryAdd(x, 0));

                // Honor Crawl-delay from robots.txt (takes precedence over config)
                var robotsCrawlDelay = await _robotsService.GetCrawlDelayAsync(_baseUrl!);
                if (robotsCrawlDelay.HasValue)
                {
                    _effectiveCrawlDelayMs = Math.Max(_effectiveCrawlDelayMs, robotsCrawlDelay.Value);
                    _logger.LogInformation("Using Crawl-delay from robots.txt: {DelayMs}ms", robotsCrawlDelay.Value);
                }
            }

            if (_effectiveCrawlDelayMs > 0)
            {
                _logger.LogInformation("Effective crawl delay: {DelayMs}ms", _effectiveCrawlDelayMs);
            }
        }

        private bool IsDisallowed(string url) =>
            _robotsDisallowedPaths.Keys.Any(disallowed => url.StartsWith(disallowed, StringComparison.OrdinalIgnoreCase));

        private static string GetPathPrefix(string url)
        {
            if (!Uri.TryCreate(url, UriKind.Absolute, out var uri))
                return url;

            var segments = uri.AbsolutePath.Split('/', StringSplitOptions.RemoveEmptyEntries);
            if (segments.Length == 0)
                return "/";

            // Use first two path segments as the prefix (e.g., "/blog/posts" or "/products")
            var prefixSegments = segments.Take(Math.Min(2, segments.Length));
            return "/" + string.Join("/", prefixSegments);
        }

        private bool IsCircuitBroken(string url)
        {
            var prefix = GetPathPrefix(url);
            return _trippedPaths.ContainsKey(prefix);
        }

        private void RecordSuccess(string url)
        {
            var prefix = GetPathPrefix(url);
            _pathFailureCounts.TryRemove(prefix, out _);
        }

        private void RecordFailure(string url)
        {
            var prefix = GetPathPrefix(url);
            var count = _pathFailureCounts.AddOrUpdate(prefix, 1, (_, c) => c + 1);

            if (count >= CircuitBreakerThreshold)
            {
                if (_trippedPaths.TryAdd(prefix, 0))
                {
                    _logger.LogWarning("Circuit breaker tripped for path prefix: {Prefix} after {Count} consecutive failures",
                        prefix, count);
                }
            }
        }

        private async Task RunAutoEnrichIfConfiguredAsync(CancellationToken cancellationToken)
        {
            if (!_contentAuditSettings.AutoEnrichAfterCrawl)
                return;

            _enrichmentStateManager.StartEnrichment(_currentAuditKey);
            try
            {
                await _enrichmentService.EnrichAuditAsync(_currentAuditKey, _baseUrl!, cancellationToken);
                _enrichmentStateManager.CompleteEnrichment();
            }
            catch (OperationCanceledException)
            {
                // Cancellation already handled upstream
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Auto-enrichment failed for audit {AuditKey}", _currentAuditKey);
                _enrichmentStateManager.FailEnrichment(ex.Message);
            }
        }
    }
}
