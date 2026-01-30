using Umbraco.Cms.Core.Composing;
using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Composing
{
    /// <summary>
    /// Collection builder for <see cref="IAuditIssue"/> implementations.
    /// </summary>
    public class AuditIssueCollectionBuilder : LazyCollectionBuilderBase<AuditIssueCollectionBuilder, AuditIssueCollection, IAuditIssue>
    {
        /// <summary>
        /// Gets the current builder instance.
        /// </summary>
        protected override AuditIssueCollectionBuilder This => this;
    }

    /// <summary>
    /// Resolved collection of registered <see cref="IAuditIssue"/>.
    /// </summary>
    public class AuditIssueCollection : BuilderCollectionBase<IAuditIssue>
    {
        /// <summary>
        /// Initializes a new instance of the collection.
        /// </summary>
        /// <param name="items">The items factory.</param>
        public AuditIssueCollection(Func<IEnumerable<IAuditIssue>> items) : base(items)
        {
        }
    }
}
