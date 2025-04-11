using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace Umbraco.Community.ContentAudit.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class TechnicalSeoSchema
    {
        public const string TableName = "umbContentAuditTechnicalSeo";

        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }

        public int RunId { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public string? Url { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public string? ContentType { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public string? Charset { get; set; }

        public bool HasGzipCompression { get; set; }

        public bool HasBrowserCaching { get; set; }

        public bool HasHttps { get; set; }

        public bool HasValidHtml { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public string? HtmlValidationErrors { get; set; }

        public bool HasSchemaMarkup { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public string? SchemaType { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
} 