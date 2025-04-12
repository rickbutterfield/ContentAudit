using System.Text.Json;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class AccessibilityDto
    {
        public AccessibilityDto() { }

        public AccessibilityDto(AccessibilitySchema schema)
        {
            Id = schema.Id;
            RunId = schema.RunId;
            Url = schema.Url;
            AccessibilityIssues = JsonSerializer.Deserialize<List<string>>(schema.AccessibilityIssues);
            AriaLabelCount = schema.AriaLabelCount;
            AriaDescribedByCount = schema.AriaDescribedByCount;
            HasSkipToContent = schema.HasSkipToContent;
            HasProperHeadingStructure = schema.HasProperHeadingStructure;
            ColorContrastIssues = JsonSerializer.Deserialize<List<string>>(schema.ColorContrastIssues);
            CreatedDate = schema.CreatedDate;
        }

        public int Id { get; set; }
        public int RunId { get; set; }
        public string? Url { get; set; }
        public List<string>? AccessibilityIssues { get; set; }
        public int AriaLabelCount { get; set; }
        public int AriaDescribedByCount { get; set; }
        public bool HasSkipToContent { get; set; }
        public bool HasProperHeadingStructure { get; set; }
        public List<string>? ColorContrastIssues { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
