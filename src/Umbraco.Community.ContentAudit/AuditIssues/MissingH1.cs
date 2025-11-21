using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    /// <summary>
    /// Audit issue that identifies pages missing an H1 heading tag.
    /// </summary>
    /// <remarks>
    /// The H1 heading is the most important heading on a page and serves multiple critical functions:
    /// 
    /// <para><strong>SEO Impact:</strong></para>
    /// - Signals the main topic/subject of the page to search engines
    /// - Should contain primary keywords for the page
    /// - Helps search engines understand page hierarchy and structure
    /// - Influences page rankings for targeted keywords
    /// 
    /// <para><strong>Accessibility Impact:</strong></para>
    /// - Screen readers use H1 as the primary page identifier
    /// - Helps users navigate and understand page structure
    /// - Required for WCAG 2.1 Level A compliance
    /// - Provides context for assistive technologies
    /// 
    /// <para><strong>Best Practices:</strong></para>
    /// - Each page should have exactly one H1
    /// - H1 should be descriptive and unique
    /// - Should accurately reflect page content
    /// - Typically corresponds to the page title
    /// 
    /// This is classified as a high-priority issue because the absence of an H1 negatively impacts
    /// both SEO and accessibility compliance.
    /// </remarks>
    /// <inheritdoc />
    public class MissingH1 : IAuditPageIssue
    {
        /// <summary>
        /// Gets the unique identifier for this audit issue.
        /// </summary>
        /// <inheritdoc />
        public Guid Id => new Guid("23486f91-bb1a-40aa-80ea-ea730fc6b4c5");

        /// <summary>
        /// Gets the display name of this audit issue.
        /// </summary>
        /// <inheritdoc />
        public string Name => "H1 Missing";

        /// <summary>
        /// Gets the description of this audit issue.
        /// </summary>
        /// <inheritdoc />
        public string Description => "The page contains no H1";

        /// <summary>
        /// Gets the category this audit issue belongs to.
        /// </summary>
        /// <inheritdoc />
        public string Category => "Content";

        /// <summary>
        /// Gets the issue type classification.
        /// </summary>
        /// <inheritdoc />
        public IssueType Type => IssueType.Issue;

        /// <summary>
        /// Gets the priority level of this audit issue.
        /// </summary>
        /// <inheritdoc />
        public IssuePriority Priority => IssuePriority.High;

        /// <summary>
        /// Gets the properties to expose in the UI for this audit issue.
        /// </summary>
        /// <inheritdoc />
        public IEnumerable<AuditIssueProperty> ExposedProperties => default;
        
        /// <summary>
        /// Checks pages to identify those without an H1 heading tag.
        /// </summary>
        /// <param name="pages">The collection of pages to analyze.</param>
        /// <returns>A filtered collection of pages that are missing an H1 heading.</returns>
        /// <remarks>
        /// This method filters pages based on the following criteria:
        /// - Page returns a 200 (OK) status code
        /// - Page has SEO data available
        /// - H1 property is null or empty
        /// 
        /// Pages with error status codes are excluded as they typically don't have proper content structure.
        /// </remarks>
        /// <inheritdoc />
        public IEnumerable<PageAnalysisDto> CheckPages(IEnumerable<PageAnalysisDto> pages)
        {
            return pages.Where(x => x.PageData.StatusCode == 200 && x.SeoData != null && string.IsNullOrEmpty(x.SeoData.H1));
        }
    }
}
