using Umbraco.Cms.Core.Composing;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Extensions;

namespace Umbraco.Community.ContentAudit.Composing
{
    public class AuditIssueCollectionBuilder : LazyCollectionBuilderBase<AuditIssueCollectionBuilder, AuditIssueCollection, IAuditIssue>
    {
        protected override AuditIssueCollectionBuilder This => this;
    }

    public class AuditIssueCollection : BuilderCollectionBase<IAuditIssue>
    {
        private readonly Dictionary<string, IAuditIssue> _lookup;

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

        internal bool TryGet(string typeName, out IAuditIssue? item)
        {
            return _lookup.TryGetValue(typeName, out item);
        }
    }
}
