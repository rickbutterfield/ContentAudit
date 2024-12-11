using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    public class MissingH1 : IAuditIssue
    {
        public Guid Id => new Guid("23486f91-bb1a-40aa-80ea-ea730fc6b4c5");

        public string Name => "H1 Missing";

        public string Description => "The page contains no H1";

        public string Category => "Content";

        public IssueType Type => IssueType.Issue;

        public IssuePriority Priority => IssuePriority.High;

        public int CheckPages(IEnumerable<PageResponseDto> pages)
        {
            return pages.Count(x => x.H1 == null || x.H1?.Any() == false);
        }
    }
}
