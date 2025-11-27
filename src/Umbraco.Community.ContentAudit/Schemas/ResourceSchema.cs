using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Schemas
{
    /// <summary>
    /// Database schema for non-image resource records discovered during audits.
    /// </summary>
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class ResourceSchema
    {
        /// <summary>
        /// Database table name for resource data.
        /// </summary>
        public const string TableName = "umbContentAuditResources";

        /// <summary>
        /// Initializes a new instance of the <see cref="ResourceSchema"/> class.
        /// </summary>
        public ResourceSchema() { }

        /// <summary>
        /// Initializes a new instance of the <see cref="ResourceSchema"/> class from a DTO.
        /// </summary>
        /// <param name="dto">The data transfer object containing resource data.</param>
        public ResourceSchema(ResourceDto dto)
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
        /// Gets or sets the resource URL.
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? Url { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the resource is external.
        /// </summary>
        public bool IsExternal { get; set; }

        /// <summary>
        /// Gets or sets the resource size in bytes.
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        public double? Size { get; set; }

        /// <summary>
        /// Gets or sets the HTTP status code when retrieving the resource.
        /// </summary>
        public int StatusCode { get; set; }

        /// <summary>
        /// Gets or sets the resource content type.
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? ContentType { get; set; }

        /// <summary>
        /// Gets or sets the URL of the page where the resource was found.
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? FoundPage { get; set; }

        /// <summary>
        /// Gets or sets a unique identifier for the resource across the audit run.
        /// </summary>
        public Guid Unique { get; set; }

        /// <summary>
        /// Gets the creation date in UTC.
        /// </summary>
        public DateTime CreatedDate => DateTime.UtcNow;
    }
}