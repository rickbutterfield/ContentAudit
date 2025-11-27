using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Models
{
    /// <summary>
    /// Represents comprehensive analysis data for a single page audited by the content audit system.
    /// </summary>
    /// <remarks>
    /// This data transfer object aggregates all analysis results for a page, including discovered links,
    /// resources, images, detected issues, and detailed metric data across multiple audit categories
    /// (SEO, performance, accessibility, technical SEO, social media, content quality, and emissions).
    /// Inherits from <see cref="BaseContentAuditDto"/> for common audit data properties.
    /// </remarks>
    public class PageAnalysisDto : BaseContentAuditDto
    {
        /// <summary>
        /// Gets or sets the collection of links discovered on the analyzed page.
        /// </summary>
        /// <remarks>
        /// This includes internal and external hyperlinks found during the crawl.
        /// </remarks>
        public List<LinkDto> Links { get; set; } = new List<LinkDto>();

        /// <summary>
        /// Gets or sets the collection of resources referenced by the analyzed page.
        /// </summary>
        /// <remarks>
        /// This includes stylesheets, scripts, and other resource files loaded by the page.
        /// </remarks>
        public List<ResourceDto> Resources { get; set; } = new List<ResourceDto>();

        /// <summary>
        /// Gets or sets the collection of images found on the analyzed page.
        /// </summary>
        /// <remarks>
        /// This includes all image assets detected during the page analysis.
        /// </remarks>
        public List<ImageDto> Images { get; set; } = new List<ImageDto>();

        /// <summary>
        /// Gets or sets the collection of audit issues detected on the analyzed page.
        /// </summary>
        /// <remarks>
        /// This includes all problems, warnings, and notifications identified during the audit process.
        /// </remarks>
        public List<IssueDto> Issues { get; set; } = new List<IssueDto>();

        /// <summary>
        /// Gets or sets the overall health score data for the analyzed page.
        /// </summary>
        /// <remarks>
        /// This represents a composite score indicating the overall quality and compliance of the page.
        /// </remarks>
        public HealthScoreDto HealthScore { get; set; } = new();

        /// <summary>
        /// Gets or sets the basic page metadata and information.
        /// </summary>
        /// <remarks>
        /// This includes page title, URL, load time, and other fundamental page properties.
        /// </remarks>
        public PageDto PageData { get; set; } = new();

        /// <summary>
        /// Gets or sets the SEO-related analysis data for the page.
        /// </summary>
        /// <remarks>
        /// This includes meta descriptions, keywords, structured data, and other SEO metrics.
        /// </remarks>
        public SeoDto SeoData { get; set; } = new();

        /// <summary>
        /// Gets or sets the content analysis data including readability and quality metrics.
        /// </summary>
        /// <remarks>
        /// This includes word count, reading time, heading hierarchy, and content structure analysis.
        /// </remarks>
        public ContentAnalysisDto ContentAnalysis { get; set; } = new();

        /// <summary>
        /// Gets or sets the performance metrics data for the analyzed page.
        /// </summary>
        /// <remarks>
        /// This includes Core Web Vitals, page load time, resource sizes, and other performance indicators.
        /// </remarks>
        public PerformanceDto PerformanceData { get; set; } = new();

        /// <summary>
        /// Gets or sets the accessibility analysis data for the analyzed page.
        /// </summary>
        /// <remarks>
        /// This includes WCAG compliance checks, alt text verification, color contrast analysis, and accessibility issues.
        /// </remarks>
        public AccessibilityDto AccessibilityData { get; set; } = new();

        /// <summary>
        /// Gets or sets the technical SEO analysis data for the analyzed page.
        /// </summary>
        /// <remarks>
        /// This includes robots meta tags, canonical URLs, schema validation, and other technical SEO indicators.
        /// </remarks>
        public TechnicalSeoDto TechnicalSeoData { get; set; } = new();

        /// <summary>
        /// Gets or sets the social media metadata analysis data for the analyzed page.
        /// </summary>
        /// <remarks>
        /// This includes Open Graph tags, Twitter Card data, and other social sharing metadata.
        /// </remarks>
        public SocialMediaDto SocialMediaData { get; set; } = new();

        /// <summary>
        /// Gets or sets the content quality analysis data for the analyzed page.
        /// </summary>
        /// <remarks>
        /// This includes metrics for content freshness, originality, structure, and overall quality assessment.
        /// </remarks>
        public ContentQualityDto ContentQualityData { get; set; } = new();

        /// <summary>
        /// Gets or sets the carbon emissions data for the analyzed page.
        /// </summary>
        /// <remarks>
        /// This includes estimated environmental impact metrics using the Sustainable Web Design methodology.
        /// </remarks>
        public EmissionsDto EmissionsData { get; set; } = new();
    }
} 