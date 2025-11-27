using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    /// <summary>
    /// Audit issue that identifies pages missing meta description tags.
    /// </summary>
    /// <remarks>
    /// Meta descriptions are HTML attributes that provide concise summaries of web pages and are displayed
    /// in search engine results pages (SERPs). While not a direct ranking factor, they significantly impact
    /// click-through rates and user engagement.
    /// 
    /// Missing meta descriptions can result in:
    /// - Search engines automatically generating descriptions from page content
    /// - Inconsistent messaging in search results
    /// - Lower click-through rates
    /// - Missed opportunities to include keywords and calls-to-action
    /// 
    /// This is classified as a medium-priority warning as it affects SEO performance and user experience.
    /// </remarks>
    /// <inheritdoc />
    public class MetaDescriptionMissing : IAuditPageIssue
    {
        /// <summary>
        /// Gets the unique identifier for this audit issue.
        /// </summary>
        /// <inheritdoc />
        public Guid Id => new Guid("8f2a0c38-d8c3-4de9-91c2-c7005aadbfb9");

        /// <summary>
        /// Gets the display name of this audit issue.
        /// </summary>
        /// <inheritdoc />
        public string Name => "Description missing";

        /// <summary>
        /// Gets the description of this audit issue.
        /// </summary>
        /// <inheritdoc />
        public string Description => "Pages where meta descriptions are missing";

        /// <summary>
        /// Gets the category this audit issue belongs to.
        /// </summary>
        /// <inheritdoc />
        public string Category => "Metadata";

        /// <summary>
        /// Gets the issue type classification.
        /// </summary>
        /// <inheritdoc />
        public IssueType Type => IssueType.Warning;

        /// <summary>
        /// Gets the priority level of this audit issue.
        /// </summary>
        /// <inheritdoc />
        public IssuePriority Priority => IssuePriority.Medium;

        /// <summary>
        /// Gets the properties to expose in the UI for this audit issue.
        /// </summary>
        /// <inheritdoc />
        public IEnumerable<AuditIssueProperty>? ExposedProperties => default;

        /// <summary>
        /// Checks pages to identify those without meta description tags.
        /// </summary>
        /// <param name="pages">The collection of pages to analyze.</param>
        /// <returns>A filtered collection of pages that are missing meta descriptions.</returns>
        /// <remarks>
        /// This method filters pages based on the following criteria:
        /// - Page returns a 200 (OK) status code
        /// - Page has SEO data available
        /// - Meta description is null or empty
        /// </remarks>
        /// <inheritdoc />
        public IEnumerable<PageAnalysisDto> CheckPages(IEnumerable<PageAnalysisDto> pages)
        {
            return pages.Where(x => x.PageData.StatusCode == 200 && x.SeoData != null && string.IsNullOrEmpty(x.SeoData?.MetaDescription));
        }
    }
}
