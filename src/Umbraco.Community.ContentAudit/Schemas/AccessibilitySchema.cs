using NPoco;
using System.Text.Json;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Schemas
{
    /// <summary>
    /// Database schema for accessibility audit data including ARIA attributes and contrast issues
    /// </summary>
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class AccessibilitySchema
    {
        /// <summary>
        /// Database table name for accessibility data
        /// </summary>
        public const string TableName = "umbContentAuditAccessibility";

        /// <summary>
        /// Initializes a new instance of the AccessibilitySchema
        /// </summary>
        public AccessibilitySchema() { }

        /// <summary>
        /// Initializes a new instance of the AccessibilitySchema from a DTO
        /// </summary>
        /// <param name="dto">The data transfer object containing accessibility data</param>
        public AccessibilitySchema(AccessibilityDto dto)
        {
            Id = dto.Id;
            AuditKey = dto.AuditKey;
            Url = dto.Url;
            AccessibilityIssues = JsonSerializer.Serialize(dto.AccessibilityIssues);
            AriaLabelCount = dto.AriaLabelCount;
            AriaDescribedByCount = dto.AriaDescribedByCount;
            HasSkipToContent = dto.HasSkipToContent;
            HasProperHeadingStructure = dto.HasProperHeadingStructure;
            ColorContrastIssues = JsonSerializer.Serialize(dto.ColorContrastIssues);
        }

        /// <summary>
        /// Gets or sets the unique identifier
        /// </summary>
        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the audit run identifier (GUID)
        /// </summary>
        public Guid AuditKey { get; set; }

        /// <summary>
        /// Gets or sets the audit run identifier (legacy - kept for migration safety)
        /// </summary>
        public int RunId { get; set; }

        /// <summary>
        /// Gets or sets the page URL
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? Url { get; set; }

        /// <summary>
        /// Gets or sets the accessibility issues as JSON
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? AccessibilityIssues { get; set; }

        /// <summary>
        /// Gets or sets the count of ARIA label attributes
        /// </summary>
        public int AriaLabelCount { get; set; }

        /// <summary>
        /// Gets or sets the count of ARIA describedby attributes
        /// </summary>
        public int AriaDescribedByCount { get; set; }

        /// <summary>
        /// Gets or sets whether the page has a skip-to-content link
        /// </summary>
        public bool HasSkipToContent { get; set; }

        /// <summary>
        /// Gets or sets whether the page has proper heading structure
        /// </summary>
        public bool HasProperHeadingStructure { get; set; }

        /// <summary>
        /// Gets or sets color contrast issues as JSON
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? ColorContrastIssues { get; set; }

        /// <summary>
        /// Gets the creation date in UTC
        /// </summary>
        public DateTime CreatedDate => DateTime.UtcNow;
    }
} 