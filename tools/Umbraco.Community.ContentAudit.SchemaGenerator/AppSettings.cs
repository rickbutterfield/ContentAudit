namespace Umbraco.Community.ContentAudit.SchemaGenerator
{
    internal class AppSettings
    {
        public ContentAuditDefinition ContentAudit { get; set; }

        internal class ContentAuditDefinition
        {
            public bool RespectRobotsTxt { get; set; } = true;

            public bool UseUmbracoContentIndex { get; set; } = false;

            public bool UseSitemapXml { get; set; } = true;

            public string SitemapUrl { get; set; } = "";

            public int MaxConcurrentCrawls { get; set; } = 4;

            public string BaseUrl { get; set; } = string.Empty;

            public int MaxCrawlDurationMinutes { get; set; } = 30;
        }

    }
}
