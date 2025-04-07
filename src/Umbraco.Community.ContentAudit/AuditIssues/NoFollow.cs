using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    public class NoFollow : IAuditPageIssue
    {
        public Guid Id => new Guid("1320430e-321f-4668-9f6b-ea1cd8cc4b9c");

        public string Name => "NoFollow page";

        public string Description => "Pages containing `nofollow` in their robots meta tag";

        public string Category => "Content";

        public IssueType Type => IssueType.Warning;

        public IssuePriority Priority => IssuePriority.Medium;

        public IEnumerable<InternalPageDto> CheckPages(IEnumerable<InternalPageDto> pages)
        {
            return pages.Where(x => !x.IsAsset && x.MetaRobots != null && x.MetaRobots.ToLower().Contains("nofollow"));
        }
    }
}
