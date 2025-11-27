using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    /// <summary>
    /// Identifies pages with invalid HTML according to collected validation results.
    /// </summary>
    public class InvalidHtml : IAuditPageIssue
    {
        /// <summary>
        /// Unique identifier for this issue definition.
        /// </summary>
        public Guid Id => new Guid("accb0159-f35f-45be-a32d-b2f7832eb242");

        /// <summary>
        /// Display name of the issue.
        /// </summary>
        public string Name => "Invalid HTML";

        /// <summary>
        /// Description of what the issue represents.
        /// </summary>
        public string Description => "Pages that have HTML validation issues";

        /// <summary>
        /// Logical category for grouping in reports.
        /// </summary>
        public string Category => "Content";

        /// <summary>
        /// The issue type severity grouping.
        /// </summary>
        public IssueType Type => IssueType.Opportunity;

        /// <summary>
        /// The default priority assigned to this issue.
        /// </summary>
        public IssuePriority Priority => IssuePriority.Low;

        /// <summary>
        /// Properties to expose in summaries for this issue.
        /// </summary>
        public IEnumerable<AuditIssueProperty> ExposedProperties => new List<AuditIssueProperty>();

        /// <summary>
        /// Returns pages that match the invalid HTML condition.
        /// </summary>
        /// <param name="pages">Pages to evaluate.</param>
        /// <returns>Matching pages with invalid HTML.</returns>
        public IEnumerable<PageAnalysisDto> CheckPages(IEnumerable<PageAnalysisDto> pages)
        {
            return pages.Where(x => x.PageData.StatusCode == 200 && x.TechnicalSeoData != null && !x.TechnicalSeoData.HasValidHtml);
        }
    }
}
