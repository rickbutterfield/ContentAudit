using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    public class ServerError : IAuditPageIssue
    {
        public Guid Id => new Guid("5b7e8aa6-9ffb-4fb9-b7e0-6fb02838d6db");

        public string Name => "Server Error";

        public string Description => "Pages returning a 500 error";

        public string Category => "Content";

        public IssueType Type => IssueType.Issue;

        public IssuePriority Priority => IssuePriority.High;

        public IEnumerable<AuditIssueProperty> ExposedProperties => default;

        public IEnumerable<InternalPageDto> CheckPages(IEnumerable<InternalPageDto> pages)
        {
            return pages.Where(x => !x.IsAsset && x.StatusCode == 500);
        }
    }
}
