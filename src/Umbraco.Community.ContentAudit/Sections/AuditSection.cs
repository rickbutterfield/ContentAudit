#if NET8_0
using Umbraco.Cms.Core.Sections;

namespace Umbraco.Community.ContentAudit.Sections
{
    public class AuditSection : ISection
    {
        public string Alias => Constants.SectionAlias;
        public string Name => Constants.Name;
    }
}
#endif