using System.Text.Json;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    /// <summary>
    /// Data transfer object containing content quality assessment data for an audited page.
    /// Evaluates duplicate content, thin content, and overall content quality metrics.
    /// </summary>
    public class ContentQualityDto
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ContentQualityDto"/> class.
        /// </summary>
        public ContentQualityDto() { }

        /// <summary>
        /// Initializes a new instance of the <see cref="ContentQualityDto"/> class from a <see cref="ContentQualitySchema"/>.
        /// </summary>
        /// <param name="schema">The content quality schema containing the quality assessment data.</param>
        public ContentQualityDto(ContentQualitySchema schema)
        {
            Id = schema.Id;
            AuditKey = schema.AuditKey;
            Url = schema.Url;
            HasDuplicateContent = schema.HasDuplicateContent;
            DuplicateContentUrls = JsonSerializer.Deserialize<List<string>>(schema.DuplicateContentUrls!);
            HasThinContent = schema.HasThinContent;
            ContentScore = schema.ContentScore;
            ContentGaps = JsonSerializer.Deserialize<List<string>>(schema.ContentGaps!);
            ContentStrengths = JsonSerializer.Deserialize<List<string>>(schema.ContentStrengths!);
            CreatedDate = schema.CreatedDate;
        }

        /// <summary>
        /// Gets or sets the unique database identifier for this content quality record.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the unique identifier of the audit run.
        /// </summary>
        public Guid AuditKey { get; set; }

        /// <summary>
        /// Gets or sets the URL of the audited page.
        /// </summary>
        public string? Url { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the page contains duplicate content found on other pages.
        /// </summary>
        public bool HasDuplicateContent { get; set; }

        /// <summary>
        /// Gets or sets a list of URLs where duplicate content has been detected.
        /// </summary>
        public List<string>? DuplicateContentUrls { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the page has thin content with insufficient depth or value.
        /// </summary>
        public bool HasThinContent { get; set; }

        /// <summary>
        /// Gets or sets the overall content quality score (typically 0-100).
        /// Higher scores indicate better content quality.
        /// </summary>
        public int ContentScore { get; set; }

        /// <summary>
        /// Gets or sets a list of identified gaps in the content that could be improved or expanded.
        /// </summary>
        public List<string>? ContentGaps { get; set; }

        /// <summary>
        /// Gets or sets a list of identified content strengths and areas where the content performs well.
        /// </summary>
        public List<string>? ContentStrengths { get; set; }

        /// <summary>
        /// Gets or sets the date and time when the content quality analysis was performed.
        /// </summary>
        public DateTime CreatedDate { get; set; }
    }
}
