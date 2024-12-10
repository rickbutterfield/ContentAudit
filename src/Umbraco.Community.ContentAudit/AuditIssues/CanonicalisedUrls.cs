using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    public class CanonicalisedUrls : IAuditIssue
    {
        public string Name => "Canonicalised";

        public string Description => "Pages that have a canonical to a different URL";
        
        public string Category => "Canonicals";

        public IssueType Type => IssueType.Warning;

        public IssuePriority Priority => IssuePriority.High;

        public int CheckPages(IEnumerable<PageResponseDto> pages)
        {
            return pages.Count(x => x.CanonicalUrl != x.Url);
        }
    }
}
