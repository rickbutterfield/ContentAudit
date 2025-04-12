using NPoco;
using System.Text.Json;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class TechnicalSeoSchema
    {
        public const string TableName = "umbContentAuditTechnicalSeo";

        public TechnicalSeoSchema() { }

        public TechnicalSeoSchema(TechnicalSeoDto dto)
        {
            Id = dto.Id;
            RunId = dto.RunId;
            Url = dto.Url;
            ContentType = dto.ContentType;
            Charset = dto.Charset;
            HasGzipCompression = dto.HasGzipCompression;
            HasBrowserCaching = dto.HasBrowserCaching;
            HasHttps = dto.HasHttps;
            HasValidHtml = dto.HasValidHtml;
            HtmlValidationErrors = JsonSerializer.Serialize(dto.HtmlValidationErrors);
            HasSchemaMarkup = dto.HasSchemaMarkup;
            SchemaType = dto.SchemaType;
        }

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

        public DateTime CreatedDate => DateTime.UtcNow;
    }
} 