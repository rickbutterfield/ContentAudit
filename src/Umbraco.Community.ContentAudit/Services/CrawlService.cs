using Microsoft.Extensions.Logging;
using Microsoft.Playwright;
using Polly;
using Polly.Retry;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Options;
using Umbraco.Community.ContentAudit.Configuration;
using Umbraco.Community.ContentAudit.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;
using Umbraco.Community.ContentAudit.Models.Validation;
using Umbraco.Community.ContentAudit.Extensions;

namespace Umbraco.Community.ContentAudit.Services
{
    /// <inheritdoc/>
    public class CrawlService : ICrawlService
    {
        private const int MaxRetryAttempts = 3;
        private static readonly TimeSpan InitialRetryDelay = TimeSpan.FromSeconds(1);

        private readonly ILogger<CrawlService> _logger;
        private readonly IBrowserPagePool _pagePool;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IValidationService _validationService;
        private readonly ContentAuditSettings _settings;
        private readonly ResiliencePipeline _playwrightRetryPipeline;
        private Uri? _baseUri;

        /// <summary>
        /// Initializes a new instance of the <see cref="CrawlService"/> class
        /// </summary>
        /// <param name="logger">The logger for diagnostic information</param>
        /// <param name="pagePool">The browser page pool for page reuse</param>
        /// <param name="httpClientFactory">The HTTP client factory for making HTTP requests</param>
        /// <param name="validationService">The validation service for HTML validation</param>
        /// <param name="settings">The content audit settings</param>
        public CrawlService(
            ILogger<CrawlService> logger,
            IBrowserPagePool pagePool,
            IHttpClientFactory httpClientFactory,
            IValidationService validationService,
            IOptionsMonitor<ContentAuditSettings> settings)
        {
            _logger = logger;
            _pagePool = pagePool;
            _httpClientFactory = httpClientFactory;
            _validationService = validationService;
            _settings = settings.CurrentValue;

            _playwrightRetryPipeline = new ResiliencePipelineBuilder()
                .AddRetry(new RetryStrategyOptions
                {
                    MaxRetryAttempts = MaxRetryAttempts,
                    Delay = InitialRetryDelay,
                    BackoffType = DelayBackoffType.Exponential,
                    UseJitter = true,
                    ShouldHandle = new PredicateBuilder().Handle<PlaywrightException>().Handle<TimeoutException>(),
                    OnRetry = args =>
                    {
                        _logger.LogWarning("Playwright retry attempt {AttemptNumber} after {Delay}ms for {Exception}",
                            args.AttemptNumber, args.RetryDelay.TotalMilliseconds, args.Outcome.Exception?.Message);
                        return ValueTask.CompletedTask;
                    }
                })
                .Build();
        }

