using System.Text.Json.Serialization;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    /// <summary>
    /// Represents a link discovered during a site audit.
    /// Contains information about the link URL, its destination, HTTP response status, and audit metadata.
    /// </summary>
    public class LinkDto : BaseContentAuditDto
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="LinkDto"/> class.
        /// </summary>
        public LinkDto() { }

        /// <summary>
        /// Initializes a new instance of the <see cref="LinkDto"/> class from a <see cref="LinkSchema"/> object.
        /// </summary>
        /// <param name="schema">The link schema object containing the data to initialize the DTO.</param>
        public LinkDto(LinkSchema schema)
        {
            Id = schema.Id;
            AuditKey = schema.AuditKey;
            Url = schema.Url;
            IsExternal = schema.IsExternal;
            FoundPage = schema.FoundPage;
            StatusCode = schema.StatusCode;
            ContentType = schema.ContentType;
            CreatedDate = schema.CreatedDate;
        }

        /// <summary>
        /// Gets or sets the unique identifier for this link record in the database.
        /// </summary>
        [JsonPropertyName("id")]
        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the audit key that associates this link with a specific audit run.
        /// </summary>
        [JsonPropertyName("auditKey")]
        public Guid AuditKey { get; set; }

        /// <summary>
        /// Gets or sets the URL of the link.
        /// </summary>
        [JsonPropertyName("url")]
        public string? Url { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this link points to an external domain.
        /// </summary>
        [JsonPropertyName("isExternal")]
        public bool IsExternal { get; set; }

        /// <summary>
        /// Gets or sets the URL of the page on which this link was found.
        /// </summary>
        [JsonPropertyName("foundPage")]
        public string? FoundPage { get; set; }

        /// <summary>
        /// Gets or sets the HTTP status code returned when the link was accessed.
        /// </summary>
        [JsonPropertyName("statusCode")]
        public int StatusCode { get; set; }

        /// <summary>
        /// Gets or sets the Content-Type header value of the resource the link points to.
        /// </summary>
        [JsonPropertyName("contentType")]
        public string? ContentType { get; set; }

        /// <summary>
        /// Gets or sets the date and time when this link was discovered during the audit.
        /// </summary>
        [JsonPropertyName("createdDate")]
        public DateTime CreatedDate { get; set; }
    }
} 