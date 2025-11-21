using NPoco;
using System.Text.Json;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Schemas
{
    /// <summary>
    /// Database schema for technical SEO audit data
    /// </summary>
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class TechnicalSeoSchema
    {
        /// <summary>
        /// Database table name for technical SEO data
        /// </summary>
        public const string TableName = "umbContentAuditTechnicalSeo";

        /// <summary>
        /// Initializes a new instance of the TechnicalSeoSchema
        /// </summary>
        public TechnicalSeoSchema() { }

        /// <summary>
        /// Initializes a new instance of the TechnicalSeoSchema from a DTO
        /// </summary>
        /// <param name="dto">The data transfer object containing technical SEO data</param>
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

        /// <summary>
        /// Gets or sets the unique identifier
        /// </summary>
        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the audit run identifier
        /// </summary>
        public int RunId { get; set; }

        /// <summary>
        /// Gets or sets the page URL
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? Url { get; set; }

        /// <summary>
        /// Gets or sets the content type header value
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? ContentType { get; set; }

        /// <summary>
        /// Gets or sets the character set encoding
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? Charset { get; set; }

        /// <summary>
        /// Gets or sets whether GZIP compression is enabled
        /// </summary>
        public bool HasGzipCompression { get; set; }

        /// <summary>
        /// Gets or sets whether browser caching headers are present
        /// </summary>
        public bool HasBrowserCaching { get; set; }

        /// <summary>
        /// Gets or sets whether the page uses HTTPS
        /// </summary>
        public bool HasHttps { get; set; }

        /// <summary>
        /// Gets or sets whether the HTML is valid
        /// </summary>
        public bool HasValidHtml { get; set; }

        /// <summary>
        /// Gets or sets the HTML validation errors as JSON
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? HtmlValidationErrors { get; set; }

        /// <summary>
        /// Gets or sets whether schema markup is present
        /// </summary>
        public bool HasSchemaMarkup { get; set; }

        /// <summary>
        /// Gets or sets the type of schema markup detected
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? SchemaType { get; set; }

        /// <summary>
        /// Gets the creation date in UTC
        /// </summary>
        public DateTime CreatedDate => DateTime.UtcNow;
    }
} 