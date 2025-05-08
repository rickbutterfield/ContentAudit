using CsvHelper.Configuration;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.ClassMaps
{
    public class AccessibilityDtoMap : ClassMap<AccessibilityDto>
    {
        public AccessibilityDtoMap()
        {
            Map(m => m.AccessibilityIssues).Name("Accessibility Issues");
            Map(m => m.AriaLabelCount).Name("Aria Label Count");
            Map(m => m.AriaDescribedByCount).Name("Aria Described By Count");
            Map(m => m.HasSkipToContent).Name("Has Skip To Content");
            Map(m => m.HasProperHeadingStructure).Name("Has Proper Heading Structure");
            Map(m => m.ColorContrastIssues).Name("Color Contrast Issues");
            Map(m => m.CreatedDate).Name("Created Date");
        }
    }
}
