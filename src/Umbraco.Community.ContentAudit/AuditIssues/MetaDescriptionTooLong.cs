using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    /// <summary>
    /// Audit issue that identifies pages with meta descriptions exceeding the recommended length.
    /// </summary>
    /// <remarks>
    /// Meta descriptions should ideally be between 150-160 characters to display properly in search engine
    /// results pages (SERPs). Descriptions longer than 160 characters may be truncated, potentially cutting off
    /// important information or calls-to-action.
    /// 
    /// Issues with overly long meta descriptions:
    /// - Search engines truncate descriptions with ellipsis (...)
    /// - Key information or calls-to-action may be cut off
    /// - Incomplete messaging reduces effectiveness
    /// - May indicate lack of content optimization
    /// 
    /// This is classified as a low-priority warning since the description is present but could be optimized.
    /// The recommended length of 160 characters is based on typical SERP display limits.
    /// </remarks>
    /// <inheritdoc />
    public class MetaDescription : IAuditPageIssue
    {
        /// <summary>
        /// Gets the unique identifier for this audit issue.
        /// </summary>
        /// <inheritdoc />
        public Guid Id => new Guid("2bd498ae-9c39-479f-a90b-b54ffeaf5675");

        /// <summary>
        /// Gets the display name of this audit issue.
        /// </summary>
        /// <inheritdoc />
        public string Name => "Description too long";

        /// <summary>
        /// Gets the description of this audit issue.
        /// </summary>
        /// <inheritdoc />
        public string Description => "Meta descriptions above the recommended limit";

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
        public IssuePriority Priority => IssuePriority.Low;

        /// <summary>
        /// Gets the properties to expose in the UI for this audit issue.
        /// </summary>
        /// <inheritdoc />
        public IEnumerable<AuditIssueProperty> ExposedProperties => default;

        /// <summary>
        /// Checks pages to identify those with meta descriptions exceeding 160 characters.
        /// </summary>
        /// <param name="pages">The collection of pages to analyze.</param>
        /// <returns>A filtered collection of pages with meta descriptions longer than the recommended 160 character limit.</returns>
        /// <remarks>
        /// This method filters pages based on the following criteria:
        /// - Page returns a 200 (OK) status code
        /// - Page has SEO data available
        /// - Meta description length exceeds 160 characters
        /// 
        /// The 160-character threshold is based on typical search engine display limits.
        /// </remarks>
        /// <inheritdoc />
        public IEnumerable<PageAnalysisDto> CheckPages(IEnumerable<PageAnalysisDto> pages)
        {
            return pages.Where(x => x.PageData.StatusCode == 200 && x.SeoData != null && x.SeoData?.MetaDescription?.Length > 160);
        }
    }
}
