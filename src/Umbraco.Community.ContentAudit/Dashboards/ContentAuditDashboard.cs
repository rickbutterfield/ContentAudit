#if !NET9_0
using Umbraco.Cms.Core.Dashboards;

namespace Umbraco.Community.ContentAudit.Dashboards
{
    public class ContentAuditDashboard : IDashboard
    {
        public string Alias => "contentAuditDashboard";

        public string[] Sections => new[] { Constants.SectionAlias };

        public string View => "/App_Plugins/UmbracoCommunityContentAudit/views/dashboard.html";

        public IAccessRule[] AccessRules => Array.Empty<IAccessRule>();
    }
}
#endif