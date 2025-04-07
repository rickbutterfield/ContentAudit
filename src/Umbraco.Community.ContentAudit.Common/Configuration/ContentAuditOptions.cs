using System.ComponentModel;

namespace Umbraco.Community.ContentAudit.Common.Configuration
{
    public class ContentAuditOptions
    {
        public ContentAuditSettings ContentAudit { get; set; }
    }

    public class ContentAuditSettings
    {
        [DefaultValue(true)]
        public bool RespectRobotsTxt { get; set; } = true;

        [DefaultValue(true)]
        public bool UseSitemapXml { get; set; } = true;

        [DefaultValue("")]
        public string SitemapUrl { get; set; } = "";
    }
}
