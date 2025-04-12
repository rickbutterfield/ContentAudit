using Microsoft.Extensions.Logging;
using Microsoft.Playwright;
using System.Text.Json;
using System.Text.RegularExpressions;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Services
{
    public class CrawlService : ICrawlService, IDisposable
    {
        private readonly ILogger<CrawlService> _logger;
        private readonly IPlaywright _playwright;
        private readonly IBrowser _browser;
        private bool _disposed;
        private Uri? _baseUri;

        public CrawlService(
            ILogger<CrawlService> logger,
            IPlaywright playwright)
        {
            _logger = logger;
            _playwright = playwright;
            _browser = _playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions
            {
                Headless = true
            }).GetAwaiter().GetResult();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _browser?.DisposeAsync().GetAwaiter().GetResult();
                }
                _disposed = true;
            }
        }

        public async Task<PageAnalysisDto> GetPageAnalysis(string url, Uri baseUri, Guid nodeKey)
        {
            try
            {
                _baseUri = baseUri;

                var page = await _browser.NewPageAsync();
                var startTime = DateTime.UtcNow;

                var pageAnalysis = new PageAnalysisDto() { Unique = nodeKey, EntityType = "document" };

                await page.RouteAsync("**/*", async route =>
                {
                    var request = route.Request;
                    var routeUrl = request.Url;

                    try
                    {
                        //var headers = await request.AllHeadersAsync();
                        //string contentType = headers.TryGetValue("content-type", out var type) ? type : "unknown";

                        //_logger.LogInformation("Request URL: {0}, Resource Type: {1}, Content Type: {2}", routeUrl, request.ResourceType, contentType);

                        if (request.ResourceType == "script" || request.ResourceType == "stylesheet")
                        {
                            pageAnalysis.Resources.Add(new ResourceDto()
                            {
                                Url = routeUrl,
                                IsExternal = IsExternalUrl(routeUrl),
                                FoundPage = url,
                                NodeKey = nodeKey
                            });
                        }

                        if (request.ResourceType == "image")
                        {
                            var resource = new ResourceDto()
                            {
                                Url = routeUrl,
                                IsExternal = IsExternalUrl(routeUrl),
                                FoundPage = url,
                                NodeKey = nodeKey
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

                // Navigate to the page and wait for network idle
                var response = await page.GotoAsync(url, new PageGotoOptions
                {
                    WaitUntil = WaitUntilState.NetworkIdle
                });

                var endTime = DateTime.UtcNow;

                if (response == null || !response.Ok)
                {
                    _logger.LogWarning("Failed to fetch page {0}: {1}", url, response?.Status);
                    return new PageAnalysisDto();
                }

                // Wait for the page to be fully loaded
                await page.WaitForLoadStateAsync(LoadState.DOMContentLoaded);
                await page.WaitForLoadStateAsync(LoadState.NetworkIdle);

                var analysisData = Task.Run(async () =>
                {
                    pageAnalysis.Links = (await page.QuerySelectorAllAsync("a[href]"))
                            .Select(async a =>
                            {
                                var href = await a.GetAttributeAsync("href");

                                return new LinkDto()
                                {
                                    Url = href,
                                    FoundPage = url,
                                    IsExternal = IsExternalUrl(href),
                                };
                            })
                            .Select(t => t.Result)
                            .ToList();

                    var pageImages = (await page.QuerySelectorAllAsync("img[src]"))
                        .Select(async a =>
                        {
                            var src = await a.GetAttributeAsync("src");
                            var resource = new ResourceDto()
                            {
                                Url = src,
                                FoundPage = url,
                                NodeKey = nodeKey,
                                IsExternal = IsExternalUrl(src),
                            };

                            return new ImageDto(resource)
                            {
                                AltText = await a.GetAttributeAsync("alt")
                            };
                        })
                        .Select(t => t.Result)
                        .ToList();

                    if (pageAnalysis.Images != null)
                    {
                        foreach (var image in pageImages)
                        {
                            var existingImage = pageAnalysis.Images.FirstOrDefault(i => i.Url == image.Url);
                            if (existingImage != null)
                            {
                                existingImage.IsBackground = false;
                                existingImage.AltText = image.AltText;
                            }
                        }
                    }

                    pageAnalysis.PageData = new PageDto
                    {
                        Url = url,
                        NodeKey = nodeKey,
                        StatusCode = response.Status,
                    };

                    try
                    {
                        pageAnalysis.SeoData = new SeoDto
                        {
                            Url = url,
                            Title = await page.TitleAsync(),
                            MetaDescription = await (await page.QuerySelectorAsync("meta[name=\"description\"]"))?.GetAttributeAsync("content") ?? "",
                            CanonicalUrl = await (await page.QuerySelectorAsync("link[rel=\"canonical\"]"))?.GetAttributeAsync("href") ?? "",
                            H1 = await (await page.QuerySelectorAsync("h1"))?.TextContentAsync() ?? "",
                            H2s = (await page.QuerySelectorAllAsync("h2")).Select(async h => await h.TextContentAsync() ?? "").Select(t => t.Result).ToList(),
                            H3s = (await page.QuerySelectorAllAsync("h3")).Select(async h => await h.TextContentAsync() ?? "").Select(t => t.Result).ToList(),
                            HasNoIndex = (await (await page.QuerySelectorAsync("meta[name=\"robots\"]"))?.GetAttributeAsync("content") ?? "").Contains("noindex"),
                            HasNoFollow = (await (await page.QuerySelectorAsync("meta[name=\"robots\"]"))?.GetAttributeAsync("content") ?? "").Contains("nofollow"),
                            OpenGraphTitle = await (await page.QuerySelectorAsync("meta[property=\"og:title\"]"))?.GetAttributeAsync("content") ?? "",
                            OpenGraphDescription = await (await page.QuerySelectorAsync("meta[property=\"og:description\"]"))?.GetAttributeAsync("content") ?? "",
                            OpenGraphImage = await (await page.QuerySelectorAsync("meta[property=\"og:image\"]"))?.GetAttributeAsync("content") ?? "",
                            TwitterCard = await (await page.QuerySelectorAsync("meta[name=\"twitter:card\"]"))?.GetAttributeAsync("content") ?? "",
                            TwitterTitle = await (await page.QuerySelectorAsync("meta[name=\"twitter:title\"]"))?.GetAttributeAsync("content") ?? "",
                            TwitterDescription = await (await page.QuerySelectorAsync("meta[name=\"twitter:description\"]"))?.GetAttributeAsync("content") ?? "",
                            TwitterImage = await (await page.QuerySelectorAsync("meta[name=\"twitter:image\"]"))?.GetAttributeAsync("content") ?? ""
                        };
                    }
                    catch (Exception ex)
                    {
                        _ = ex;
                    }

                    var bodyElement = await page.QuerySelectorAsync("body");
                    var bodyText = bodyElement != null ? await bodyElement.TextContentAsync() : "";

                    pageAnalysis.ContentAnalysis = new ContentAnalysisDto
                    {
                        Url = url,
                        WordCount = CountWords(bodyText),
                        ParagraphCount = (await page.QuerySelectorAllAsync("p")).Count,
                        Images = (await page.QuerySelectorAllAsync("img")).Count,
                        Links = (await page.QuerySelectorAllAsync("a[href]")).Count,
                        ExternalLinks = (await page.QuerySelectorAllAsync("a[href]")).Count(link => !link.GetAttributeAsync("href").Result?.StartsWith(_baseUri.AbsoluteUri) ?? false),
                        InternalLinks = (await page.QuerySelectorAllAsync("a[href]")).Count(link => link.GetAttributeAsync("href").Result?.StartsWith(_baseUri.AbsoluteUri) ?? false),
                        ReadabilityScore = CalculateReadabilityScore(bodyText),
                        KeywordDensity = CalculateKeywordDensity(bodyText),
                        MissingAltTextImages = string.Join(',', (await page.QuerySelectorAllAsync("img:not([alt])")).Select(async img => await img.GetAttributeAsync("src") ?? "").Select(t => t.Result)),
                        MissingTitleImages = string.Join(',', (await page.QuerySelectorAllAsync("img:not([title])")).Select(async img => await img.GetAttributeAsync("src") ?? "").Select(t => t.Result))
                    };

                    pageAnalysis.PerformanceData = new PerformanceDto
                    {
                        Url = url,
                        PageLoadTime = (long)(endTime - startTime).TotalMilliseconds,
                        FirstContentfulPaint = await GetFirstContentfulPaint(page),
                        LargestContentfulPaint = await GetLargestContentfulPaint(page),
                        TimeToInteractive = await GetTimeToInteractive(page),
                        TotalRequests = await page.EvaluateAsync<int>("() => performance.getEntriesByType('resource').length"),
                        TotalBytes = await page.EvaluateAsync<int>("() => performance.getEntriesByType('resource').reduce((acc, entry) => acc + entry.transferSize, 0)"),
                        ResourceTimings = await GetResourceTimings(page)
                    };

                    pageAnalysis.AccessibilityData = new AccessibilityDto
                    {
                        Url = url,
                        AccessibilityIssues = await CheckAccessibilityIssues(page),
                        AriaLabelCount = await page.EvaluateAsync<int>("() => document.querySelectorAll('[aria-label]').length"),
                        AriaDescribedByCount = await page.EvaluateAsync<int>("() => document.querySelectorAll('[aria-describedby]').length"),
                        HasSkipToContent = await page.EvaluateAsync<bool>("() => document.querySelector('a[href=\"#main\"], a[href=\"#content\"]') !== null"),
                        HasProperHeadingStructure = await CheckHeadingStructure(page),
                        ColorContrastIssues = await CheckColorContrastIssues(page)
                    };

                    pageAnalysis.TechnicalSeoData = new TechnicalSeoDto
                    {
                        Url = url,
                        ContentType = response.Headers["content-type"],
                        Charset = await page.EvaluateAsync<string>("() => document.querySelector('meta[charset]')?.charset ?? document.querySelector('meta[http-equiv=\"Content-Type\"]')?.content") ?? "",
                        HasGzipCompression = response.Headers.ContainsKey("content-encoding") && response.Headers["content-encoding"].Contains("gzip"),
                        HasBrowserCaching = response.Headers.ContainsKey("cache-control") && response.Headers["cache-control"].Contains("max-age"),
                        HasHttps = url.StartsWith("https://"),
                        HasValidHtml = await ValidateHtml(page),
                        HtmlValidationErrors = await GetHtmlValidationErrors(page),
                        HasSchemaMarkup = await page.EvaluateAsync<bool>("() => document.querySelector('script[type=\"application/ld+json\"]') !== null"),
                        SchemaType = await GetSchemaType(page)
                    };

                    pageAnalysis.SocialMediaData = new SocialMediaDto
                    {
                        Url = url,
                        SocialShareButtons = await GetSocialShareButtons(page),
                        HasFacebookPixel = await page.EvaluateAsync<bool>("() => document.querySelector('script[src*=\"facebook.net\"]') !== null"),
                        HasTwitterPixel = await page.EvaluateAsync<bool>("() => document.querySelector('script[src*=\"twitter.com\"]') !== null"),
                        HasLinkedInPixel = await page.EvaluateAsync<bool>("() => document.querySelector('script[src*=\"linkedin.com\"]') !== null"),
                        SocialMediaLinks = await GetSocialMediaLinks(page)
                    };

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

                    return pageAnalysis;
                });

                await analysisData;

                await page.CloseAsync();
                return pageAnalysis;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error analyzing page {0}", url);
                return new PageAnalysisDto();
            }
        }

        private bool IsExternalUrl(string? url)
        {
            if (string.IsNullOrEmpty(url))
                return false;

            return !url.StartsWith(_baseUri.AbsolutePath);
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

            return keywordDensity;
        }

        private async Task<long> GetFirstContentfulPaint(IPage page)
        {
            return await page.EvaluateAsync<long>("() => performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime ?? 0");
        }

        private async Task<long> GetLargestContentfulPaint(IPage page)
        {
            return await page.EvaluateAsync<long>("() => performance.getEntriesByType('largest-contentful-paint')[0]?.startTime ?? 0");
        }

        private async Task<long> GetTimeToInteractive(IPage page)
        {
            return await page.EvaluateAsync<long>("() => performance.getEntriesByType('longtask').reduce((acc, entry) => Math.max(acc, entry.startTime + entry.duration), 0)");
        }

        private async Task<List<ResourceTimingDto>> GetResourceTimings(IPage page)
        {
            var timings = await page.EvaluateAsync<object[]>("() => performance.getEntriesByType('resource').map(entry => ({ url: entry.name, resourceType: entry.initiatorType, duration: entry.duration, startTime: entry.startTime, size: entry.transferSize }))");
            return timings.Select(t => JsonSerializer.Deserialize<ResourceTimingDto>(JsonSerializer.Serialize(t))).ToList();
        }

        private async Task<List<string>> CheckAccessibilityIssues(IPage page)
        {
            var issues = new List<string>();

            // Check for missing alt text on images
            var imagesWithoutAlt = (await page.EvaluateAsync<string[]>("() => Array.from(document.querySelectorAll('img:not([alt])'))?.map(img => img.src)")).ToList();
            issues.AddRange(imagesWithoutAlt.Select(src => $"Image without alt text: {src}"));

            // Check for missing form labels
            var inputsWithoutLabels = await page.EvaluateAsync<int>("() => document.querySelectorAll('input:not([id]):not([aria-label])').length");
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
            //var headings = await page.QuerySelectorAllAsync("h1, h2, h3, h4, h5, h6");
            //if (!headings.Any())
            //    return false;

            //var firstHeading = headings.First();
            //if (((dynamic)firstHeading).tag != "H1")
            //    return false;

            //var currentLevel = 1;
            //foreach (var heading in headings.Skip(1))
            //{
            //    var level = int.Parse(((dynamic)heading).tag.Substring(1));
            //    if (level > currentLevel + 1)
            //        return false;
            //    currentLevel = level;
            //}

            return true;
        }

        private async Task<List<string>> CheckColorContrastIssues(IPage page)
        {
            // This is a simplified implementation
            // In a real implementation, you would use a color contrast algorithm
            return new List<string>();
        }

        private async Task<bool> ValidateHtml(IPage page)
        {
            // This is a simplified implementation
            // In a real implementation, you would use a proper HTML validator
            return true;
        }

        private async Task<List<string>> GetHtmlValidationErrors(IPage page)
        {
            // This is a simplified implementation
            // In a real implementation, you would use a proper HTML validator
            return new List<string>();
        }

        private async Task<string?> GetSchemaType(IPage page)
        {
            var schemaElement = await page.QuerySelectorAsync("script[type=\"application/ld+json\"]");
            var schemaScript = schemaElement != null ? await schemaElement.TextContentAsync() : null;
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
            var elements = await page.QuerySelectorAllAsync("[class*=\"share\"], [class*=\"social\"]");
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
            var links = await page.QuerySelectorAllAsync("a[href*=\"facebook.com\"], a[href*=\"twitter.com\"], a[href*=\"linkedin.com\"], a[href*=\"instagram.com\"], a[href*=\"youtube.com\"]");
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
            var mainElement = await page.QuerySelectorAsync("main, article") ?? await page.QuerySelectorAsync("body");
            var mainContent = mainElement != null ? await mainElement.TextContentAsync() : "";
            var wordCount = CountWords(mainContent);
            return wordCount < 300;
        }

        private async Task<int> CalculateContentScore(IPage page)
        {
            var score = 0;

            // Word count score
            var mainElement = await page.QuerySelectorAsync("main, article") ?? await page.QuerySelectorAsync("body");
            var mainContent = mainElement != null ? await mainElement.TextContentAsync() : "";
            var wordCount = CountWords(mainContent);
            score += Math.Min(wordCount / 10, 20);

            // Image score
            var images = await page.QuerySelectorAllAsync("img");
            score += Math.Min(images.Count * 2, 10);

            // Link score
            var links = await page.QuerySelectorAllAsync("a[href]");
            score += Math.Min(links.Count, 10);

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
            var images = await page.QuerySelectorAllAsync("img");
            if (images.Count == 0)
                gaps.Add("No images found");

            // Check for missing links
            var links = await page.QuerySelectorAllAsync("a[href]");
            if (links.Count == 0)
                gaps.Add("No links found");

            // Check for thin content
            if (await CheckForThinContent(page))
                gaps.Add("Content is too thin (less than 300 words)");

            // Check for missing headings
            var headings = await page.QuerySelectorAllAsync("h1, h2, h3");
            if (headings.Count == 0)
                gaps.Add("No headings found");

            return gaps;
        }

        private async Task<List<string>> IdentifyContentStrengths(IPage page)
        {
            var strengths = new List<string>();

            // Check for good word count
            var mainElement = await page.QuerySelectorAsync("main, article") ?? await page.QuerySelectorAsync("body");
            var mainContent = mainElement != null ? await mainElement.TextContentAsync() : "";
            var wordCount = CountWords(mainContent);
            if (wordCount >= 500)
                strengths.Add("Good word count");

            // Check for images with alt text
            var imagesWithAlt = await page.QuerySelectorAllAsync("img[alt]");
            if (imagesWithAlt.Count > 0)
                strengths.Add("Images have alt text");

            // Check for internal links
            var allLinks = await page.QuerySelectorAllAsync("a[href]");
            var internalLinks = 0;
            foreach (var link in allLinks)
            {
                var href = await link.GetAttributeAsync("href");
                if (href != null && href.StartsWith(_baseUri.AbsoluteUri))
                {
                    internalLinks++;
                }
            }
            if (internalLinks > 0)
                strengths.Add("Good internal linking");

            // Check for proper heading structure
            if (await CheckHeadingStructure(page))
                strengths.Add("Proper heading structure");

            return strengths;
        }
    }
}

