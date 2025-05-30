using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    public class InvalidHtml : IAuditPageIssue
    {
        public Guid Id => new Guid("accb0159-f35f-45be-a32d-b2f7832eb242");

        public string Name => "Invalid HTML";

        public string Description => "Pages that have HTML validation issues";

        public string Category => "Content";

        public IssueType Type => IssueType.Opportunity;

        public IssuePriority Priority => IssuePriority.Low;

        public IEnumerable<AuditIssueProperty> ExposedProperties => new List<AuditIssueProperty>();

        public IEnumerable<PageAnalysisDto> CheckPages(IEnumerable<PageAnalysisDto> pages)
        {
            return pages.Where(x => x.PageData.StatusCode == 200 && x.TechnicalSeoData != null && !px.TechnicalSeoData.HasValidHtml);
        }
    }
}
