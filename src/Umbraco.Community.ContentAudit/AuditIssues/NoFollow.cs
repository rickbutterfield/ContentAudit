using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    /// <inheritdoc />
    public class NoFollow : IAuditPageIssue
    {
        /// <inheritdoc />
        public Guid Id => new Guid("1320430e-321f-4668-9f6b-ea1cd8cc4b9c");

        /// <inheritdoc />
        public string Name => "NoFollow page";

        /// <inheritdoc />
        public string Description => "Pages containing `nofollow` in their robots meta tag";

        /// <inheritdoc />
        public string Category => "Content";

        /// <inheritdoc />
        public IssueType Type => IssueType.Warning;

        /// <inheritdoc />
        public IssuePriority Priority => IssuePriority.Medium;

        /// <inheritdoc />
        public IEnumerable<AuditIssueProperty> ExposedProperties => default;
        
        /// <inheritdoc />
        public IEnumerable<PageAnalysisDto> CheckPages(IEnumerable<PageAnalysisDto> pages)
        {
            return pages.Where(x => x.PageData.StatusCode == 200 && x.SeoData != null && x.SeoData?.HasNoFollow == true);
        }
    }
}
