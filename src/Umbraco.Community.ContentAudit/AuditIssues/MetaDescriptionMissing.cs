using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    public class MetaDescriptionMissing : IAuditPageIssue
    {
        public Guid Id => new Guid("8f2a0c38-d8c3-4de9-91c2-c7005aadbfb9");

        public string Name => "Description missing";

        public string Description => "Pages where meta descriptions are missing";

        public string Category => "Metadata";

        public IssueType Type => IssueType.Warning;

        public IssuePriority Priority => IssuePriority.Medium;

        public IEnumerable<AuditIssueProperty> ExposedProperties => default;

        public IEnumerable<InternalPageDto> CheckPages(IEnumerable<InternalPageDto> pages)
        {
            return null;
            //return pages.Where(x => !x.IsAsset && x.StatusCode == 200 && string.IsNullOrEmpty(x.MetaDescription));
        }
    }
}
