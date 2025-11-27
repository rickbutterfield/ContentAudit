using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    /// <summary>
    /// Audit issue that identifies pages with canonical URLs pointing to different URLs.
    /// </summary>
    /// <remarks>
    /// This issue detects pages where the canonical URL meta tag points to a different URL than the page's actual URL.
    /// Canonical URLs are used to indicate the preferred version of a page when duplicate or similar content exists
    /// across multiple URLs. While this is not always a problem, it's important to review these cases to ensure
    /// they are intentional and properly configured.
    /// 
    /// Common scenarios include:
    /// - Parameter-based variations of pages
    /// - Mobile vs desktop versions
    /// - HTTP vs HTTPS variants
    /// - Pagination or filtered views
    /// 
    /// This is flagged as a high-priority warning to ensure SEO best practices are being followed.
    /// </remarks>
    /// <inheritdoc />
    public class CanonicalisedUrls : IAuditPageIssue
    {
        /// <summary>
        /// Gets the unique identifier for this audit issue.
        /// </summary>
        /// <inheritdoc />
        public Guid Id => new("cccb0159-f35f-45be-a32d-b2f7832eb242");

        /// <summary>
        /// Gets the display name of this audit issue.
        /// </summary>
        /// <inheritdoc />
        public string Name => "Canonicalised";

        /// <summary>
        /// Gets the description of this audit issue.
        /// </summary>
        /// <inheritdoc />
        public string Description => "Pages that have a canonical to a different URL";

        /// <summary>
        /// Gets the category this audit issue belongs to.
        /// </summary>
        /// <inheritdoc />
        public string Category => "Canonicals";

        /// <summary>
        /// Gets the issue type classification.
        /// </summary>
        /// <inheritdoc />
        public IssueType Type => IssueType.Warning;

        /// <summary>
        /// Gets the priority level of this audit issue.
        /// </summary>
        /// <inheritdoc />
        public IssuePriority Priority => IssuePriority.High;

        /// <summary>
        /// Gets the properties to expose in the UI for this audit issue.
        /// </summary>
        /// <inheritdoc />
        public IEnumerable<AuditIssueProperty>? ExposedProperties => default;

        /// <summary>
        /// Checks pages to identify those with canonical URLs pointing to different URLs.
        /// </summary>
        /// <param name="pages">The collection of pages to analyze.</param>
        /// <returns>A filtered collection of pages that have canonical URLs different from their actual URLs.</returns>
        /// <remarks>
        /// This method filters pages based on the following criteria:
        /// - Page returns a 200 (OK) status code
        /// - Page has SEO data available
        /// - Canonical URL is not null or empty
        /// - Canonical URL differs from the page's actual URL
        /// </remarks>
        /// <inheritdoc />
        public IEnumerable<PageAnalysisDto> CheckPages(IEnumerable<PageAnalysisDto> pages)
        {
            return pages.Where(x => x.PageData.StatusCode == 200 && x.SeoData != null && !string.IsNullOrEmpty(x.SeoData?.CanonicalUrl) && x.SeoData.CanonicalUrl != x.PageData.Url);
        }
    }
}
