using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Models
{
    public class PageAnalysisDto : BaseContentAuditDto
    {
        public List<LinkDto>? Links { get; set; } = new List<LinkDto>();
        public List<ResourceDto>? Resources { get; set; } = new List<ResourceDto>();
        public List<ImageDto>? Images { get; set; } = new List<ImageDto>();

        public PageDto? PageData { get; set; }
        public SeoDto? SeoData { get; set; }
        public ContentAnalysisDto? ContentAnalysis { get; set; }
        public PerformanceDto? PerformanceData { get; set; }
        public AccessibilityDto? AccessibilityData { get; set; }
        public TechnicalSeoDto? TechnicalSeoData { get; set; }
        public SocialMediaDto? SocialMediaData { get; set; }
        public ContentQualityDto? ContentQualityData { get; set; }
        public EmissionsDto? EmissionsData { get; set; }
    }
} 