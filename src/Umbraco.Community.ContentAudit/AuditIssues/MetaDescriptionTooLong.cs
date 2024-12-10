using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    public class MetaDescription : IAuditIssue
    {
        public string Name => "Description too long";

        public string Description => "Meta descriptions above the recommended limit";

        public string Category => "Metadata";

        public IssueType Type => IssueType.Warning;

        public IssuePriority Priority => IssuePriority.Low;

        public int CheckPages(IEnumerable<PageResponseDto> pages)
        {
            return pages.Count(x => x.MetaDescription?.Length > 160);
        }
    }
}
