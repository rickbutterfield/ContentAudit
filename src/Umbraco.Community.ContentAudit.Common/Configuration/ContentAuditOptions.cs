using System.ComponentModel;

namespace Umbraco.Community.ContentAudit.Common.Configuration
{
    public class ContentAuditOptions
    {
        public ContentAuditSettings? ContentAudit { get; set; }
    }

    public class ContentAuditSettings
    {
        [DefaultValue(true)]
        public bool RespectRobotsTxt { get; set; } = true;

        [DefaultValue(false)]
        public bool UseUmbracoContentIndex { get; set; } = false;

        [DefaultValue(true)]
        public bool UseSitemapXml { get; set; } = true;

        [DefaultValue("/sitemap.xml")]
        public string SitemapUrl { get; set; } = "/sitemap.xml";

        [DefaultValue(4)]
        public int MaxConcurrentCrawls { get; set; } = 4;
    }
}
