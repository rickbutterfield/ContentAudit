using System.Text.Json;
using Umbraco.Community.ContentAudit.Models.Validation;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class TechnicalSeoDto
    {
        public TechnicalSeoDto() { }

        public TechnicalSeoDto(TechnicalSeoSchema schema)
        {
            Id = schema.Id;
            RunId = schema.RunId;
            Url = schema.Url;
            ContentType = schema.ContentType;
            Charset = schema.Charset;
            HasGzipCompression = schema.HasGzipCompression;
            HasBrowserCaching = schema.HasBrowserCaching;
            HasHttps = schema.HasHttps;
            HasValidHtml = schema.HasValidHtml;
            HtmlValidationErrors = JsonSerializer.Deserialize<List<ValidationMessage>>(schema.HtmlValidationErrors);
            HasSchemaMarkup = schema.HasSchemaMarkup;
            SchemaType = schema.SchemaType;
            CreatedDate = schema.CreatedDate;
        }

        public int Id { get; set; }
        public int RunId { get; set; }
        public string? Url { get; set; }
        public string? ContentType { get; set; }
        public string? Charset { get; set; }
        public bool HasGzipCompression { get; set; }
        public bool HasBrowserCaching { get; set; }
        public bool HasHttps { get; set; }
        public bool HasValidHtml { get; set; }
        public List<ValidationMessage>? HtmlValidationErrors { get; set; }
        public bool HasSchemaMarkup { get; set; }
        public string? SchemaType { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
