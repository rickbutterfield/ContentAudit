using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Schemas
{
    /// <summary>
    /// Database schema for image metadata discovered during audits.
    /// </summary>
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class ImageSchema
    {
        /// <summary>
        /// Database table name for image data.
        /// </summary>
        public const string TableName = "umbContentAuditImages";

        /// <summary>
        /// Initializes a new instance of the <see cref="ImageSchema"/> class.
        /// </summary>
        public ImageSchema() { }

        /// <summary>
        /// Initializes a new instance of the <see cref="ImageSchema"/> class from a DTO.
        /// </summary>
        /// <param name="dto">The data transfer object containing image data.</param>
        public ImageSchema(ImageDto dto)
        {
            Id = dto.Id;
            AuditKey = dto.AuditKey;
            Url = dto.Url;
            IsExternal = dto.IsExternal;
            Size = dto.Size;
            StatusCode = dto.StatusCode;
            ContentType = dto.ContentType;
            AltText = dto.AltText;
            Title = dto.Title;
            FoundPage = dto.FoundPage;
            Unique = dto.Unique;
            IsBackground = dto.IsBackground;
        }

        /// <summary>
        /// Gets or sets the auto-incrementing primary key identifier.
        /// </summary>
        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the audit run identifier (GUID).
        /// </summary>
        public Guid AuditKey { get; set; }

        /// <summary>
        /// Gets or sets the audit run identifier (legacy - kept for migration safety).
        /// </summary>
        public int RunId { get; set; }

        /// <summary>
        /// Gets or sets the image URL.
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? Url { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the image is external.
        /// </summary>
        public bool IsExternal { get; set; }

        /// <summary>
        /// Gets or sets the image size in bytes.
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        public double? Size { get; set; }

        /// <summary>
        /// Gets or sets the HTTP status code when retrieving the image.
        /// </summary>
        public int StatusCode { get; set; }

        /// <summary>
        /// Gets or sets the image content type.
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? ContentType { get; set; }

        /// <summary>
        /// Gets or sets the image alt text.
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? AltText { get; set; }

        /// <summary>
        /// Gets or sets the image title attribute.
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? Title { get; set; }

        /// <summary>
        /// Gets or sets the URL of the page where the image was found.
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? FoundPage { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the image is used as a CSS background.
        /// </summary>
        public bool IsBackground { get; set; }

        /// <summary>
        /// Gets or sets a unique image identifier across the audit.
        /// </summary>
        public Guid Unique { get; set; }

        /// <summary>
        /// Gets the creation date in UTC.
        /// </summary>
        public DateTime CreatedDate => DateTime.UtcNow;
    }
}