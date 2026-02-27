using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Extensions;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    /// <inheritdoc />
    public class MissingH2 : IAuditPageIssue
    {
        /// <inheritdoc />
        /// <inheritdoc />
        public Guid Id => new Guid("da974a36-0f27-4cad-bd8b-d050f16551a3");

        /// <inheritdoc />
        /// <inheritdoc />
        public string Name => "H2s Missing";

        /// <inheritdoc />
        /// <inheritdoc />
        public string Description => "The page contains no H2s";

        /// <inheritdoc />
        /// <inheritdoc />
        public string Category => "Content";

        /// <inheritdoc />
        /// <inheritdoc />
        public IssueType Type => IssueType.Warning;

        /// <inheritdoc />
        /// <inheritdoc />
        public IssuePriority Priority => IssuePriority.Medium;

        /// <inheritdoc />
        /// <inheritdoc />
        public IEnumerable<AuditIssueProperty>? ExposedProperties => default;

        /// <inheritdoc />
        /// <inheritdoc />
        public IEnumerable<PageAnalysisDto> CheckPages(IEnumerable<PageAnalysisDto> pages)
        {
            return pages.Where(x => x.PageData.StatusCode == 200 && x.SeoData != null && (x.SeoData.H2s?.Any() == false || x.SeoData.H2s?.All(y => y == "") == true));
        }
    }
}
