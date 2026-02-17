using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Collections.Concurrent;
using System.Runtime.CompilerServices;
using System.Threading.Channels;
using System.Threading.Tasks.Dataflow;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Community.ContentAudit.Composing;
using Umbraco.Community.ContentAudit.Configuration;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Extensions;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;
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

        private readonly HashSet<KeyValuePair<Guid, string>> _umbracoContent = new();

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
        private readonly ILogger<AuditService> _logger;
        private readonly WebRoutingSettings _webRoutingSettings;
        private readonly AuditIssueCollection _auditIssueCollection;
        private readonly IEnumerable<IUrlDiscoveryStrategy> _urlDiscoveryStrategies;

        private readonly Channel<CrawlDto> _crawlResultsChannel;
        private readonly SemaphoreSlim _crawlSemaphore;
        private int _isDiscoveryComplete;

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
            AuditIssueCollection auditIssueCollection,
            ILogger<AuditService> logger,
            IEnumerable<IUrlDiscoveryStrategy> urlDiscoveryStrategies)
        {
            _robotsService = robotsService;
            _crawlService = pageScanningService;
            _persistence = persistence;
            _auditRepository = auditRepository;
            _auditIssueCollection = auditIssueCollection;
            _logger = logger;
            _webRoutingSettings = webRoutingSettings.CurrentValue;
            _urlDiscoveryStrategies = urlDiscoveryStrategies;

            _contentAuditSettings = contentAuditSettings.CurrentValue;
            _requestHandlerSettings = requestHandlerSettings.CurrentValue;

            _crawlResultsChannel = Channel.CreateUnbounded<CrawlDto>();
            _crawlSemaphore = new SemaphoreSlim(_contentAuditSettings.MaxConcurrentCrawls);
        }

        /// <inheritdoc />
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
                _logger.LogInformation("Resuming incomplete audit {AuditKey}", _currentAuditKey);

                var state = await _persistence.LoadCrawlStateAsync(_currentAuditKey, linkedToken);
                if (state != null)
                {
                    foreach (var url in state.VisitedUrls)
                        _visitedUrls.TryAdd(url, 0);

                    foreach (var item in state.PendingUrls)
                        _urlQueue.Enqueue(item);

                    foreach (var path in state.DisallowedPaths)
                        _robotsDisallowedPaths.TryAdd(path, 0);

                    _logger.LogInformation("Restored state: {VisitedCount} visited, {PendingCount} pending",
                        state.VisitedUrls.Count(), state.PendingUrls.Count());
                }
            }
            else
            {
                _currentAuditKey = await _persistence.CreateAuditAsync(_baseUrl, linkedToken);
                _logger.LogInformation("Created new audit {AuditKey}", _currentAuditKey);

                await DiscoverInitialUrlsAsync(linkedToken);
                await GetRobots();
            }

            if (_contentAuditSettings.UseIncrementalCrawl)
            {
                _previousFingerprints = await _persistence.GetPageFingerprintsAsync(_baseUrl, linkedToken);
                _previousAuditKey = await _auditRepository.GetLatestCompletedAuditKeyExcluding(_currentAuditKey);
                _logger.LogInformation("Loaded {Count} fingerprints for incremental crawl (previous audit: {PreviousKey})",
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

            var processUrlBlock = new ActionBlock<UrlQueueItem>(
                async queueItem => await ProcessUrlAsync(queueItem, _baseUri, linkedToken),
                new ExecutionDataflowBlockOptions
                {
                    MaxDegreeOfParallelism = _contentAuditSettings.MaxConcurrentCrawls,
                    CancellationToken = linkedToken,
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
                        await processUrlBlock.SendAsync(queueItem, linkedToken);
                    }

                    int emptyChecks = 0;
                    const int maxEmptyChecks = 3;

                    while (Interlocked.CompareExchange(ref _isDiscoveryComplete, 0, 0) == 0 || !_urlQueue.IsEmpty)
                    {
                        while (_urlQueue.TryDequeue(out UrlQueueItem? queueItem))
                        {
                            _logger.LogInformation("Processing newly discovered URL: {0}", queueItem.Url);
                            await processUrlBlock.SendAsync(queueItem, linkedToken);
                            emptyChecks = 0;
                        }

                        if (_urlQueue.IsEmpty && processUrlBlock.InputCount == 0)
                        {
                            emptyChecks++;
                            _logger.LogInformation("Empty state check {0}/{1}", emptyChecks, maxEmptyChecks);

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
                catch (OperationCanceledException) when (timeoutCts.IsCancellationRequested)
                {
                    _logger.LogWarning("Crawl timed out after {0} minutes", _contentAuditSettings.MaxCrawlDurationMinutes);
                    await SaveCrawlResults();
                    _crawlResultsChannel.Writer.Complete();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error during completion");
                    await _persistence.FailAuditAsync(_currentAuditKey);
                    _crawlResultsChannel.Writer.Complete(ex);
                    throw;
                }
            }, linkedToken);

            await foreach (var result in _crawlResultsChannel.Reader.ReadAllAsync(linkedToken))
                yield return result;

            await completionTask;
        }

        private async Task ProcessUrlAsync(UrlQueueItem queueItem, Uri baseUri, CancellationToken cancellationToken)
        {
            string url = queueItem.Url;
            bool isExternal = queueItem.IsExternal;
            bool isAsset = queueItem.IsAsset;
            bool semaphoreAcquired = false;

            try
            {
                await _crawlSemaphore.WaitAsync(cancellationToken);
                semaphoreAcquired = true;

                // Apply crawl delay if configured
                if (_effectiveCrawlDelayMs > 0)
                {
                    await Task.Delay(_effectiveCrawlDelayMs, cancellationToken);
                }

                _logger.LogInformation("Started processing URL: {0}", url);

                var crawlResultKey = $"{url}|{isExternal}|{isAsset}";

                CrawlDto crawlResult = new()
                {
                    Url = url,
                    External = isExternal,
                    Asset = isAsset,
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
                        _logger.LogInformation("Skipping URL due to circuit breaker: {0}", url);
                    }
                    else if (!IsDisallowed(url))
                    {
                        if (!isAsset && !isExternal && _visitedUrls.TryAdd(url, 0))
                        {
                            crawlResult = await CrawlInternalUrl(url, baseUri, queueItem.Depth);
                            _crawlResults[crawlResultKey] = crawlResult;

                            // Update circuit breaker based on result
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
                    _logger.LogInformation("Writing crawl result for URL: {0}", url);
                    await _crawlResultsChannel.Writer.WriteAsync(crawlResult, cancellationToken);

                    if (!isAsset && !isExternal)
                    {
                        Interlocked.Increment(ref _pagesSinceLastFlush);
                        if (_pagesSinceLastFlush >= FlushThreshold)
                        {
                            await SaveCrawlStateAsync();
                        }
                    }
                }
                else
                {
                    _logger.LogInformation("Skipping writing crawl for URL: {0}", url);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing URL: {0}", url);
                RecordFailure(url);
            }
            finally
            {
                if (semaphoreAcquired)
                {
                    _crawlSemaphore.Release();
                }
                _logger.LogInformation("Finished processing URL: {0}", url);
            }
        }

        private async Task<CrawlDto> CrawlInternalUrl(string url, Uri baseUri, int currentDepth)
        {
            _logger.LogInformation("Starting internal crawl: {0} (depth: {1})", url, currentDepth);

            var matchingUmbracoNode = _umbracoContent.FirstOrDefault(x => x.Value == (_requestHandlerSettings.AddTrailingSlash ? url.EnsureEndsWith('/') : url));

            if (_contentAuditSettings.UseIncrementalCrawl && _previousFingerprints.TryGetValue(url, out var previousFingerprint))
            {
                var changeCheck = await _crawlService.CheckPageChangedAsync(url, previousFingerprint);
                if (!changeCheck.HasChanged)
                {
                    _logger.LogInformation("Page {Url} unchanged, skipping full crawl", url);

                    _newFingerprints.Add(new PageFingerprintDto
                    {
                        Url = url,
                        ContentHash = changeCheck.NewContentHash ?? previousFingerprint.ContentHash,
                        ETag = changeCheck.NewETag ?? previousFingerprint.ETag,
                        LastModified = changeCheck.NewLastModified ?? previousFingerprint.LastModified,
                        UmbracoUpdateDate = previousFingerprint.UmbracoUpdateDate
                    });

                    if (_previousAuditKey.HasValue)
                    {
                        await CopyPageDataFromPreviousAuditAsync(url, matchingUmbracoNode.Key, baseUri);
                    }

                    return new CrawlDto
                    {
                        Url = url,
                        Crawled = true,
                        Asset = false,
                        External = false,
                        Blocked = false,
                        Unique = matchingUmbracoNode.Key,
                        Skipped = true
                    };
                }
            }

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
                        Unique = matchingUmbracoNode.Key,
                        Depth = currentDepth // Redirects keep same depth
                    };

                    EnqueueUrl(urlQueueItem);

                    return new() { Url = url, Crawled = false };
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
                            _logger.LogInformation("Following canonical URL: {Canonical} from page {Url}", canonicalUrl, url);
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

            _logger.LogInformation("Found {0} links and {1} resources on page {2}",
                pageAnalysis.Links.Count(), pageAnalysis.Resources.Count(), url);

            if (pageAnalysis.SeoData?.HasNoFollow == false)
            {
                foreach (var link in pageAnalysis.Links)
                {
                    if (Uri.TryCreate(_baseUri, link.Url, out var absoluteUri))
                    {
                        var absoluteUrl = absoluteUri.AbsoluteUri;
                        bool isExternal = absoluteUri.Host != baseUri.Host;

                        _logger.LogInformation("Processing discovered link: {0} from page {1}", absoluteUrl, url);

                        if (_headResponseCache.TryGetValue(absoluteUrl, out var cachedResponse))
                        {
                            link.StatusCode = cachedResponse.StatusCode;
                            link.ContentType = cachedResponse.ContentType;
                        }
                        else
                        {
                            var headResponse = await _crawlService.GetHeadResponse(absoluteUrl);

                            if (headResponse != null)
                            {
                                link.StatusCode = headResponse.StatusCode;
                                link.ContentType = headResponse.ContentType;
                                _headResponseCache.TryAdd(absoluteUrl, headResponse);
                            }
                        }

                        link.Url = absoluteUrl;
                        _linkDtos.Add(link);

                        var urlQueueItem = new UrlQueueItem()
                        {
                            Url = absoluteUrl,
                            IsExternal = isExternal,
                            IsAsset = false,
                            SourceUrl = url,
                            Unique = matchingUmbracoNode.Key,
                            Depth = currentDepth + 1 // Links are one level deeper
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

                    if (_headResponseCache.TryGetValue(absoluteUrl, out var cachedResponse))
                    {
                        resource.StatusCode = cachedResponse.StatusCode;
                        resource.ContentType = cachedResponse.ContentType;
                        resource.Size = cachedResponse.ContentLength;
                    }
                    else
                    {
                        var headResponse = await _crawlService.GetHeadResponse(absoluteUrl);

                        if (headResponse != null)
                        {
                            resource.StatusCode = headResponse.StatusCode;
                            resource.ContentType = headResponse.ContentType;
                            resource.Size = headResponse.ContentLength;
                            _headResponseCache.TryAdd(absoluteUrl, headResponse);
                        }
                    }

                    _resourceDtos.Add(resource);

                    var urlQueueItem = new UrlQueueItem()
                    {
                        Url = absoluteUrl,
                        IsExternal = isExternal,
                        IsAsset = true,
                        SourceUrl = url,
                        Unique = matchingUmbracoNode.Key,
                        Depth = currentDepth + 1 // Resources are one level deeper
                    };

                    EnqueueUrl(urlQueueItem);
                }
            }

            _logger.LogInformation("Found {0} images on page {1}", pageAnalysis.Images.Count(), url);
            foreach (var image in pageAnalysis.Images)
            {
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
                Asset = false,
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
                _contentAuditSettings.ExcludePatterns,
                _contentAuditSettings.IncludePatterns))
            {
                _logger.LogInformation("Skipping URL due to pattern exclusion: {0}", item.Url);
                return;
            }

            // Check max crawl depth (0 = unlimited)
            if (_contentAuditSettings.MaxCrawlDepth > 0 && item.Depth > _contentAuditSettings.MaxCrawlDepth)
            {
                _logger.LogInformation("Skipping URL due to depth limit ({Depth} > {MaxDepth}): {Url}",
                    item.Depth, _contentAuditSettings.MaxCrawlDepth, item.Url);
                return;
            }

            _urlQueue.Enqueue(item);
            _logger.LogInformation("Enqueued new URL for crawling: {0} (IsExternal: {1}, IsAsset: {2}, Source: {3})",
                item.Url, item.IsExternal, item.IsAsset, item.SourceUrl ?? "Initial");
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

            var internalCount = allCrawlResults.Count(x => !x.External && !x.Asset && !x.Blocked);
            var externalCount = allCrawlResults.Count(x => x.External && !x.Asset);
            var assetCount = allCrawlResults.Count(x => x.Asset);
            var blockedCount = allCrawlResults.Count(x => x.Blocked);

            var totalUrls = internalCount + externalCount + assetCount + blockedCount;

            var metadata = new AuditMetadata(
                TotalUrls: totalUrls,
                TotalInternal: internalCount,
                TotalExternal: externalCount,
                TotalAssets: assetCount,
                TotalBlocked: blockedCount);

            await _persistence.UpdateAuditTotalsAsync(_currentAuditKey, metadata);

            double healthScore = await CalculateHealthScore();
            await _persistence.CompleteAuditAsync(_currentAuditKey, healthScore);
            await _persistence.DeleteCrawlStateAsync(_currentAuditKey);
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

            _logger.LogInformation("Copying data from previous audit for unchanged page: {Url}", url);

            var pages = await _auditRepository.GetPagesByAuditKey(_previousAuditKey.Value);
            var previousPage = pages.FirstOrDefault(p => p.Url == url);
            if (previousPage != null)
            {
                var pageDto = new PageDto(previousPage);
                pageDto.Unique = unique;
                _pageDtos.Add(pageDto);

                var seoData = await _auditRepository.GetSeoData(_previousAuditKey.Value, url);
                var previousSeo = seoData?.FirstOrDefault();
                if (previousSeo != null)
                {
                    _seoDtos.Add(new SeoDto(previousSeo));
                }

                var contentAnalysis = await _auditRepository.GetContentAnalysisData(_previousAuditKey.Value, url);
                var previousContentAnalysis = contentAnalysis?.FirstOrDefault();
                if (previousContentAnalysis != null)
                {
                    _contentAnalysisDtos.Add(new ContentAnalysisDto(previousContentAnalysis));
                }

                var performance = await _auditRepository.GetPerformanceData(_previousAuditKey.Value, url);
                var previousPerformance = performance?.FirstOrDefault();
                if (previousPerformance != null)
                {
                    _performanceDtos.Add(new PerformanceDto(previousPerformance));
                }

                var accessibility = await _auditRepository.GetAccessibilityData(_previousAuditKey.Value, url);
                var previousAccessibility = accessibility?.FirstOrDefault();
                if (previousAccessibility != null)
                {
                    _accessibilityDtos.Add(new AccessibilityDto(previousAccessibility));
                }

                var technicalSeo = await _auditRepository.GetTechnicalSeoData(_previousAuditKey.Value, url);
                var previousTechnicalSeo = technicalSeo?.FirstOrDefault();
                if (previousTechnicalSeo != null)
                {
                    _technicalSeoDtos.Add(new TechnicalSeoDto(previousTechnicalSeo));
                }

                var socialMedia = await _auditRepository.GetSocialMediaData(_previousAuditKey.Value, url);
                var previousSocialMedia = socialMedia?.FirstOrDefault();
                if (previousSocialMedia != null)
                {
                    _socialMediaDtos.Add(new SocialMediaDto(previousSocialMedia));
                }

                var contentQuality = await _auditRepository.GetContentQualityData(_previousAuditKey.Value, url);
                var previousContentQuality = contentQuality?.FirstOrDefault();
                if (previousContentQuality != null)
                {
                    _contentQualityDtos.Add(new ContentQualityDto(previousContentQuality));
                }

                var links = await _auditRepository.GetLinkData(_previousAuditKey.Value, url);
                if (links != null)
                {
                    foreach (var link in links)
                    {
                        var linkDto = new LinkDto(link);
                        _linkDtos.Add(linkDto);

                        if (linkDto.IsExternal)
                        {
                            var urlQueueItem = new UrlQueueItem()
                            {
                                Url = linkDto.Url ?? string.Empty,
                                IsExternal = true,
                                IsAsset = false,
                                SourceUrl = url,
                                Unique = unique,
                                Depth = 1
                            };
                            EnqueueUrl(urlQueueItem);
                        }
                    }
                }

                var resources = await _auditRepository.GetResourceData(_previousAuditKey.Value, url);
                if (resources != null)
                {
                    foreach (var resource in resources)
                    {
                        _resourceDtos.Add(new ResourceDto(resource));
                    }
                }

                var images = await _auditRepository.GetImageData(_previousAuditKey.Value, url);
                if (images != null)
                {
                    foreach (var image in images)
                    {
                        _imageDtos.Add(new ImageDto(image));
                    }
                }
            }
        }

        private async Task<double> CalculateHealthScore()
        {
            if (!_pageDtos.Any())
                return 0;

            // Build PageAnalysisDto objects from our collected data
            var pageAnalysisList = new List<PageAnalysisDto>();
            
            foreach (var page in _pageDtos)
            {
                var pageAnalysis = new PageAnalysisDto
                {
                    PageData = page,
                    SeoData = _seoDtos.FirstOrDefault(s => s.Url == page.Url)!,
                    ContentAnalysis = _contentAnalysisDtos.FirstOrDefault(c => c.Url == page.Url)!,
                    PerformanceData = _performanceDtos.FirstOrDefault(p => p.Url == page.Url)!,
                    AccessibilityData = _accessibilityDtos.FirstOrDefault(a => a.Url == page.Url)!,
                    TechnicalSeoData = _technicalSeoDtos.FirstOrDefault(t => t.Url == page.Url)!,
                    SocialMediaData = _socialMediaDtos.FirstOrDefault(s => s.Url == page.Url)!,
                    ContentQualityData = _contentQualityDtos.FirstOrDefault(c => c.Url == page.Url)!,
                    Links = _linkDtos.Where(l => l.FoundPage == page.Url).ToList(),
                    Resources = _resourceDtos.Where(r => r.FoundPage == page.Url).ToList(),
                    Images = _imageDtos.Where(i => i.FoundPage == page.Url).ToList()
                };
                
                pageAnalysisList.Add(pageAnalysis);
            }

            int pagesWithErrors = 0;
            int totalPages = pageAnalysisList.Count;

            foreach (var page in pageAnalysisList)
            {
                bool pageHasError = false;

                foreach (IAuditPageIssue issue in _auditIssueCollection.Where(x => x is IAuditPageIssue))
                {
                    var issueCheck = issue.CheckPages(new List<PageAnalysisDto>() { page });
                    if (issueCheck?.Count() == 1)
                    {
                        pageHasError = true;
                        break;
                    }
                }

                if (pageHasError)
                {
                    pagesWithErrors++;
                }
            }

            double healthScore = ((double)(totalPages - pagesWithErrors) / totalPages) * 100.0;
            return healthScore;
        }

        private async Task DiscoverInitialUrlsAsync(CancellationToken cancellationToken)
        {
            var orderedStrategies = _urlDiscoveryStrategies.OrderByDescending(s => s.Priority);
            var discoveredUrls = new Dictionary<string, DiscoveredUrl>(StringComparer.OrdinalIgnoreCase);

            foreach (var strategy in orderedStrategies)
            {
                _logger.LogInformation("Running URL discovery strategy: {Name} (Priority: {Priority})", strategy.Name, strategy.Priority);

                try
                {
                    var urls = await strategy.DiscoverUrlsAsync(_baseUrl!, cancellationToken);

                    foreach (var discoveredUrl in urls)
                    {
                        var normalizedUrl = _requestHandlerSettings.AddTrailingSlash
                            ? discoveredUrl.Url.EnsureEndsWith('/')
                            : discoveredUrl.Url;

                        if (!discoveredUrls.ContainsKey(normalizedUrl))
                        {
                            discoveredUrls[normalizedUrl] = discoveredUrl;
                        }
                    }

                    _logger.LogInformation("Strategy {Name} discovered {Count} URLs", strategy.Name, urls.Count());
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error running URL discovery strategy: {Name}", strategy.Name);
                }
            }

            foreach (var kvp in discoveredUrls)
            {
                var discoveredUrl = kvp.Value;

                if (discoveredUrl.ContentId.HasValue)
                {
                    _umbracoContent.Add(new KeyValuePair<Guid, string>(discoveredUrl.ContentId.Value, kvp.Key));
                }

                if (Uri.TryCreate(_baseUri, discoveredUrl.Url, out var absoluteUri))
                {
                    var absoluteUrl = absoluteUri.AbsoluteUri;

                    EnqueueUrl(new UrlQueueItem
                    {
                        Url = absoluteUrl,
                        IsExternal = false,
                        IsAsset = false,
                        Unique = discoveredUrl.ContentId ?? Guid.Empty,
                        Depth = 0 // Seed URLs start at depth 0
                    });

                    _logger.LogInformation("Adding {Url} to the URL queue from discovery strategy", absoluteUrl);
                }
            }

            _logger.LogInformation("URL discovery complete. Total unique URLs: {Count}", discoveredUrls.Count);
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
    }
}
