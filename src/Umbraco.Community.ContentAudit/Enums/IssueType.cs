namespace Umbraco.Community.ContentAudit.Common.Enums
{
    /// <summary>
    /// Classification of an issue.
    /// </summary>
    public enum IssueType
    {
        /// <summary>Opportunity (informational).</summary>
        Opportunity = 1,
        /// <summary>Warning (needs attention).</summary>
        Warning = 2,
        /// <summary>Issue (action recommended).</summary>
        Issue = 3,
    }
}
