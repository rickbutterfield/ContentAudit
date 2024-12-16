using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    public class MissingAltText : IAuditImageIssue
    {
        public Guid Id => new Guid("8368418c-b231-46b4-9fbb-642acf92436b");

        public string Name => "Missing alt text";

        public string Description => "Pages with images that are missing alt text";

        public string Category => "Content";

        public IssueType Type => IssueType.Issue;

        public IssuePriority Priority => IssuePriority.High;

        public int CheckImages(IEnumerable<ImageDto> images, IEnumerable<InternalPageDto> pages)
        {
            return images.Where(x => string.IsNullOrEmpty(x.AltText)).Select(x => x.FoundPage).Distinct().Count();
        }
    }
}
