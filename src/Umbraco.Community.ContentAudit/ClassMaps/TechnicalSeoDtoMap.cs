using CsvHelper.Configuration;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.ClassMaps
{
    public class TechnicalSeoDtoMap : ClassMap<TechnicalSeoDto>
    {
        public TechnicalSeoDtoMap()
        {
            Map(m => m.ContentType).Name("Content Type");
            Map(m => m.Charset).Name("Charset");
            Map(m => m.HasGzipCompression).Name("Has Gzip Compression");
            Map(m => m.HasBrowserCaching).Name("Has Browser Caching");
            Map(m => m.HasHttps).Name("Has HTTPS");
            Map(m => m.HasValidHtml).Name("Has Valid HTML");
            Map(m => m.HtmlValidationErrors).Name("HTML Validation Errors");
            Map(m => m.HasSchemaMarkup).Name("Has Schema Markup");
            Map(m => m.SchemaType).Name("Schema Type");
        }
    }
}
