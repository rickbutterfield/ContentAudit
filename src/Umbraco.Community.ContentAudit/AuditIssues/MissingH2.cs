using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    public class MissingH2 : IAuditIssue
    {
        public Guid Id => new Guid("da974a36-0f27-4cad-bd8b-d050f16551a3");

        public string Name => "H2s Missing";

        public string Description => "The page contains no H2s";

        public string Category => "Content";

        public IssueType Type => IssueType.Warning;

        public IssuePriority Priority => IssuePriority.Medium;

        public int CheckPages(IEnumerable<PageDto> pages)
        {
            return pages.Count(x => !x.IsAsset && !x.IsExternal && (x.H2 == null || x.H2?.Any() == false));
        }
    }
}
