using Umbraco.Cms.Core.Composing;
using Umbraco.Community.ContentAudit.Common.Enums;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface IAuditIssue : IDiscoverable
    {
        Guid Id { get; }
        string Name { get; }
        string Description { get; }
        string Category { get; }
        IssueType Type { get; }
        IssuePriority Priority { get; }
    }
}
