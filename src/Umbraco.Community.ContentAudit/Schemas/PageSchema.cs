using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    [ExplicitColumns]
    public class PageSchema
    {
        public const string TableName = "umbContentAuditPages";

        public PageSchema() { }

        public PageSchema(PageDto pageContent, int runId)
        {
            RunId = runId;
            Url = pageContent.Url;
            IsExternal = pageContent.IsExternal;
            IsAsset = pageContent.IsAsset;
            NodeKey = pageContent.NodeKey;
            StatusCode = pageContent.StatusCode;
            ContentType = pageContent.ContentType?.ToString();
            MetaTitle = pageContent.MetaTitle;

            MetaDescription = pageContent.MetaDescription;
            MetaKeywords = pageContent.MetaKeywords;
            CanonicalUrl = pageContent.CanonicalUrl;
            IsOrphaned = pageContent.IsOrphaned;

            if (pageContent.H1.Any())
            {
                H1 = string.Join(',', pageContent.H1);
            }
            if (pageContent.H2.Any())
            {
                H2 = string.Join(',', pageContent.H2);
            }
            if (pageContent.OutboundLinks.Any())
            {
                OutboundLinks = string.Join(',', pageContent.OutboundLinks);
            }

            PageBytes = pageContent.Size.GetValueOrDefault();
        }

        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        [Column("Id")]
        public int Id { get; set; }

        [Column("RunId")]
        public int RunId { get; set; }

        [Column("Url")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? Url { get; set; }

        [Column("IsExternal")]
        public bool IsExternal { get; set; }

        [Column("IsAsset")]
        public bool IsAsset { get; set; }

        [Column("IsOrphaned")]
        public bool IsOrphaned { get; set; }

        [Column("NodeKey")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public Guid? NodeKey { get; set; }

        [Column("StatusCode")]
        public int StatusCode { get; set; }

        [Column("ContentType")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? ContentType { get; set; }

        [Column("MetaTitle")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? MetaTitle { get; set; }

        [Column("MetaDescription")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? MetaDescription { get; set; }

        [Column("MetaKeywords")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? MetaKeywords { get; set; }

        [Column("MetaRobots")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? MetaRobots { get; set; }

        [Column("CanonicalUrl")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? CanonicalUrl { get; set; }

        [Column("H1")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? H1 { get; set; }

        [Column("H2")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? H2 { get; set; }

        [Column("OutboundLinks")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? OutboundLinks { get; set; }

        [Column("PageBytes")]
        public double PageBytes { get; set; }
    }
}
