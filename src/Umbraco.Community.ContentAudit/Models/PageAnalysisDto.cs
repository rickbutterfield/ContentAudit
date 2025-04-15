using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Models
{
    public class PageAnalysisDto : BaseContentAuditDto
    {
        public List<LinkDto> Links { get; set; } = new List<LinkDto>();
        public List<ResourceDto> Resources { get; set; } = new List<ResourceDto>();
        public List<ImageDto> Images { get; set; } = new List<ImageDto>();

        public List<IssueDto> Issues { get; set; } = new List<IssueDto>();

        public PageDto PageData { get; set; } = new();
        public SeoDto SeoData { get; set; } = new();
        public ContentAnalysisDto ContentAnalysis { get; set; } = new();
        public PerformanceDto PerformanceData { get; set; } = new();
        public AccessibilityDto AccessibilityData { get; set; } = new();
        public TechnicalSeoDto TechnicalSeoData { get; set; } = new();
        public SocialMediaDto SocialMediaData { get; set; } = new();
        public ContentQualityDto ContentQualityData { get; set; } = new();
        public EmissionsDto EmissionsData { get; set; } = new();
    }
} 