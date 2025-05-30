using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    public class MissingH1 : IAuditPageIssue
    {
        public Guid Id => new Guid("23486f91-bb1a-40aa-80ea-ea730fc6b4c5");

        public string Name => "H1 Missing";

        public string Description => "The page contains no H1";

        public string Category => "Content";

        public IssueType Type => IssueType.Issue;

        public IssuePriority Priority => IssuePriority.High;

        public IEnumerable<AuditIssueProperty> ExposedProperties => new List<AuditIssueProperty>();
        
        public IEnumerable<PageAnalysisDto> CheckPages(IEnumerable<PageAnalysisDto> pages)
        {
            return pages.Where(x => x.PageData.StatusCode == 200 && x.SeoData != null && string.IsNullOrEmpty(x.SeoData.H1));
        }
    }
}
