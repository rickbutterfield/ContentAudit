using NPoco;
using System.Text.Json;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Schemas
{
    /// <summary>
    /// Database schema for content quality analysis including duplication, thin content, and content scoring.
    /// </summary>
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class ContentQualitySchema
    {
        /// <summary>
        /// Database table name for content quality data.
        /// </summary>
        public const string TableName = "umbContentAuditQuality";

        /// <summary>
        /// Initializes a new instance of the <see cref="ContentQualitySchema"/> class.
        /// </summary>
        public ContentQualitySchema() { }

        /// <summary>
        /// Initializes a new instance of the <see cref="ContentQualitySchema"/> class from a DTO.
        /// </summary>
        /// <param name="dto">The data transfer object containing content quality data.</param>
        public ContentQualitySchema(ContentQualityDto dto)
        {
            Id = dto.Id;
            AuditKey = dto.AuditKey;
            Url = dto.Url;
            HasDuplicateContent = dto.HasDuplicateContent;
            DuplicateContentUrls = JsonSerializer.Serialize(dto.DuplicateContentUrls);
            HasThinContent = dto.HasThinContent;
            ContentScore = dto.ContentScore;
            ContentGaps = JsonSerializer.Serialize(dto.ContentGaps);
            ContentStrengths = JsonSerializer.Serialize(dto.ContentStrengths);
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
        /// Gets or sets the page URL.
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? Url { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the content is duplicate.
        /// </summary>
        public bool HasDuplicateContent { get; set; }
        
        /// <summary>
        /// Gets or sets the list of duplicate content URLs as JSON.
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? DuplicateContentUrls { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the content is considered thin.
        /// </summary>
        public bool HasThinContent { get; set; }

        /// <summary>
        /// Gets or sets the calculated content quality score.
        /// </summary>
        public int ContentScore { get; set; }
        
        /// <summary>
        /// Gets or sets identified content gaps as JSON.
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? ContentGaps { get; set; }
        
        /// <summary>
        /// Gets or sets identified content strengths as JSON.
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? ContentStrengths { get; set; }

        /// <summary>
        /// Gets the creation date.
        /// </summary>
        public DateTime CreatedDate => DateTime.UtcNow;
    }
} 