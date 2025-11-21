using Umbraco.Cms.Core.Composing;
using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    /// <summary>
    /// Defines an audit issue that can be detected during content audits
    /// </summary>
    public interface IAuditIssue : IDiscoverable
    {
        /// <summary>
        /// Gets the unique identifier for this audit issue type
        /// </summary>
        Guid Id { get; }
        
        /// <summary>
        /// Gets the display name of the audit issue
        /// </summary>
        string Name { get; }
        
        /// <summary>
        /// Gets a detailed description of the audit issue
        /// </summary>
        string Description { get; }
        
        /// <summary>
        /// Gets the category this issue belongs to
        /// </summary>
        string Category { get; }
        
        /// <summary>
        /// Gets the type of issue (error, warning, etc.)
        /// </summary>
        IssueType Type { get; }
        
        /// <summary>
        /// Gets the priority level of this issue
        /// </summary>
        IssuePriority Priority { get; }
        
        /// <summary>
        /// Gets the properties exposed by this audit issue
        /// </summary>
        IEnumerable<AuditIssueProperty> ExposedProperties { get; }
    }
}
