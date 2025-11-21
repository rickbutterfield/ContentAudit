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
        /// Analyzes a web page and returns detailed analysis data
        /// </summary>
        /// <param name="url">The URL to analyze</param>
        /// <param name="baseUri">The base URI of the website</param>
        /// <param name="nodeKey">The unique identifier of the Umbraco node</param>
        /// <returns>Page analysis data or null if analysis fails</returns>
        Task<PageAnalysisDto?> GetPageAnalysis(string url, Uri baseUri, Guid nodeKey);

        /// <summary>
        /// Performs a HEAD request to retrieve response headers for a URL
        /// </summary>
        /// <param name="url">The URL to check</param>
        /// <returns>HEAD response data</returns>
        Task<HeadResponseDto> GetHeadResponse(string url);
    }
}
