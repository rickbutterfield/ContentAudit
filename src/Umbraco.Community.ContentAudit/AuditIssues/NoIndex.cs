using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    public class NoIndex : IAuditPageIssue
    {
        public Guid Id => new Guid("9db92592-b2b0-48c9-bcf7-e7f7e0a46b6f");

        public string Name => "NoIndex page";

        public string Description => "Pages containing `noindex` in their robots meta tag";

        public string Category => "Content";

        public IssueType Type => IssueType.Warning;

        public IssuePriority Priority => IssuePriority.Medium;

        public IEnumerable<AuditIssueProperty> ExposedProperties => default;
        
        public IEnumerable<InternalPageDto> CheckPages(IEnumerable<InternalPageDto> pages)
        {
            //return pages.Where(x => !x.IsAsset && x.StatusCode == 200 && x.MetaRobots != null && x.MetaRobots.ToLower().Contains("noindex"));
            return null;
        }
    }
}
