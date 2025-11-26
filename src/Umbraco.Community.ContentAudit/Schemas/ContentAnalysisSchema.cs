using NPoco;
using System.Text.Json;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Schemas
{
    /// <summary>
    /// Database schema for content analysis data including word counts, links, and images
    /// </summary>
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class ContentAnalysisSchema
    {
        /// <summary>
        /// Database table name for content analysis data
        /// </summary>
        public const string TableName = "umbContentAuditAnalysis";

        /// <summary>
        /// Initializes a new instance of the ContentAnalysisSchema
        /// </summary>
        public ContentAnalysisSchema() { }

        /// <summary>
        /// Initializes a new instance of the ContentAnalysisSchema from a DTO
        /// </summary>
        /// <param name="dto">The data transfer object containing content analysis data</param>
        public ContentAnalysisSchema(ContentAnalysisDto dto)
        {
            Id = dto.Id;
            AuditKey = dto.AuditKey;
            Url = dto.Url;
            WordCount = dto.WordCount;
            ParagraphCount = dto.ParagraphCount;
            Images = dto.Images;
            Resources = dto.Resources;
            Links = dto.Links;
            ExternalLinks = dto.ExternalLinks;
            InternalLinks = dto.InternalLinks;
            ReadabilityScore = dto.ReadabilityScore;
            KeywordDensity = JsonSerializer.Serialize(dto.KeywordDensity);
            MissingAltTextImages = dto.MissingAltTextImages;
            MissingTitleImages = dto.MissingTitleImages;
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
        /// Gets or sets the total word count on the page
        /// </summary>
        public int WordCount { get; set; }

        /// <summary>
        /// Gets or sets the total paragraph count
        /// </summary>
        public int ParagraphCount { get; set; }

        /// <summary>
        /// Gets or sets the total number of images
        /// </summary>
        public int Images { get; set; }

        /// <summary>
        /// Gets or sets the total number of resources (scripts, stylesheets)
        /// </summary>
        public int Resources { get; set; }

        /// <summary>
        /// Gets or sets the total number of links
        /// </summary>
        public int Links { get; set; }

        /// <summary>
        /// Gets or sets the number of external links
        /// </summary>
        public int ExternalLinks { get; set; }

        /// <summary>
        /// Gets or sets the number of internal links
        /// </summary>
        public int InternalLinks { get; set; }

        /// <summary>
        /// Gets or sets the readability score (Flesch Reading Ease)
        /// </summary>
        public double ReadabilityScore { get; set; }

        /// <summary>
        /// Gets or sets the keyword density data as JSON
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? KeywordDensity { get; set; }

        /// <summary>
        /// Gets or sets the list of images missing alt text as JSON
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? MissingAltTextImages { get; set; }

        /// <summary>
        /// Gets or sets the list of images missing title attributes as JSON
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? MissingTitleImages { get; set; }

        /// <summary>
        /// Gets the creation date in UTC
        /// </summary>
        public DateTime CreatedDate => DateTime.UtcNow;
    }
}