using System.Text.Json.Serialization;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    /// <summary>
    /// Data transfer object representing a web resource discovered during site auditing.
    /// </summary>
    public class ResourceDto : BaseContentAuditDto
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ResourceDto"/> class.
        /// </summary>
        public ResourceDto() { }

        /// <summary>
        /// Initializes a new instance of the <see cref="ResourceDto"/> class from a <see cref="ResourceSchema"/>.
        /// </summary>
        /// <param name="schema">The resource schema containing the source data.</param>
        public ResourceDto(ResourceSchema schema)
        {
            Id = schema.Id;
            AuditKey = schema.AuditKey;
            Url = schema.Url;
            IsExternal = schema.IsExternal;
            Size = schema.Size;
            StatusCode = schema.StatusCode;
            ContentType = schema.ContentType;
            FoundPage = schema.FoundPage;
            Unique = schema.Unique;
            CreatedDate = schema.CreatedDate;
        }

        /// <summary>
        /// Gets or sets the unique identifier for this resource record in the database.
        /// </summary>
        [JsonPropertyName("id")]
        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the audit key that links this resource to its parent audit.
        /// </summary>
        [JsonPropertyName("auditKey")]
        public Guid AuditKey { get; set; }

        /// <summary>
        /// Gets or sets the URL of the resource.
        /// </summary>
        [JsonPropertyName("url")]
        public string? Url { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the resource is hosted externally (outside the audited domain).
        /// </summary>
        [JsonPropertyName("isExternal")]
        public bool IsExternal { get; set; }

        /// <summary>
        /// Gets or sets the size of the resource in bytes.
        /// </summary>
        [JsonPropertyName("size")]
        public double? Size { get; set; }

        /// <summary>
        /// Gets or sets the HTTP status code returned when the resource was requested.
        /// </summary>
        [JsonPropertyName("statusCode")]
        public int StatusCode { get; set; }

        /// <summary>
        /// Gets or sets the MIME type of the resource (e.g., "image/png", "application/json").
        /// </summary>
        [JsonPropertyName("contentType")]
        public string? ContentType { get; set; }

        /// <summary>
        /// Gets or sets the URL of the page on which this resource was found.
        /// </summary>
        [JsonPropertyName("foundPage")]
        public string? FoundPage { get; set; }

        /// <summary>
        /// Gets or sets the date and time when this resource record was created.
        /// </summary>
        [JsonPropertyName("createdDate")]
        public DateTime CreatedDate { get; set; }
    }
} 