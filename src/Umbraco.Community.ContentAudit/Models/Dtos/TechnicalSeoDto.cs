using System.Text.Json;
using Umbraco.Community.ContentAudit.Models.Validation;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    /// <summary>
    /// Data transfer object containing technical SEO assessment data for an audited page.
    /// Evaluates server configuration, HTML validation, performance optimization, and structured data.
    /// </summary>
    public class TechnicalSeoDto
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TechnicalSeoDto"/> class.
        /// </summary>
        public TechnicalSeoDto() { }

        /// <summary>
        /// Initializes a new instance of the <see cref="TechnicalSeoDto"/> class from a <see cref="TechnicalSeoSchema"/>.
        /// </summary>
        /// <param name="schema">The technical SEO schema containing the technical assessment data.</param>
        public TechnicalSeoDto(TechnicalSeoSchema schema)
        {
            Id = schema.Id;
            AuditKey = schema.AuditKey;
            Url = schema.Url;
            ContentType = schema.ContentType;
            Charset = schema.Charset;
            HasGzipCompression = schema.HasGzipCompression;
            HasBrowserCaching = schema.HasBrowserCaching;
            HasHttps = schema.HasHttps;
            HasValidHtml = schema.HasValidHtml;
            HtmlValidationErrors = JsonSerializer.Deserialize<List<ValidationMessage>>(schema.HtmlValidationErrors!);
            HasSchemaMarkup = schema.HasSchemaMarkup;
            SchemaType = schema.SchemaType;
            CreatedDate = schema.CreatedDate;
        }

        /// <summary>
        /// Gets or sets the unique database identifier for this technical SEO record.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the unique identifier of the audit run.
        /// </summary>
        public Guid AuditKey { get; set; }

        /// <summary>
        /// Gets or sets the URL of the audited page.
        /// </summary>
        public string? Url { get; set; }

        /// <summary>
        /// Gets or sets the Content-Type header value (e.g., text/html; charset=utf-8).
        /// </summary>
        public string? ContentType { get; set; }

        /// <summary>
        /// Gets or sets the character encoding declaration (e.g., UTF-8) used by the page.
        /// </summary>
        public string? Charset { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the server response includes gzip compression for bandwidth optimization.
        /// </summary>
        public bool HasGzipCompression { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the server implements browser caching headers (Cache-Control, ETag, etc.).
        /// </summary>
        public bool HasBrowserCaching { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the page is served over HTTPS for secure connections.
        /// </summary>
        public bool HasHttps { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the HTML markup on the page passes W3C validation standards.
        /// </summary>
        public bool HasValidHtml { get; set; }

        /// <summary>
        /// Gets or sets a list of HTML validation errors and warnings found during markup validation.
        /// </summary>
        public List<ValidationMessage>? HtmlValidationErrors { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the page includes structured data markup (Schema.org, JSON-LD, etc.).
        /// </summary>
        public bool HasSchemaMarkup { get; set; }

        /// <summary>
        /// Gets or sets the type of schema markup used (e.g., Organization, Product, Article, LocalBusiness).
        /// </summary>
        public string? SchemaType { get; set; }

        /// <summary>
        /// Gets or sets the date and time when the technical SEO analysis was performed.
        /// </summary>
        public DateTime CreatedDate { get; set; }
    }
}
