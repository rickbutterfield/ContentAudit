using Umbraco.Cms.Core.Composing;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Extensions;

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
        private readonly Dictionary<string, IAuditIssue> _lookup;

        /// <summary>
        /// Initializes a new instance of the collection.
        /// </summary>
        /// <param name="items">The items factory.</param>
        public AuditIssueCollection(Func<IEnumerable<IAuditIssue>> items) : base(items)
        {
            _lookup = new Dictionary<string, IAuditIssue>(StringComparer.OrdinalIgnoreCase);

            foreach (var item in this)
            {
                var typeName = item.GetType().GetFullNameWithAssembly();
                if (_lookup.ContainsKey(typeName) == false)
                {
                    _lookup.Add(typeName, item);
                }
            }
        }

        /// <summary>
        /// Attempts to get an issue by type name.
        /// </summary>
        /// <param name="typeName">The full type name with assembly.</param>
        /// <param name="item">The resolved issue, if found.</param>
        /// <returns>True if found; otherwise false.</returns>
        internal bool TryGet(string typeName, out IAuditIssue? item)
        {
            return _lookup.TryGetValue(typeName, out item);
        }
    }
}
