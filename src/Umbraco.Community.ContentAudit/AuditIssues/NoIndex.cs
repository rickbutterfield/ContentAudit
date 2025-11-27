using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    /// <inheritdoc />
    public class NoIndex : IAuditPageIssue
    {
        /// <inheritdoc />
        public Guid Id => new Guid("9db92592-b2b0-48c9-bcf7-e7f7e0a46b6f");

        /// <inheritdoc />
        public string Name => "NoIndex page";

        /// <inheritdoc />
        public string Description => "Pages containing `noindex` in their robots meta tag";

        /// <inheritdoc />
        public string Category => "Content";

        /// <inheritdoc />
        public IssueType Type => IssueType.Warning;

        /// <inheritdoc />
        public IssuePriority Priority => IssuePriority.Medium;

        /// <inheritdoc />
        public IEnumerable<AuditIssueProperty>? ExposedProperties => default;
        
        /// <inheritdoc />
        public IEnumerable<PageAnalysisDto> CheckPages(IEnumerable<PageAnalysisDto> pages)
        {
            return pages.Where(x => x.PageData.StatusCode == 200 && x.SeoData != null && x.SeoData?.HasNoIndex == true);
        }
    }
}
