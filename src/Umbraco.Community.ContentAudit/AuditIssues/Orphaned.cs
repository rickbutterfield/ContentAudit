using Umbraco.Cms.Core.Services.Implement;
using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    /// <inheritdoc />
    public class Orphaned : IAuditPageIssue
    {
        /// <inheritdoc />
        public Guid Id => new Guid("7d873de4-3822-4ec0-8ba0-dd662cc77e99");

        /// <inheritdoc />
        public string Name => "Orphaned Pages";

        /// <inheritdoc />
        public string Description => "Pages that are not internally linked";

        /// <inheritdoc />
        public string Category => "Content";

        /// <inheritdoc />
        public IssueType Type => IssueType.Warning;

        /// <inheritdoc />
        public IssuePriority Priority => IssuePriority.High;

        /// <inheritdoc />
        public IEnumerable<AuditIssueProperty>? ExposedProperties => default;
        
        /// <inheritdoc />
        public IEnumerable<PageAnalysisDto> CheckPages(IEnumerable<PageAnalysisDto> pages)
        {
            return pages.Where(x => x.PageData.StatusCode == 200 && x.SeoData != null && x.SeoData.IsOrphaned);
        }
    }
}
