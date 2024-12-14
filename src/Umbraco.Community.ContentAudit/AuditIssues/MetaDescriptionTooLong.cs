using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    public class MetaDescription : IAuditPageIssue
    {
        public Guid Id => new Guid("2bd498ae-9c39-479f-a90b-b54ffeaf5675");

        public string Name => "Description too long";

        public string Description => "Meta descriptions above the recommended limit";

        public string Category => "Metadata";

        public IssueType Type => IssueType.Warning;

        public IssuePriority Priority => IssuePriority.Low;

        public int CheckPages(IEnumerable<PageDto> pages)
        {
            return pages.Count(x => !x.IsAsset && !x.IsExternal && x.MetaDescription?.Length > 160);
        }
    }
}
