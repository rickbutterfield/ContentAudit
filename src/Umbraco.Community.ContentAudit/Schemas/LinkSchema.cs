using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Schemas
{
    /// <summary>
    /// Database schema for link records discovered during audits.
    /// </summary>
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class LinkSchema
    {
        /// <summary>
        /// Database table name for link data.
        /// </summary>
        public const string TableName = "umbContentAuditLinks";

        /// <summary>
        /// Initializes a new instance of the <see cref="LinkSchema"/> class.
        /// </summary>
        public LinkSchema() { }

        /// <summary>
        /// Initializes a new instance of the <see cref="LinkSchema"/> class from a DTO.
        /// </summary>
        /// <param name="dto">The data transfer object containing link data.</param>
        public LinkSchema(LinkDto dto)
        {
            Id = dto.Id;
            AuditKey = dto.AuditKey;
            Url = dto.Url;
            IsExternal = dto.IsExternal;
            FoundPage = dto.FoundPage;
            StatusCode = dto.StatusCode;
            ContentType = dto.ContentType;
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
        /// Gets or sets the link URL.
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? Url { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the link points to an external resource.
        /// </summary>
        public bool IsExternal { get; set; }

        /// <summary>
        /// Gets or sets the URL of the page where the link was found.
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? FoundPage { get; set; }

        /// <summary>
        /// Gets or sets the HTTP status code for the link target.
        /// </summary>
        public int StatusCode { get; set; }

        /// <summary>
        /// Gets or sets the content type of the link target.
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? ContentType { get; set; }

        /// <summary>
        /// Gets the creation date in UTC.
        /// </summary>
        public DateTime CreatedDate => DateTime.UtcNow;
    }
}