using System.Text.Json.Serialization;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    /// <summary>
    /// Data transfer object representing an image resource discovered during site auditing, including accessibility and metadata information.
    /// </summary>
    public class ImageDto : BaseContentAuditDto
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ImageDto"/> class.
        /// </summary>
        public ImageDto() { }

        /// <summary>
        /// Initializes a new instance of the <see cref="ImageDto"/> class from a <see cref="ResourceDto"/>.
        /// </summary>
        /// <param name="dto">The resource DTO containing the source data.</param>
        public ImageDto(ResourceDto dto)
        {
            Id = dto.Id;
            AuditKey = dto.AuditKey;
            Url = dto.Url;
            IsExternal = dto.IsExternal;
            Size = dto.Size;
            StatusCode = dto.StatusCode;
            ContentType = dto.ContentType;
            FoundPage = dto.FoundPage;
            Unique = dto.Unique;
            CreatedDate = dto.CreatedDate;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ImageDto"/> class from an <see cref="ImageSchema"/>.
        /// </summary>
        /// <param name="schema">The image schema containing the source data.</param>
        public ImageDto(ImageSchema schema)
        {
            Id = schema.Id;
            AuditKey = schema.AuditKey;
            Url = schema.Url;
            IsExternal = schema.IsExternal;
            Size = schema.Size;
            StatusCode = schema.StatusCode;
            ContentType = schema.ContentType;
            AltText = schema.AltText;
            Title = schema.Title;
            FoundPage = schema.FoundPage;
            Unique = schema.Unique;
            CreatedDate = schema.CreatedDate;
            IsBackground = schema.IsBackground;
        }

        /// <summary>
        /// Gets or sets the unique identifier for this image record in the database.
        /// </summary>
        [JsonPropertyName("id")]
        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the audit key that links this image to its parent audit.
        /// </summary>
        [JsonPropertyName("auditKey")]
        public Guid AuditKey { get; set; }

        /// <summary>
        /// Gets or sets the URL of the image resource.
        /// </summary>
        [JsonPropertyName("url")]
        public string? Url { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the image is hosted externally (outside the audited domain).
        /// </summary>
        [JsonPropertyName("isExternal")]
        public bool IsExternal { get; set; }

        /// <summary>
        /// Gets or sets the size of the image in bytes.
        /// </summary>
        [JsonPropertyName("size")]
        public double? Size { get; set; }

        /// <summary>
        /// Gets or sets the HTTP status code returned when the image was requested.
        /// </summary>
        [JsonPropertyName("statusCode")]
        public int StatusCode { get; set; }

        /// <summary>
        /// Gets or sets the MIME type of the image (e.g., "image/png", "image/jpeg", "image/svg+xml").
        /// </summary>
        [JsonPropertyName("contentType")]
        public string? ContentType { get; set; }

        /// <summary>
        /// Gets or sets the alternative text (alt attribute) of the image, used for accessibility and SEO.
        /// </summary>
        [JsonPropertyName("altText")]
        public string? AltText { get; set; }

        /// <summary>
        /// Gets or sets the title attribute of the image element.
        /// </summary>
        [JsonPropertyName("title")]
        public string? Title { get; set; }

        /// <summary>
        /// Gets or sets the URL of the page on which this image was found.
        /// </summary>
        [JsonPropertyName("foundPage")]
        public string? FoundPage { get; set; }

        /// <summary>
        /// Gets or sets the date and time when this image record was created.
        /// </summary>
        [JsonPropertyName("createdDate")]
        public DateTime CreatedDate { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the image is used as a CSS background image rather than an inline image element.
        /// </summary>
        [JsonPropertyName("isBackground")]
        public bool IsBackground { get; set; }
    }
} 