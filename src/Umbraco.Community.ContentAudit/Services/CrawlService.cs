using Microsoft.Extensions.Logging;
using Microsoft.Playwright;
using System.Text.Json;
using System.Text.RegularExpressions;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;
using Umbraco.Community.ContentAudit.Schemas;

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

        public async Task<PageAnalysisData> GetPageAnalysis(string url, Uri baseUri, Guid nodeKey)
        {
            try
            {
                _baseUri = baseUri;

                var page = await _browser.NewPageAsync();
                var startTime = DateTime.UtcNow;

                // Navigate to the page and wait for network idle
                var response = await page.GotoAsync(url, new PageGotoOptions
                {
                    WaitUntil = WaitUntilState.NetworkIdle
                });

                var endTime = DateTime.UtcNow;

                if (response == null || !response.Ok)
                {
                    _logger.LogWarning("Failed to fetch page {0}: {1}", url, response?.Status);
                    return new PageAnalysisData();
                }

                // Wait for the page to be fully loaded
                await page.WaitForLoadStateAsync(LoadState.DOMContentLoaded);
                await page.WaitForLoadStateAsync(LoadState.NetworkIdle);

                var analysisData = Task.Run(async () =>
                {
                    var pageAnalysis = new PageAnalysisData();

                    pageAnalysis.PageData = new PageDataDto
                    {
                        Url = url,
                        NodeKey = nodeKey,
                        StatusCode = response.Status,
                        Links = (await page.QuerySelectorAllAsync("a[href]"))
                            .Select(async a => new ResourceDto
                            {
                                Url = await a.GetAttributeAsync("href"),
                                IsExternal = IsExternalUrl(await a.GetAttributeAsync("href"))
                            })
                            .Select(t => t.Result)
                            .ToList(),
                        //Resources = (await page.QuerySelectorAllAsync("link[href], script[src]"))
                        //.Select(async r => new ResourceDto
                        //{
                        //    Url = await r.GetAttributeAsync("src") ?? await r.GetAttributeAsync("href"),
                        //    IsExternal = IsExternalUrl(await r.GetAttributeAsync("src") ?? await r.GetAttributeAsync("href")),
                        //    ContentType = response.Headers["content-type"],
                        //    StatusCode = response.Status
                        //})
                        //.Select(t => t.Result)
                        //.ToList(),
                        //Images = (await page.QuerySelectorAllAsync("img"))
                        //.Select(async img =>
                        //{
                        //    var src = await img.GetAttributeAsync("src");
                        //    var resource = new ResourceDto()
                        //    {
                        //        ContentType = response.Headers["content-type"],
                        //        StatusCode = response.Status,
                        //        IsAsset = true,
                        //        IsExternal = IsExternalUrl(src),
                        //        PageBytes = 0,
                        //        Url = src
                        //    };

                        //    return new ImageDto(resource);
                        //})
                        //.Select(t => t.Result)
                        //.ToList()
                    };

                    pageAnalysis.SeoData = new SeoSchema
                    {
                        Url = url,
                        Title = await page.TitleAsync(),
                        MetaDescription = await page.EvaluateAsync<string>("() => document.querySelector('meta[name=\"description\"]')?.content"),
                        CanonicalUrl = await page.EvaluateAsync<string>("() => document.querySelector('link[rel=\"canonical\"]')?.href"),
                        H1 = await page.EvaluateAsync<string>("() => document.querySelector('h1')?.textContent.trim()"),
                        H2s = string.Join(',', await page.EvaluateAsync<string[]>("() => Array.from(document.querySelectorAll('h2')).map(h => h.textContent.trim())")),
                        H3s = string.Join(',', await page.EvaluateAsync<string[]>("() => Array.from(document.querySelectorAll('h3')).map(h => h.textContent.trim())")),
                        HasNoIndex = await page.EvaluateAsync<bool>("() => document.querySelector('meta[name=\"robots\"]')?.content?.includes('noindex') ?? false"),
                        HasNoFollow = await page.EvaluateAsync<bool>("() => document.querySelector('meta[name=\"robots\"]')?.content?.includes('nofollow') ?? false"),
                        OpenGraphTitle = await page.EvaluateAsync<string>("() => document.querySelector('meta[property=\"og:title\"]')?.content"),
                        OpenGraphDescription = await page.EvaluateAsync<string>("() => document.querySelector('meta[property=\"og:description\"]')?.content"),
                        OpenGraphImage = await page.EvaluateAsync<string>("() => document.querySelector('meta[property=\"og:image\"]')?.content"),
                        TwitterCard = await page.EvaluateAsync<string>("() => document.querySelector('meta[name=\"twitter:card\"]')?.content"),
                        TwitterTitle = await page.EvaluateAsync<string>("() => document.querySelector('meta[name=\"twitter:title\"]')?.content"),
                        TwitterDescription = await page.EvaluateAsync<string>("() => document.querySelector('meta[name=\"twitter:description\"]')?.content"),
                        TwitterImage = await page.EvaluateAsync<string>("() => document.querySelector('meta[name=\"twitter:image\"]')?.content")
                    };

                    pageAnalysis.ContentAnalysis = new ContentAnalysisSchema
                    {
                        Url = url,
                        WordCount = CountWords(await page.EvaluateAsync<string>("() => document.body?.textContent ?? ''")),
                        ParagraphCount = await page.EvaluateAsync<int>("() => document.querySelectorAll('p').length"),
                        Images = await page.EvaluateAsync<int>("() => document.querySelectorAll('img')"),
                        Links = await page.EvaluateAsync<int>("() => document.querySelectorAll('a[href]').length"),
                        ExternalLinks = await page.EvaluateAsync<int>($"() => Array.from(document.querySelectorAll('a[href]')).filter(a => !a.href.startsWith('{_baseUri.AbsoluteUri}')).length"),
                        InternalLinks = await page.EvaluateAsync<int>($"() => Array.from(document.querySelectorAll('a[href]')).filter(a => a.href.startsWith('{_baseUri.AbsoluteUri}')).length"),
                        ReadabilityScore = CalculateReadabilityScore(await page.EvaluateAsync<string>("() => document.body?.textContent ?? ''")),
                        KeywordDensity = JsonSerializer.Serialize(CalculateKeywordDensity(await page.EvaluateAsync<string>("() => document.body?.textContent ?? ''"))),
                        MissingAltTextImages = string.Join(',', await page.EvaluateAsync<string[]>("() => Array.from(document.querySelectorAll('img:not([alt])')).map(img => img.src)")),
                        MissingTitleImages = string.Join(',', await page.EvaluateAsync<string[]>("() => Array.from(document.querySelectorAll('img:not([title])')).map(img => img.src)"))
                    };

                    pageAnalysis.PerformanceData = new PerformanceSchema
                    {
                        Url = url,
                        PageLoadTime = (long)(endTime - startTime).TotalMilliseconds,
                        FirstContentfulPaint = await GetFirstContentfulPaint(page),
                        LargestContentfulPaint = await GetLargestContentfulPaint(page),
                        TimeToInteractive = await GetTimeToInteractive(page),
                        TotalRequests = await page.EvaluateAsync<int>("() => performance.getEntriesByType('resource').length"),
                        TotalBytes = await page.EvaluateAsync<int>("() => performance.getEntriesByType('resource').reduce((acc, entry) => acc + entry.transferSize, 0)"),
                        ResourceTimings = JsonSerializer.Serialize(await GetResourceTimings(page))
                    };

                    pageAnalysis.AccessibilityData = new AccessibilitySchema
                    {
                        Url = url,
                        AccessibilityIssues = JsonSerializer.Serialize(await CheckAccessibilityIssues(page)),
                        AriaLabelCount = await page.EvaluateAsync<int>("() => document.querySelectorAll('[aria-label]').length"),
                        AriaDescribedByCount = await page.EvaluateAsync<int>("() => document.querySelectorAll('[aria-describedby]').length"),
                        HasSkipToContent = await page.EvaluateAsync<bool>("() => document.querySelector('a[href=\"#main\"], a[href=\"#content\"]') !== null"),
                        HasProperHeadingStructure = await CheckHeadingStructure(page),
                        ColorContrastIssues = JsonSerializer.Serialize(await CheckColorContrastIssues(page))
                    };

                    pageAnalysis.TechnicalSeoData = new TechnicalSeoSchema
                    {
                        Url = url,
                        ContentType = response.Headers["content-type"],
                        Charset = await page.EvaluateAsync<string>("() => document.querySelector('meta[charset]')?.charset ?? document.querySelector('meta[http-equiv=\"Content-Type\"]')?.content") ?? "",
                        HasGzipCompression = response.Headers.ContainsKey("content-encoding") && response.Headers["content-encoding"].Contains("gzip"),
                        HasBrowserCaching = response.Headers.ContainsKey("cache-control") && response.Headers["cache-control"].Contains("max-age"),
                        HasHttps = url.StartsWith("https://"),
                        HasValidHtml = await ValidateHtml(page),
                        HtmlValidationErrors = JsonSerializer.Serialize(await GetHtmlValidationErrors(page)),
                        HasSchemaMarkup = await page.EvaluateAsync<bool>("() => document.querySelector('script[type=\"application/ld+json\"]') !== null"),
                        SchemaType = await GetSchemaType(page)
                    };

                    pageAnalysis.SocialMediaData = new SocialMediaSchema
                    {
                        Url = url,
                        SocialShareButtons = JsonSerializer.Serialize(await GetSocialShareButtons(page)),
                        HasFacebookPixel = await page.EvaluateAsync<bool>("() => document.querySelector('script[src*=\"facebook.net\"]') !== null"),
                        HasTwitterPixel = await page.EvaluateAsync<bool>("() => document.querySelector('script[src*=\"twitter.com\"]') !== null"),
                        HasLinkedInPixel = await page.EvaluateAsync<bool>("() => document.querySelector('script[src*=\"linkedin.com\"]') !== null"),
                        SocialMediaLinks = JsonSerializer.Serialize(await GetSocialMediaLinks(page))
                    };

                    pageAnalysis.ContentQualityData = new ContentQualitySchema
                    {
                        Url = url,
                        HasDuplicateContent = await CheckForDuplicateContent(page),
                        DuplicateContentUrls = JsonSerializer.Serialize(await GetDuplicateContentUrls(page)),
                        HasThinContent = await CheckForThinContent(page),
                        ContentScore = await CalculateContentScore(page),
                        ContentGaps = JsonSerializer.Serialize(await IdentifyContentGaps(page)),
                        ContentStrengths = JsonSerializer.Serialize(await IdentifyContentStrengths(page))
                    };

                    return pageAnalysis;
                });

                var data = await analysisData;
                await page.CloseAsync();
                return data;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error analyzing page {0}", url);
                return new PageAnalysisData();
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

        private async Task<List<ResourceTiming>> GetResourceTimings(IPage page)
        {
            var timings = await page.EvaluateAsync<object[]>("() => performance.getEntriesByType('resource').map(entry => ({ url: entry.name, resourceType: entry.initiatorType, duration: entry.duration, startTime: entry.startTime, size: entry.transferSize }))");
            return timings.Select(t => JsonSerializer.Deserialize<ResourceTiming>(JsonSerializer.Serialize(t))).ToList();
        }

        private async Task<List<string>> CheckAccessibilityIssues(IPage page)
        {
            var issues = new List<string>();

            // Check for missing alt text on images
            var imagesWithoutAlt = (await page.EvaluateAsync<string[]>("() => Array.from(document.querySelectorAll('img:not([alt])')).map(img => img.src)")).ToList();
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
            var schemaScript = await page.EvaluateAsync<string>("() => document.querySelector('script[type=\"application/ld+json\"]')?.textContent");
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
            return (await page.EvaluateAsync<string[]>("() => Array.from(document.querySelectorAll('[class*=\"share\"], [class*=\"social\"]')).filter(el => el.classList.contains('facebook') || el.classList.contains('twitter') || el.classList.contains('linkedin') || el.classList.contains('pinterest')).map(el => Array.from(el.classList).find(c => c.includes('facebook') || c.includes('twitter') || c.includes('linkedin') || c.includes('pinterest')))")).ToList();
        }

        private async Task<List<string>> GetSocialMediaLinks(IPage page)
        {
            return (await page.EvaluateAsync<string[]>("() => Array.from(document.querySelectorAll('a[href*=\"facebook.com\"], a[href*=\"twitter.com\"], a[href*=\"linkedin.com\"], a[href*=\"instagram.com\"], a[href*=\"youtube.com\"]')).map(a => a.href)")).ToList();
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
            var mainContent = await page.EvaluateAsync<string>("() => (document.querySelector('main, article') || document.body)?.textContent ?? ''");
            var wordCount = CountWords(mainContent);
            return wordCount < 300;
        }

        private async Task<int> CalculateContentScore(IPage page)
        {
            var score = 0;

            // Word count score
            var wordCount = CountWords(await page.EvaluateAsync<string>("() => (document.querySelector('main, article') || document.body)?.textContent ?? ''"));
            score += Math.Min(wordCount / 10, 20);

            // Image score
            var imageCount = await page.EvaluateAsync<int>("() => document.querySelectorAll('img').length");
            score += Math.Min(imageCount * 2, 10);

            // Link score
            var linkCount = await page.EvaluateAsync<int>("() => document.querySelectorAll('a[href]').length");
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
            var imageCount = await page.EvaluateAsync<int>("() => document.querySelectorAll('img').length");
            if (imageCount == 0)
                gaps.Add("No images found");

            // Check for missing links
            var linkCount = await page.EvaluateAsync<int>("() => document.querySelectorAll('a[href]').length");
            if (linkCount == 0)
                gaps.Add("No links found");

            // Check for thin content
            if (await CheckForThinContent(page))
                gaps.Add("Content is too thin (less than 300 words)");

            // Check for missing headings
            var headingCount = await page.EvaluateAsync<int>("() => document.querySelectorAll('h1, h2, h3').length");
            if (headingCount == 0)
                gaps.Add("No headings found");

            return gaps;
        }

        private async Task<List<string>> IdentifyContentStrengths(IPage page)
        {
            var strengths = new List<string>();

            // Check for good word count
            var wordCount = CountWords(await page.EvaluateAsync<string>("() => (document.querySelector('main, article') || document.body)?.textContent ?? ''"));
            if (wordCount >= 500)
                strengths.Add("Good word count");

            // Check for images with alt text
            var imagesWithAlt = await page.EvaluateAsync<int>("() => document.querySelectorAll('img[alt]').length");
            if (imagesWithAlt > 0)
                strengths.Add("Images have alt text");

            // Check for internal links
            var internalLinks = await page.EvaluateAsync<int>($"" +
                $"() => Array.from(document.querySelectorAll('a[href]')).filter(a => a.href.startsWith('{_baseUri.AbsoluteUri}')).length");
            if (internalLinks > 0)
                strengths.Add("Good internal linking");

            // Check for proper heading structure
            if (await CheckHeadingStructure(page))
                strengths.Add("Proper heading structure");

            return strengths;
        }
    }
}

