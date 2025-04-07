#if !NET9_0
using Umbraco.Cms.Core.Sections;
using Umbraco.Cms.Web.Common.Attributes;

namespace Umbraco.Community.ContentAudit.Sections
{
    [PluginController("UmbracoCommunityContentAudit")]
    public class AuditSection : ISection
    {
        public string Alias => Constants.SectionAlias;
        public string Name => Constants.Name;
    }
}
#endif