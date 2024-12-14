using Umbraco.Cms.Core.Services.Implement;
using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    public class Orphaned : IAuditPageIssue
    {
        public Guid Id => new Guid("7d873de4-3822-4ec0-8ba0-dd662cc77e99");

        public string Name => "Orphaned Pages";

        public string Description => "Pages that are not internally linked";

        public string Category => "Content";

        public IssueType Type => IssueType.Warning;

        public IssuePriority Priority => IssuePriority.High;

        public int CheckPages(IEnumerable<PageDto> pages)
        {
            return pages.Count(x => !x.IsAsset && !x.IsExternal && x.IsOrphaned);
        }
    }
}
