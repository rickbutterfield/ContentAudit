using System.Xml.Linq;
using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;

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

        public IEnumerable<AuditIssueProperty> ExposedProperties => default;

        public IEnumerable<PageAnalysisDto> CheckPages(IEnumerable<PageAnalysisDto> pages)
        {
            return pages.Where(x => x.PageData.StatusCode == 200 && x.SeoData != null && x.SeoData?.MetaDescription?.Length > 160);
        }
    }
}
