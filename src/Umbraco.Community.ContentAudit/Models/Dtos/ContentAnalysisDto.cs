using System.Text.Json;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    /// <summary>
    /// Data transfer object containing content analysis metrics for an audited page.
    /// Includes word counts, structure analysis, links, readability scoring, and accessibility metrics.
    /// </summary>
    public class ContentAnalysisDto
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ContentAnalysisDto"/> class.
        /// </summary>
        public ContentAnalysisDto() { }

        /// <summary>
        /// Initializes a new instance of the <see cref="ContentAnalysisDto"/> class from a <see cref="ContentAnalysisSchema"/>.
        /// </summary>
        /// <param name="schema">The content analysis schema containing the analyzed page metrics.</param>
        public ContentAnalysisDto(ContentAnalysisSchema schema)
        {
            Id = schema.Id;
            AuditKey = schema.AuditKey;
            Url = schema.Url;
            WordCount = schema.WordCount;
            ParagraphCount = schema.ParagraphCount;
            Images = schema.Images;
            Resources = schema.Resources;
            Links = schema.Links;
            ExternalLinks = schema.ExternalLinks;
            InternalLinks = schema.InternalLinks;
            ReadabilityScore = schema.ReadabilityScore;
            KeywordDensity = JsonSerializer.Deserialize<Dictionary<string, int>>(schema.KeywordDensity!);
            MissingAltTextImages = schema.MissingAltTextImages;
            MissingTitleImages = schema.MissingTitleImages;
        }

        /// <summary>
        /// Gets or sets the unique database identifier for this content analysis record.
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
        /// Gets or sets the total number of words on the page.
        /// </summary>
        public int WordCount { get; set; }

        /// <summary>
        /// Gets or sets the total number of paragraphs on the page.
        /// </summary>
        public int ParagraphCount { get; set; }

        /// <summary>
        /// Gets or sets the total number of images on the page.
        /// </summary>
        public int Images { get; set; }

        /// <summary>
        /// Gets or sets the total number of external resources (CSS, JavaScript, etc.) on the page.
        /// </summary>
        public int Resources { get; set; }

        /// <summary>
        /// Gets or sets the total number of links (internal and external combined) on the page.
        /// </summary>
        public int Links { get; set; }

        /// <summary>
        /// Gets or sets the number of external links pointing to other domains.
        /// </summary>
        public int ExternalLinks { get; set; }

        /// <summary>
        /// Gets or sets the number of internal links pointing to pages within the same domain.
        /// </summary>
        public int InternalLinks { get; set; }

        /// <summary>
        /// Gets or sets the readability score (0-100) indicating how easy the content is to read and understand.
        /// </summary>
        public double ReadabilityScore { get; set; }

        /// <summary>
        /// Gets or sets a dictionary mapping keywords to their density (frequency) on the page.
        /// </summary>
        public Dictionary<string, int>? KeywordDensity { get; set; }

        /// <summary>
        /// Gets or sets a comma-separated list of image IDs or filenames missing alt text for accessibility.
        /// </summary>
        public string? MissingAltTextImages { get; set; }

        /// <summary>
        /// Gets or sets a comma-separated list of image IDs or filenames missing title attributes.
        /// </summary>
        public string? MissingTitleImages { get; set; }
    }
}
