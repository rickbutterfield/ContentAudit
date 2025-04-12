using NPoco;
using System.Text.Json;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class ContentAnalysisSchema
    {
        public const string TableName = "umbContentAuditAnalysis";

        public ContentAnalysisSchema() { }

        public ContentAnalysisSchema(ContentAnalysisDto dto)
        {
            Id = dto.Id;
            RunId = dto.RunId;
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
            CreatedDate = dto.CreatedDate;
        }

        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }
        public int RunId { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? Url { get; set; }
        public int WordCount { get; set; }
        public int ParagraphCount { get; set; }
        public int Images { get; set; }
        public int Resources { get; set; }
        public int Links { get; set; }
        public int ExternalLinks { get; set; }
        public int InternalLinks { get; set; }
        public double ReadabilityScore { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? KeywordDensity { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? MissingAltTextImages { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? MissingTitleImages { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}