        /// <inheritdoc/>
        public async Task<PageAnalysisDto?> GetPageAnalysis(string url, Uri baseUri, Guid nodeKey)
        {
            IPage? page = null;
            bool pageInBadState = false;

            try
            {
                _baseUri = baseUri;

                page = await _pagePool.AcquireAsync();
                var startTime = DateTime.UtcNow;

                var pageAnalysis = new PageAnalysisDto() { Unique = nodeKey, EntityType = "document" };

                await page.RouteAsync("**/*", async route =>
                {
                    var request = route.Request;
                    var routeUrl = request.Url;

                    try
                    {
                        if (request.ResourceType == "script" || request.ResourceType == "stylesheet")
                        {
                            pageAnalysis.Resources.Add(new ResourceDto()
                            {
                                Url = routeUrl,
                                IsExternal = IsExternalUrl(routeUrl),
                                FoundPage = url,
                                Unique = nodeKey
                            });
                        }

                        if (request.ResourceType == "image")
                        {
                            var resource = new ResourceDto()
                            {
                                Url = routeUrl,
                                IsExternal = IsExternalUrl(routeUrl),
                                FoundPage = url,
                                Unique = nodeKey
                            };

                            pageAnalysis.Images.Add(new ImageDto(resource)
                            {
                                IsBackground = true
                            });
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError($"Error processing response for {route.Request.Url}: {ex.Message}");
                    }
                    await route.ContinueAsync();
                });

                // Navigate to the page and wait for network idle (with retry)
                var gotoOptions = new PageGotoOptions
                {
                    WaitUntil = WaitUntilState.NetworkIdle
                };

                if (_settings.PageTimeoutMs > 0)
                {
                    gotoOptions.Timeout = _settings.PageTimeoutMs;
                }

                var response = await _playwrightRetryPipeline.ExecuteAsync(async ct =>
                    await page.GotoAsync(url, gotoOptions));

                var endTime = DateTime.UtcNow;

                if (response == null)
                {
                    _logger.LogWarning("Failed to fetch page {0}: No response", url);
                    pageAnalysis.PageData.StatusCode = (int)HttpStatusCode.NotFound;
                    return pageAnalysis;
                }

                if (response.Request.IsNavigationRequest)
                {
                    if (response.Request.RedirectedFrom != null)
                    {
                        var redirectResponse = await response.Request.RedirectedFrom.ResponseAsync();

                        if (redirectResponse != null)
                        {
                            _logger.LogInformation("Followed redirect chain from {0} to {1} with initial status {2}", url, redirectResponse.Url, redirectResponse.Status);

                            pageAnalysis.PageData.Url = redirectResponse.Url;
                            pageAnalysis.PageData.RedirectUrl = response.Url;
                            pageAnalysis.PageData.StatusCode = redirectResponse.Status;
                            pageAnalysis.PageData.Redirect = true;
                            return pageAnalysis;
                        }
                    }
                }

                string contentType = response.Headers.TryGetValue("content-type", out var ct) ? ct : string.Empty;
                string? eTag = response.Headers.TryGetValue("etag", out var etag) ? etag?.Trim('"') : null;
                DateTime? lastModified = response.Headers.TryGetValue("last-modified", out var lm) && DateTime.TryParse(lm, out var parsedLm) ? parsedLm : null;

                if (!response.Ok)
                {
                    _logger.LogWarning("Failed to fetch page {0}: {1}", url, response.Status);

                    pageAnalysis.PageData = new()
                    {
                        Url = url,
                        StatusCode = response.Status,
                        Unique = nodeKey,
                    };

                    pageAnalysis.TechnicalSeoData = new()
                    {
                        Url = url,
                        ContentType = contentType
                    };

                    return pageAnalysis;
                }

                if (!contentType.Contains("text/html"))
                {
                    _logger.LogWarning("Can't crawl page {0}: content type is {1}", url, ct);
                    return null;
                }

                //if (!wasRedirected)
                //{
                await page.AddScriptTagAsync(new PageAddScriptTagOptions
                {
                    Url = "https://unpkg.com/web-vitals@4/dist/web-vitals.iife.js"
                });

                await page.AddScriptTagAsync(new PageAddScriptTagOptions
                {
                    Content = @"
                        function setWebVitalsData(metricName, metricValue) {
                            document.body.setAttribute(`data-${metricName.toLowerCase()}`, JSON.stringify(metricValue));
                        }

                        self.webVitals.onCLS((metric) => setWebVitalsData('CLS', metric), { reportAllChanges: true });
                        self.webVitals.onFCP((metric) => setWebVitalsData('FCP', metric), { reportAllChanges: true });
                        self.webVitals.onINP((metric) => setWebVitalsData('INP', metric), { reportAllChanges: true });
                        self.webVitals.onLCP((metric) => setWebVitalsData('LCP', metric), { reportAllChanges: true });
                        self.webVitals.onTTFB((metric) => setWebVitalsData('TTFB', metric), { reportAllChanges: true });
                    "
                });
                //}

                // Wait for the page to be fully loaded
                await page.WaitForLoadStateAsync(LoadState.DOMContentLoaded);
                await page.WaitForLoadStateAsync(LoadState.NetworkIdle);

                var analysisData = Task.Run(async () =>
                {
                    var linkElements = await page.Locator("a:not([href*='mailto:'])").AllAsync();
                    pageAnalysis.Links = (await Task.WhenAll(linkElements.Select(async a =>
                    {
                        var href = await a.GetAttributeAsync("href");
                        return new LinkDto()
                        {
                            Url = href,
                            FoundPage = url,
                            IsExternal = IsExternalUrl(href),
                        };
                    }))).ToList();

                    var imageElements = await page.Locator("img[src]").AllAsync();
                    var pageImages = (await Task.WhenAll(imageElements.Select(async a =>
                    {
                        var src = await a.GetAttributeAsync("src");
                        var title = await a.GetAttributeAsync("title");
                        var resource = new ResourceDto()
                        {
                            Url = src,
                            FoundPage = url,
                            Unique = nodeKey,
                            IsExternal = IsExternalUrl(src),
                        };

                        var altText = await a.GetAttributeAsync("alt");
                        return new ImageDto(resource)
                        {
                            AltText = altText,
                            Title = title
                        };
                    }))).ToList();

                    if (pageAnalysis.Images != null)
                    {
                        foreach (var image in pageImages)
                        {
                            var existingImage = pageAnalysis.Images.FirstOrDefault(i => i.Url?.Contains(image.Url!) == true);
                            if (existingImage != null)
                            {
                                existingImage.IsBackground = false;
                                existingImage.AltText = image.AltText;
                            }
                        }
                    }

                    if (pageAnalysis.PageData == default)
                    {
                        pageAnalysis.PageData = new PageDto
                        {
                            Url = url,
                            StatusCode = response.Status,
                            Unique = nodeKey
                        };
                    }

                    try
                    {
                        string metaDescription = "";
                        string canonicalUrl = "";
                        string h1Text = "";
                        string robotsContent = "";

                        if (await page.Locator("meta[name=\"description\"]").CountAsync() > 0)
                        {
                            metaDescription = await page.Locator("meta[name=\"description\"]").GetAttributeAsync("content") ?? "";
                        }

                        if (await page.Locator("link[rel=\"canonical\"]").CountAsync() > 0)
                        {
                            canonicalUrl = await page.Locator("link[rel=\"canonical\"]").GetAttributeAsync("href") ?? "";
                        }

                        if (await page.Locator("h1").CountAsync() > 0)
                        {
                            h1Text = await page.Locator("h1").TextContentAsync() ?? "";
                        }

                        var h2Elements = await page.Locator("h2").AllAsync();
                        var h3Elements = await page.Locator("h3").AllAsync();

                        if (await page.Locator("meta[name=\"robots\"]").CountAsync() > 0)
                        {
                            robotsContent = await page.Locator("meta[name=\"robots\"]").GetAttributeAsync("content") ?? "";
                        }

                        pageAnalysis.SeoData = new SeoDto
                        {
                            Url = url,
                            Title = await page.TitleAsync(),
                            MetaDescription = metaDescription,
                            CanonicalUrl = canonicalUrl,
                            H1 = h1Text,
                            H2s = (await Task.WhenAll(h2Elements.Select(h => h.TextContentAsync()))).Where(text => text != null).Select(text => text!).ToList(),
                            H3s = (await Task.WhenAll(h3Elements.Select(h => h.TextContentAsync()))).Where(text => text != null).Select(text => text!).ToList(),
                            HasNoIndex = robotsContent.ToLower().Contains("noindex"),
                            HasNoFollow = robotsContent.ToLower().Contains("nofollow"),
                            OpenGraphTitle = await page.Locator("meta[property=\"og:title\"]").CountAsync() > 0 ? await page.Locator("meta[property=\"og:title\"]").GetAttributeAsync("content") ?? "" : "",
                            OpenGraphDescription = await page.Locator("meta[property=\"og:description\"]").CountAsync() > 0 ? await page.Locator("meta[property=\"og:description\"]").GetAttributeAsync("content") ?? "" : "",
                            OpenGraphImage = await page.Locator("meta[property=\"og:image\"]").CountAsync() > 0 ? await page.Locator("meta[property=\"og:image\"]").GetAttributeAsync("content") ?? "" : "",
                            TwitterCard = await page.Locator("meta[name=\"twitter:card\"]").CountAsync() > 0 ? await page.Locator("meta[name=\"twitter:card\"]").GetAttributeAsync("content") ?? "" : "",
                            TwitterTitle = await page.Locator("meta[name=\"twitter:title\"]").CountAsync() > 0 ? await page.Locator("meta[name=\"twitter:title\"]").GetAttributeAsync("content") ?? "" : "",
                            TwitterDescription = await page.Locator("meta[name=\"twitter:description\"]").CountAsync() > 0 ? await page.Locator("meta[name=\"twitter:description\"]").GetAttributeAsync("content") ?? "" : "",
                            TwitterImage = await page.Locator("meta[name=\"twitter:image\"]").CountAsync() > 0 ? await page.Locator("meta[name=\"twitter:image\"]").GetAttributeAsync("content") ?? "" : ""
                        };
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error while populating SeoData for {0}", url);
                    }

                    try
                    {
                        var bodyText = "";
                        if (await page.Locator("body").CountAsync() > 0)
                        {
                            bodyText = await page.Locator("body").TextContentAsync() ?? "";
                        }

                        pageAnalysis.ContentAnalysis = new ContentAnalysisDto
                        {
                            Url = url,
                            WordCount = CountWords(bodyText),
                            ParagraphCount = await page.Locator("p").CountAsync(),
                            Images = await page.Locator("img").CountAsync(),
                            Links = await page.Locator("a[href]").CountAsync(),
                            ExternalLinks = await page.Locator("a[href]").CountAsync() > 0 ? await page.Locator("a[href]").EvaluateAllAsync<int>("elements => elements.filter(link => !link.href?.startsWith('" + _baseUri.AbsoluteUri + "')).length") : 0,
                            InternalLinks = await page.Locator("a[href]").CountAsync() > 0 ? await page.Locator("a[href]").EvaluateAllAsync<int>("elements => elements.filter(link => link.href?.startsWith('" + _baseUri.AbsoluteUri + "')).length") : 0,
                            ReadabilityScore = CalculateReadabilityScore(bodyText),
                            KeywordDensity = CalculateKeywordDensity(bodyText),
                            //MissingAltTextImages = await page.Locator("img:not([alt])").CountAsync() > 0 ? string.Join(',', (await page.Locator("img:not([alt])").AllAsync()).Select(async img => await img.GetAttributeAsync("src") ?? "").Select(t => t.Result)) : "",
                            //MissingTitleImages = await page.Locator("img:not([title])").CountAsync() > 0 ? string.Join(',', (await page.Locator("img:not([title])").AllAsync()).Select(async img => await img.GetAttributeAsync("src") ?? "").Select(t => t.Result)) : ""
                        };
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error while populating ContentAnalysis for {0}", url);
                    }

                    try
                    {
                        pageAnalysis.PerformanceData = new PerformanceDto
                        {
                            Url = url,
                            PageLoadTime = (long)(endTime - startTime).TotalMilliseconds,
                            CumulativeLayoutShift = await GetCumulativeLayoutShift(page),
                            FirstContentfulPaint = await GetFirstContentfulPaint(page),
                            LargestContentfulPaint = await GetLargestContentfulPaint(page),
                            TimeToFirstByte = await GetTimeToFirstByte(page),
                            TotalRequests = await page.EvaluateAsync<int>("() => performance.getEntriesByType('resource').length"),
                            TotalBytes = await page.EvaluateAsync<int>("() => performance.getEntriesByType('resource').reduce((acc, entry) => acc + entry.transferSize, 0)"),
                            ResourceTimings = await GetResourceTimings(page)
                        };
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error while populating PerformanceData for {0}", url);
                    }

                    try
                    {
                        pageAnalysis.AccessibilityData = new AccessibilityDto
                        {
                            Url = url,
                            AccessibilityIssues = await CheckAccessibilityIssues(page),
                            AriaLabelCount = await page.Locator("[aria-label]").CountAsync(),
                            AriaDescribedByCount = await page.Locator("[aria-describedby]").CountAsync(),
                            HasSkipToContent = await page.Locator("a[href=\"#main\"], a[href=\"#content\"]").CountAsync() > 0,
                            HasProperHeadingStructure = await CheckHeadingStructure(page),
                            ColorContrastIssues = await CheckColorContrastIssues(page)
                        };
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error while populating AccessibilityData for {0}", url);
                    }

                    try
                    {
                        var validHtml = await ValidateHtml(page);
                        pageAnalysis.TechnicalSeoData = new TechnicalSeoDto
                        {
                            Url = url,
                            ContentType = response.Headers["content-type"],
                            Charset = await page.Locator("meta[charset]").CountAsync() > 0 ? await page.EvaluateAsync<string>("() => document.querySelector('meta[charset]')?.charset") ?? "" :
                                      await page.Locator("meta[http-equiv=\"Content-Type\"]").CountAsync() > 0 ? await page.EvaluateAsync<string>("() => document.querySelector('meta[http-equiv=\"Content-Type\"]')?.content") ?? "" : "",
                            HasGzipCompression = response.Headers.ContainsKey("content-encoding") && response.Headers["content-encoding"].Contains("gzip"),
                            HasBrowserCaching = response.Headers.ContainsKey("cache-control") && response.Headers["cache-control"].Contains("max-age"),
                            HasHttps = url.StartsWith("https://"),
                            HasValidHtml = validHtml?.IsValid() == true,
                            HtmlValidationErrors = validHtml?.GetErrors()?.ToList() ?? new List<ValidationMessage>(),
                        };
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error while populating TechnicalSeoData for {0}", url);
                    }

                    try
                    {
                        pageAnalysis.SocialMediaData = new SocialMediaDto
                        {
                            Url = url,
                            SocialShareButtons = await GetSocialShareButtons(page),
                            HasFacebookPixel = await page.Locator("script[src*=\"facebook.net\"]").CountAsync() > 0,
                            HasTwitterPixel = await page.Locator("script[src*=\"twitter.com\"]").CountAsync() > 0,
                            HasLinkedInPixel = await page.Locator("script[src*=\"linkedin.com\"]").CountAsync() > 0,
                            SocialMediaLinks = await GetSocialMediaLinks(page)
                        };
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error while populating SocialMediaData for {0}", url);
                    }

                    try
                    {
                        pageAnalysis.ContentQualityData = new ContentQualityDto
                        {
                            Url = url,
                            HasDuplicateContent = await CheckForDuplicateContent(page),
                            DuplicateContentUrls = await GetDuplicateContentUrls(page),
                            HasThinContent = await CheckForThinContent(page),
                            ContentScore = await CalculateContentScore(page),
                            ContentGaps = await IdentifyContentGaps(page),
                            ContentStrengths = await IdentifyContentStrengths(page)
                        };
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error while populating ContentQualityData for {0}", url);
                    }

                    return pageAnalysis;
                });

                pageAnalysis.PageData = new PageDto
                {
                    Url = url,
                    Redirect = false,
                    StatusCode = response.Status,
                    Unique = nodeKey
                };

                await analysisData;

                // Set fingerprint data for incremental crawl support
                // Use raw HTTP content for hash (not Playwright-rendered DOM) to ensure consistency with fallback checks
                pageAnalysis.ETag = eTag;
                pageAnalysis.LastModified = lastModified;
                pageAnalysis.ContentHash = await GetRawContentHashAsync(url);

                return pageAnalysis;
            }
            catch (PlaywrightException ex)
            {
                _logger.LogWarning(ex, "Playwright error analyzing page {0}, falling back to HttpClient", url);
                pageInBadState = true;
                return await GetPageAnalysisFallbackAsync(url, nodeKey);
            }
            catch (TimeoutException ex)
            {
                _logger.LogWarning(ex, "Timeout analyzing page {0}, falling back to HttpClient", url);
                pageInBadState = true;
                return await GetPageAnalysisFallbackAsync(url, nodeKey);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error analyzing page {0}", url);
                return await GetPageAnalysisFallbackAsync(url, nodeKey);
            }
            finally
            {
                if (page != null)
                {
                    if (pageInBadState)
                    {
                        try
                        {
                            if (!page.IsClosed)
                                await page.CloseAsync();
                        }
                        catch (Exception ex)
                        {
                            _logger.LogDebug(ex, "Error closing bad state page");
                        }
                    }
                    else
                    {
                        await _pagePool.ReleaseAsync(page);
                    }
                }
            }
        }

        private bool IsExternalUrl(string? url)
        {
            if (string.IsNullOrEmpty(url) || _baseUri == null)
                return false;

            if (Uri.TryCreate(_baseUri, url, out var absoluteUri))
            {
                return absoluteUri.Host != _baseUri.Host;
            }

            return !url.StartsWith(_baseUri.AbsoluteUri);
        }

        private int CountWords(string text)
        {
            return Regex.Matches(text, @"\b\w+\b").Count;
        }

        private double CalculateReadabilityScore(string text)
        {
            var words = CountWords(text);
            var sentences = text.Split(new[] { '.', '!', '?' }, StringSplitOptions.RemoveEmptyEntries).Length;
            var syllables = CountSyllables(text);

            if (words == 0 || sentences == 0)
                return 0;

            // Flesch Reading Ease formula
            return 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
        }

        private int CountSyllables(string text)
        {
            return Regex.Matches(text, "[aeiouy]+", RegexOptions.IgnoreCase).Count;
        }

        private Dictionary<string, int> CalculateKeywordDensity(string text)
        {
            var words = Regex.Matches(text, @"\b\w+\b")
                .Select(m => m.Value.ToLower())
                .Where(w => w.Length > 3)
                .ToList();

            var totalWords = words.Count;
            var keywordDensity = new Dictionary<string, int>();

            foreach (var word in words.Distinct())
            {
                var count = words.Count(w => w == word);
                var density = (int)((count / (double)totalWords) * 100);
                if (density > 0)
                {
                    keywordDensity[word] = density;
                }
            }

            return keywordDensity.OrderByDescending(x => x.Value).ToDictionary();
        }

        private async Task<MetricDto?> GetCumulativeLayoutShift(IPage page)
        {
            var body = await page.QuerySelectorAsync("body");
            if (body != null)
            {
                var clsAttribute = await body.GetAttributeAsync("data-cls");
                if (!string.IsNullOrEmpty(clsAttribute))
                {
                    try
                    {
                        var clsObject = JsonSerializer.Deserialize<MetricDto>(clsAttribute);
                        return clsObject;
                    }
                    catch (Exception ex)
                    {
                        throw new Exception(ex.Message, ex);
                    }
                }
            }

            return new MetricDto() { Name = MetricName.CLS, Value = 0 };
        }

        private async Task<MetricDto?> GetFirstContentfulPaint(IPage page)
        {
            var body = await page.QuerySelectorAsync("body");
            if (body != null)
            {
                var fcpAttribute = await body.GetAttributeAsync("data-fcp");
                if (!string.IsNullOrEmpty(fcpAttribute))
                {
                    var fcpObject = JsonSerializer.Deserialize<MetricDto>(fcpAttribute);
                    return fcpObject;
                }
            }

            long fcpEntry = await page.EvaluateAsync<long>("() => performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime ?? 0");
            return new MetricDto() { Name = MetricName.FCP, Value = fcpEntry };
        }

        private async Task<MetricDto?> GetLargestContentfulPaint(IPage page)
        {
            var body = await page.QuerySelectorAsync("body");
            if (body != null)
            {
                var lcpAttribute = await body.GetAttributeAsync("data-lcp");
                if (!string.IsNullOrEmpty(lcpAttribute))
                {
                    var lcpObject = JsonSerializer.Deserialize<MetricDto>(lcpAttribute);
                    return lcpObject;
                }
            }

            long lcpEntry = await page.EvaluateAsync<long>("() => performance.getEntriesByType('largest-contentful-paint')[0]?.startTime ?? 0");
            return new MetricDto() { Name = MetricName.LCP, Value = lcpEntry };
        }

        private async Task<MetricDto?> GetTimeToFirstByte(IPage page)
        {
            var body = await page.QuerySelectorAsync("body");
            if (body != null)
            {
                var ttfbAttribute = await body.GetAttributeAsync("data-ttfb");
                if (!string.IsNullOrEmpty(ttfbAttribute))
                {
                    var ttfbObject = JsonSerializer.Deserialize<MetricDto>(ttfbAttribute);
                    return ttfbObject;
                }
            }

            long ttfbEntry = await page.EvaluateAsync<long>("() => performance.getEntriesByType('navigation')[0]?.responseStart ?? 0");
            return new MetricDto() { Name = MetricName.TTFB, Value = ttfbEntry };
        }

        private async Task<List<ResourceTimingDto>?> GetResourceTimings(IPage page)
        {
            var timings = await page.EvaluateAsync(@"
                () => {
                    return performance.getEntriesByType('resource').map(entry => {
                        return {
                            url: entry.name,
                            resourceType: entry.initiatorType,
                            duration: entry.duration,
                            startTime: entry.startTime,
                            size: entry.transferSize
                        };
                    });
                }");

            if (timings.HasValue)
                return JsonSerializer.Deserialize<List<ResourceTimingDto>?>(timings.Value.ToString());

            return new();
        }

        private async Task<List<string>> CheckAccessibilityIssues(IPage page)
        {
            var issues = new List<string>();

            // Check for missing alt text on images
            var imagesWithoutAlt = await page.Locator("img:not([alt])").EvaluateAllAsync<string[]>("elements => elements.map(el => el.src)");
            issues.AddRange(imagesWithoutAlt.Select(src => $"Image without alt text: {src}"));

            // Check for missing form labels
            var inputsWithoutLabels = await page.Locator("input:not([id]):not([aria-label])").CountAsync();
            if (inputsWithoutLabels > 0)
            {
                issues.Add("Input without label or aria-label");
            }

            // Check for proper heading structure
            if (!await CheckHeadingStructure(page))
            {
                issues.Add("Improper heading structure");
            }

            return issues;
        }

        private async Task<bool> CheckHeadingStructure(IPage page)
        {
            var headings = await page.Locator("h1, h2, h3, h4, h5, h6").AllAsync();
            if (!headings.Any())
                return false;

            var firstHeading = headings.First();
            if (await firstHeading.EvaluateAsync<string>("el => el.tagName") != "H1")
                return false;

            var currentLevel = 1;
            foreach (var heading in headings.Skip(1))
            {
                var tagName = await heading.EvaluateAsync<string>("el => el.tagName");
                var level = int.Parse(tagName.Substring(1));
                if (level > currentLevel + 1)
                    return false;
                currentLevel = level;
            }

            return true;
        }

        private async Task<List<string>> CheckColorContrastIssues(IPage page)
        {
            // This is a simplified implementation
            // In a real implementation, you would use a color contrast algorithm
            return new List<string>();
        }

        private async Task<ValidationResult?> ValidateHtml(IPage page)
        {
            var content = await page.ContentAsync();
            return await _validationService.ValidateHtmlAsync(content);
        }

        private async Task<string?> GetSchemaType(IPage page)
        {
            var schemaScript = await page.Locator("script[type=\"application/ld+json\"]").TextContentAsync();
            if (string.IsNullOrEmpty(schemaScript))
                return null;

            try
            {
                var schema = JsonSerializer.Deserialize<Dictionary<string, object>>(schemaScript);
                if (schema != null)
                {
                    return schema.TryGetValue("@type", out var type) ? type.ToString() : null;
                }
                return null;
            }
            catch
            {
                return null;
            }
        }

        private async Task<List<string>> GetSocialShareButtons(IPage page)
        {
            var elements = await page.Locator("[class*=\"share\"], [class*=\"social\"]").AllAsync();
            var buttons = new List<string>();

            foreach (var element in elements)
            {
                var classList = await element.GetAttributeAsync("class");
                if (classList != null)
                {
                    var classes = classList.Split(' ');
                    var socialClass = classes.FirstOrDefault(c =>
                        c.Contains("facebook", StringComparison.OrdinalIgnoreCase) ||
                        c.Contains("twitter", StringComparison.OrdinalIgnoreCase) ||
                        c.Contains("linkedin", StringComparison.OrdinalIgnoreCase) ||
                        c.Contains("pinterest", StringComparison.OrdinalIgnoreCase));

                    if (socialClass != null)
                    {
                        buttons.Add(socialClass);
                    }
                }
            }

            return buttons;
        }

        private async Task<List<string>> GetSocialMediaLinks(IPage page)
        {
            var links = await page.Locator("a[href*=\"facebook.com\"], a[href*=\"twitter.com\"], a[href*=\"linkedin.com\"], a[href*=\"instagram.com\"], a[href*=\"youtube.com\"]").AllAsync();
            var hrefs = new List<string>();

            foreach (var link in links)
            {
                var href = await link.GetAttributeAsync("href");
                if (href != null)
                {
                    hrefs.Add(href);
                }
            }

            return hrefs;
        }

        private async Task<bool> CheckForDuplicateContent(IPage page)
        {
            // This is a simplified implementation
            // In a real implementation, you would compare content with other pages
            return false;
        }

        private async Task<List<string>> GetDuplicateContentUrls(IPage page)
        {
            // This is a simplified implementation
            // In a real implementation, you would compare content with other pages
            return new List<string>();
        }

        private async Task<bool> CheckForThinContent(IPage page)
        {
            var mainContent = await page.Locator("main, article").Or(page.Locator("body")).First.TextContentAsync() ?? "";
            var wordCount = CountWords(mainContent);
            return wordCount < 300;
        }

        private async Task<int> CalculateContentScore(IPage page)
        {
            var score = 0;

            // Word count score
            var mainContent = await page.Locator("main, article").Or(page.Locator("body")).First.TextContentAsync() ?? "";
            var wordCount = CountWords(mainContent);
            score += Math.Min(wordCount / 10, 20);

            // Image score
            var imageCount = await page.Locator("img").CountAsync();
            score += Math.Min(imageCount * 2, 10);

            // Link score
            var linkCount = await page.Locator("a[href]").CountAsync();
            score += Math.Min(linkCount, 10);

            // Heading structure score
            if (await CheckHeadingStructure(page))
                score += 10;

            // Accessibility score
            var accessibilityIssues = await CheckAccessibilityIssues(page);
            score += Math.Max(0, 10 - accessibilityIssues.Count);

            return score;
        }

        private async Task<List<string>> IdentifyContentGaps(IPage page)
        {
            var gaps = new List<string>();

            // Check for missing images
            var imageCount = await page.Locator("img").CountAsync();
            if (imageCount == 0)
                gaps.Add("No images found");

            // Check for missing links
            var linkCount = await page.Locator("a[href]").CountAsync();
            if (linkCount == 0)
                gaps.Add("No links found");

            // Check for thin content
            if (await CheckForThinContent(page))
                gaps.Add("Content is too thin (less than 300 words)");

            // Check for missing headings
            var headingCount = await page.Locator("h1, h2, h3, h4, h5, h6").CountAsync();
            if (headingCount == 0)
                gaps.Add("No headings found");

            return gaps;
        }

        private async Task<List<string>> IdentifyContentStrengths(IPage page)
        {
            var strengths = new List<string>();

            // Check for good word count
            var mainContent = await page.Locator("main, article").Or(page.Locator("body")).First.TextContentAsync() ?? "";
            var wordCount = CountWords(mainContent);
            if (wordCount >= 500)
                strengths.Add("Good word count");

            // Check for images with alt text
            var imagesWithAltCount = await page.Locator("img[alt]").CountAsync();
            if (imagesWithAltCount > 0)
                strengths.Add("Images have alt text");

            // Check for internal links
            var internalLinkCount = await page.Locator("a[href]").EvaluateAllAsync<int>("elements => elements.filter(link => link.href?.startsWith('" + _baseUri?.AbsoluteUri + "')).length");
            if (internalLinkCount > 0)
                strengths.Add("Good internal linking");

            // Check for proper heading structure
            if (await CheckHeadingStructure(page))
                strengths.Add("Proper heading structure");

            return strengths;
        }

        /// <inheritdoc/>
        public async Task<HeadResponseDto> GetHeadResponse(string url)
        {
            var result = new HeadResponseDto();

            try
            {
                using var httpClient = _httpClientFactory.CreateClient(Constants.HttpClientName);
                var request = new HttpRequestMessage(HttpMethod.Head, url);
                var response = await httpClient.SendAsync(request);

                result.StatusCode = (int)response.StatusCode;

                if (response.IsSuccessStatusCode)
                {
                    result.ContentType = response.Content.Headers.ContentType?.MediaType;
                    result.ContentLength = response.Content.Headers.ContentLength.GetValueOrDefault();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error performing HEAD request for {0}", url);
                result.StatusCode = 0;
            }

            return result;
        }

        /// <inheritdoc/>
        public async Task<PageChangeCheckResult> CheckPageChangedAsync(string url, PageFingerprintDto? previousFingerprint)
        {
            if (previousFingerprint == null)
            {
                return new PageChangeCheckResult(true, null, null);
            }

            try
            {
                using var httpClient = _httpClientFactory.CreateClient(Constants.HttpClientName);
                var request = new HttpRequestMessage(HttpMethod.Head, url);

                if (!string.IsNullOrEmpty(previousFingerprint.ETag))
                {
                    request.Headers.IfNoneMatch.Add(new System.Net.Http.Headers.EntityTagHeaderValue($"\"{previousFingerprint.ETag}\"", true));
                }

                if (previousFingerprint.LastModified.HasValue)
                {
                    request.Headers.IfModifiedSince = previousFingerprint.LastModified.Value;
                }

                var response = await httpClient.SendAsync(request);

                if (response.StatusCode == HttpStatusCode.NotModified)
                {
                    _logger.LogDebug("Page {Url} not modified (304 response)", url);
                    return new PageChangeCheckResult(false, previousFingerprint.ETag, previousFingerprint.LastModified, previousFingerprint.ContentHash);
                }

                var newETag = response.Headers.ETag?.Tag?.Trim('"');
                var newLastModified = response.Content.Headers.LastModified?.DateTime;

                if (!string.IsNullOrEmpty(previousFingerprint.ETag) && !string.IsNullOrEmpty(newETag))
                {
                    if (previousFingerprint.ETag == newETag)
                    {
                        _logger.LogDebug("Page {Url} not modified (same ETag)", url);
                        return new PageChangeCheckResult(false, newETag, newLastModified, previousFingerprint.ContentHash);
                    }
                }

                if (previousFingerprint.LastModified.HasValue && newLastModified.HasValue)
                {
                    if (newLastModified <= previousFingerprint.LastModified)
                    {
                        _logger.LogDebug("Page {Url} not modified (same or older LastModified)", url);
                        return new PageChangeCheckResult(false, newETag, newLastModified, previousFingerprint.ContentHash);
                    }
                }

                // Fallback: if no reliable HTTP headers, use content hash comparison
                if (string.IsNullOrEmpty(newETag) && !newLastModified.HasValue && !string.IsNullOrEmpty(previousFingerprint.ContentHash))
                {
                    _logger.LogDebug("No HTTP caching headers for {Url}, falling back to content hash comparison", url);
                    return await CheckPageChangedByContentHashAsync(url, previousFingerprint.ContentHash);
                }

                _logger.LogDebug("Page {Url} has changed", url);
                return new PageChangeCheckResult(true, newETag, newLastModified);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Error checking if page changed for {Url}, assuming changed", url);
                return new PageChangeCheckResult(true, null, null);
            }
        }

        private async Task<PageChangeCheckResult> CheckPageChangedByContentHashAsync(string url, string previousContentHash)
        {
            try
            {
                using var httpClient = _httpClientFactory.CreateClient(Constants.HttpClientName);
                var response = await httpClient.GetAsync(url);

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogDebug("Failed to fetch {Url} for content hash comparison, assuming changed", url);
                    return new PageChangeCheckResult(true, null, null);
                }

                var content = await response.Content.ReadAsStringAsync();
                var newContentHash = ComputeContentHash(content);

                if (newContentHash == previousContentHash)
                {
                    _logger.LogDebug("Page {Url} not modified (same content hash)", url);
                    return new PageChangeCheckResult(false, null, null, newContentHash);
                }

                _logger.LogDebug("Page {Url} has changed (different content hash)", url);
                return new PageChangeCheckResult(true, null, null, newContentHash);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Error checking content hash for {Url}, assuming changed", url);
                return new PageChangeCheckResult(true, null, null);
            }
        }

        private async Task<string?> GetRawContentHashAsync(string url)
        {
            try
            {
                using var httpClient = _httpClientFactory.CreateClient(Constants.HttpClientName);
                var content = await httpClient.GetStringAsync(url);
                return ComputeContentHash(content);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to fetch raw content for hash computation: {Url}", url);
                return null;
            }
        }

        private async Task<PageAnalysisDto?> GetPageAnalysisFallbackAsync(string url, Guid nodeKey)
        {
            _logger.LogInformation("Using HttpClient fallback for page analysis: {Url}", url);

            try
            {
                using var httpClient = _httpClientFactory.CreateClient(Constants.HttpClientName);

                if (_settings.PageTimeoutMs > 0)
                {
                    httpClient.Timeout = TimeSpan.FromMilliseconds(_settings.PageTimeoutMs);
                }

                var response = await httpClient.GetAsync(url);

                var pageAnalysis = new PageAnalysisDto
                {
                    Unique = nodeKey,
                    EntityType = "document"
                };

                pageAnalysis.PageData = new PageDto
                {
                    Url = url,
                    StatusCode = (int)response.StatusCode,
                    Unique = nodeKey
                };

                if (!response.IsSuccessStatusCode)
                {
                    return pageAnalysis;
                }

                var contentType = response.Content.Headers.ContentType?.MediaType ?? "";
                if (!contentType.Contains("text/html"))
                {
                    pageAnalysis.TechnicalSeoData = new TechnicalSeoDto
                    {
                        Url = url,
                        ContentType = contentType
                    };
                    return pageAnalysis;
                }

                var html = await response.Content.ReadAsStringAsync();

                // Parse basic SEO data using regex
                pageAnalysis.SeoData = new SeoDto
                {
                    Url = url,
                    Title = ExtractHtmlValue(html, @"<title[^>]*>([^<]*)</title>"),
                    MetaDescription = ExtractMetaContent(html, "description"),
                    H1 = ExtractHtmlValue(html, @"<h1[^>]*>([^<]*)</h1>"),
                    CanonicalUrl = ExtractLinkHref(html, "canonical"),
                    HasNoIndex = html.Contains("noindex", StringComparison.OrdinalIgnoreCase),
                    HasNoFollow = html.Contains("nofollow", StringComparison.OrdinalIgnoreCase),
                    OpenGraphTitle = ExtractMetaContent(html, "og:title", "property"),
                    OpenGraphDescription = ExtractMetaContent(html, "og:description", "property"),
                    OpenGraphImage = ExtractMetaContent(html, "og:image", "property")
                };

                // Extract links
                pageAnalysis.Links = ExtractLinks(html, url);

                // Extract images
                pageAnalysis.Images = ExtractImages(html, url, nodeKey);

                // Technical SEO data
                var eTag = response.Headers.ETag?.Tag?.Trim('"');
                var lastModified = response.Content.Headers.LastModified?.DateTime;

                pageAnalysis.TechnicalSeoData = new TechnicalSeoDto
                {
                    Url = url,
                    ContentType = contentType,
                    HasGzipCompression = response.Content.Headers.ContentEncoding.Contains("gzip"),
                    HasBrowserCaching = response.Headers.CacheControl?.MaxAge != null,
                    HasHttps = url.StartsWith("https://", StringComparison.OrdinalIgnoreCase)
                };

                pageAnalysis.ETag = eTag;
                pageAnalysis.LastModified = lastModified;
                pageAnalysis.ContentHash = ComputeContentHash(html);

                _logger.LogInformation("HttpClient fallback completed for {Url}", url);
                return pageAnalysis;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "HttpClient fallback failed for {Url}", url);
                return new PageAnalysisDto
                {
                    Unique = nodeKey,
                    EntityType = "document",
                    PageData = new PageDto { Url = url, StatusCode = 0, Unique = nodeKey }
                };
            }
        }

        private static string ExtractHtmlValue(string html, string pattern)
        {
            var match = Regex.Match(html, pattern, RegexOptions.IgnoreCase | RegexOptions.Singleline);
            return match.Success ? match.Groups[1].Value.Trim() : "";
        }

        private static string ExtractMetaContent(string html, string name, string attribute = "name")
        {
            var pattern = $@"<meta\s+{attribute}=""{Regex.Escape(name)}""[^>]*content=""([^""]*)""";
            var match = Regex.Match(html, pattern, RegexOptions.IgnoreCase);
            if (match.Success) return match.Groups[1].Value;

            // Try reverse order (content before name)
            pattern = $@"<meta\s+content=""([^""]*)""[^>]*{attribute}=""{Regex.Escape(name)}""";
            match = Regex.Match(html, pattern, RegexOptions.IgnoreCase);
            return match.Success ? match.Groups[1].Value : "";
        }

        private static string ExtractLinkHref(string html, string rel)
        {
            var pattern = $@"<link\s+rel=""{Regex.Escape(rel)}""[^>]*href=""([^""]*)""";
            var match = Regex.Match(html, pattern, RegexOptions.IgnoreCase);
            if (match.Success) return match.Groups[1].Value;

            // Try reverse order
            pattern = $@"<link\s+href=""([^""]*)""[^>]*rel=""{Regex.Escape(rel)}""";
            match = Regex.Match(html, pattern, RegexOptions.IgnoreCase);
            return match.Success ? match.Groups[1].Value : "";
        }

        private List<LinkDto> ExtractLinks(string html, string pageUrl)
        {
            var links = new List<LinkDto>();
            var matches = Regex.Matches(html, @"<a\s+[^>]*href=""([^""]*)""", RegexOptions.IgnoreCase);

            foreach (Match match in matches)
            {
                var href = match.Groups[1].Value;
                if (string.IsNullOrEmpty(href) || href.StartsWith("mailto:") || href.StartsWith("javascript:"))
                    continue;

                links.Add(new LinkDto
                {
                    Url = href,
                    FoundPage = pageUrl,
                    IsExternal = IsExternalUrl(href)
                });
            }

            return links;
        }

        private List<ImageDto> ExtractImages(string html, string pageUrl, Guid nodeKey)
        {
            var images = new List<ImageDto>();
            var matches = Regex.Matches(html, @"<img\s+[^>]*src=""([^""]*)""[^>]*(alt=""([^""]*)"")?", RegexOptions.IgnoreCase);

            foreach (Match match in matches)
            {
                var src = match.Groups[1].Value;
                var alt = match.Groups.Count > 3 ? match.Groups[3].Value : "";

                images.Add(new ImageDto(new ResourceDto
                {
                    Url = src,
                    FoundPage = pageUrl,
                    Unique = nodeKey,
                    IsExternal = IsExternalUrl(src)
                })
                {
                    AltText = alt
                });
            }

            return images;
        }

        /// <inheritdoc/>
        public string ComputeContentHash(string content)
        {
            if (string.IsNullOrEmpty(content))
                return string.Empty;

            var normalizedContent = NormalizeHtmlForHashing(content);
            var bytes = Encoding.UTF8.GetBytes(normalizedContent);
            var hash = SHA256.HashData(bytes);
            return Convert.ToHexString(hash).ToLowerInvariant();
        }

        private static string NormalizeHtmlForHashing(string html)
        {
            // Remove HTML comments
            html = Regex.Replace(html, @"<!--.*?-->", string.Empty, RegexOptions.Singleline);

            // Remove anti-forgery/CSRF tokens (ASP.NET, Umbraco)
            html = Regex.Replace(html, @"<input[^>]*name=""__RequestVerificationToken""[^>]*>", string.Empty, RegexOptions.IgnoreCase);
            html = Regex.Replace(html, @"<input[^>]*name=""ufprt""[^>]*>", string.Empty, RegexOptions.IgnoreCase);

            // Remove CSP nonces
            html = Regex.Replace(html, @"\s*nonce=""[^""]*""", string.Empty, RegexOptions.IgnoreCase);

            // Remove cache-busting query strings on assets
            html = Regex.Replace(html, @"(\.(js|css|png|jpg|jpeg|gif|svg|webp|woff2?|ttf|eot))\?[^""'\s>]*", "$1", RegexOptions.IgnoreCase);

            // Remove data-* attributes that might contain dynamic values
            html = Regex.Replace(html, @"\s*data-token=""[^""]*""", string.Empty, RegexOptions.IgnoreCase);
            html = Regex.Replace(html, @"\s*data-session[^=]*=""[^""]*""", string.Empty, RegexOptions.IgnoreCase);
            html = Regex.Replace(html, @"\s*data-nonce=""[^""]*""", string.Empty, RegexOptions.IgnoreCase);

            // Normalize whitespace
            html = Regex.Replace(html, @"\s+", " ");
            html = Regex.Replace(html, @">\s+<", "><");
            html = html.Trim();

            return html;
        }
    }
}

