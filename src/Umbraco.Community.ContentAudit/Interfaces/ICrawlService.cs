using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    /// <summary>
    /// Service for crawling and analyzing web pages
    /// </summary>
    public interface ICrawlService
    {
        /// <summary>
        /// Analyzes a web page using Playwright and returns full analysis data including Core Web Vitals.
        /// Used by the enrichment phase.
        /// </summary>
        /// <param name="url">The URL to analyze</param>
        /// <param name="baseUri">The base URI of the website</param>
        /// <param name="nodeKey">The unique identifier of the Umbraco node</param>
        /// <returns>Page analysis data or null if analysis fails</returns>
        Task<PageAnalysisDto?> GetPageAnalysis(string url, Uri baseUri, Guid nodeKey);

        /// <summary>
        /// Analyzes a web page using HttpClient only (no Playwright). Fast and lightweight —
        /// collects SEO data, links, images, and technical headers but not Core Web Vitals.
        /// Used by the crawl phase.
        /// </summary>
        /// <param name="url">The URL to analyze</param>
        /// <param name="baseUri">The base URI of the website</param>
        /// <param name="nodeKey">The unique identifier of the Umbraco node</param>
        /// <returns>Page analysis data or null if analysis fails</returns>
        Task<PageAnalysisDto?> GetPageAnalysisLightweightAsync(string url, Uri baseUri, Guid nodeKey);

        /// <summary>
        /// Performs a HEAD request to retrieve response headers for a URL
        /// </summary>
        /// <param name="url">The URL to check</param>
        /// <returns>HEAD response data</returns>
        Task<HeadResponseDto> GetHeadResponse(string url);

        /// <summary>
        /// Checks if a page has been modified since the last crawl using conditional requests
        /// </summary>
        /// <param name="url">The URL to check</param>
        /// <param name="previousFingerprint">The previous fingerprint data</param>
        /// <returns>Result indicating if page changed, with new ETag/LastModified if available</returns>
        Task<PageChangeCheckResult> CheckPageChangedAsync(string url, PageFingerprintDto? previousFingerprint);

        /// <summary>
        /// Computes a content hash for a given HTML content
        /// </summary>
        /// <param name="content">The HTML content</param>
        /// <returns>SHA256 hash as hex string</returns>
        string ComputeContentHash(string content);
    }

    /// <summary>
    /// Result of checking if a page has changed
    /// </summary>
    /// <param name="HasChanged">Whether the page content has changed</param>
    /// <param name="NewETag">The new ETag value if available</param>
    /// <param name="NewLastModified">The new Last-Modified date if available</param>
    /// <param name="NewContentHash">The new content hash if computed during fallback check</param>
    public record PageChangeCheckResult(
        bool HasChanged,
        string? NewETag,
        DateTime? NewLastModified,
        string? NewContentHash = null);
}
