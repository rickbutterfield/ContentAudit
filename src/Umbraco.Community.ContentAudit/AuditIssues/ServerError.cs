using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    /// <inheritdoc />
    public class ServerError : IAuditPageIssue
    {
        /// <inheritdoc />
        public Guid Id => new Guid("5b7e8aa6-9ffb-4fb9-b7e0-6fb02838d6db");

        /// <inheritdoc />
        public string Name => "Server Error";

        /// <inheritdoc />
        public string Description => "Pages returning a 500 error";

        /// <inheritdoc />
        public string Category => "Content";

        /// <inheritdoc />
        public IssueType Type => IssueType.Issue;

        /// <inheritdoc />
        public IssuePriority Priority => IssuePriority.High;

        /// <inheritdoc />
        public IEnumerable<AuditIssueProperty>? ExposedProperties => default;

        /// <inheritdoc />
        public IEnumerable<PageAnalysisDto> CheckPages(IEnumerable<PageAnalysisDto> pages)
        {
            return pages.Where(x => x.PageData.StatusCode == 500);
        }
    }
}
