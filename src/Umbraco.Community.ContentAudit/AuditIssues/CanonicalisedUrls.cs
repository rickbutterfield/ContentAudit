using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    public class CanonicalisedUrls : IAuditPageIssue
    {
        public Guid Id => new Guid("cccb0159-f35f-45be-a32d-b2f7832eb242");

        public string Name => "Canonicalised";

        public string Description => "Pages that have a canonical to a different URL";
        
        public string Category => "Canonicals";

        public IssueType Type => IssueType.Warning;

        public IssuePriority Priority => IssuePriority.High;

        public int CheckPages(IEnumerable<InternalPageDto> pages)
        {
            return pages.Count(x => !x.IsAsset && x.CanonicalUrl != x.Url);
        }
    }
}
