using NPoco;
using System.Text.Json;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class AccessibilitySchema
    {
        public const string TableName = "umbContentAuditAccessibility";

        public AccessibilitySchema() { }

        public AccessibilitySchema(AccessibilityDto dto)
        {
            Id = dto.Id;
            RunId = dto.RunId;
            Url = dto.Url;
            AccessibilityIssues = JsonSerializer.Serialize(dto.AccessibilityIssues);
            AriaLabelCount = dto.AriaLabelCount;
            AriaDescribedByCount = dto.AriaDescribedByCount;
            HasSkipToContent = dto.HasSkipToContent;
            HasProperHeadingStructure = dto.HasProperHeadingStructure;
            ColorContrastIssues = JsonSerializer.Serialize(dto.ColorContrastIssues);
            CreatedDate = dto.CreatedDate;
        }

        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }
        public int RunId { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? Url { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? AccessibilityIssues { get; set; }
        public int AriaLabelCount { get; set; }
        public int AriaDescribedByCount { get; set; }
        public bool HasSkipToContent { get; set; }
        public bool HasProperHeadingStructure { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? ColorContrastIssues { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
} 