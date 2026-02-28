using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    /// <summary>
    /// Data transfer object representing an audit issue detected during a content audit run.
    /// </summary>
    public class IssueDto : BaseContentAuditDto
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="IssueDto"/> class.
        /// </summary>
        public IssueDto() { }

        /// <summary>
        /// Initializes a new instance of the <see cref="IssueDto"/> class from an <see cref="IAuditIssue"/>.
        /// </summary>
        /// <param name="issue">The audit issue containing the source data.</param>
        public IssueDto(IAuditIssue issue)
        {
            Unique = issue.Id;
            EntityType = "audit-issue";
            Name = issue.Name;
            Description = issue.Description;
            Category = issue.Category;
            Type = issue.Type;
            Priority = issue.Priority;
            ExposedProperties = issue.ExposedProperties;
        }

        /// <summary>
        /// Gets or sets the display name of the audit issue.
        /// </summary>
        public string? Name { get; set; }

        /// <summary>
        /// Gets or sets the detailed description of the audit issue and its impact.
        /// </summary>
        public string? Description { get; set; }

        /// <summary>
        /// Gets or sets the category of the issue (e.g., SEO, Accessibility, Performance).
        /// </summary>
        public string? Category { get; set; }

        /// <summary>
        /// Gets or sets the type of issue (e.g., Error, Warning, Notice).
        /// </summary>
        public IssueType? Type { get; set; }

        /// <summary>
        /// Gets or sets the priority level of the issue (e.g., Critical, High, Medium, Low).
        /// </summary>
        public IssuePriority? Priority { get; set; }

        /// <summary>
        /// Gets or sets the number of URLs affected by this issue.
        /// </summary>
        public int? NumberOfUrls { get; set; }

        /// <summary>
        /// Gets or sets the percentage of total pages affected by this issue.
        /// </summary>
        public double? PercentOfTotal { get; set; }

        /// <summary>
        /// Gets or sets the collection of pages affected by this issue.
        /// </summary>
        public IEnumerable<IssueReferenceDto>? Pages { get; set; }

        /// <summary>
        /// Gets or sets the collection of images affected by this issue (for image-specific issues).
        /// </summary>
        public IEnumerable<ImageDto>? Images { get; set; }

        /// <summary>
        /// Gets or sets the collection of exposed properties that provide additional issue-specific metadata.
        /// </summary>
        public IEnumerable<AuditIssueProperty>? ExposedProperties { get; set; }

        /// <summary>
        /// Gets or sets the calculated priority score used for sorting and prioritization of issues.
        /// </summary>
        public double? PriorityScore { get; set; }
    }
}
