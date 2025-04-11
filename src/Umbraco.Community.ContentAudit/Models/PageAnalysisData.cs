using Umbraco.Community.ContentAudit.Models.Dtos;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models
{
    public class PageAnalysisData
    {
        public PageDataDto? PageData { get; set; }
        public SeoSchema? SeoData { get; set; }
        public ContentAnalysisSchema? ContentAnalysis { get; set; }
        public PerformanceSchema? PerformanceData { get; set; }
        public AccessibilitySchema? AccessibilityData { get; set; }
        public TechnicalSeoSchema? TechnicalSeoData { get; set; }
        public SocialMediaSchema? SocialMediaData { get; set; }
        public ContentQualitySchema? ContentQualityData { get; set; }
    }
} 