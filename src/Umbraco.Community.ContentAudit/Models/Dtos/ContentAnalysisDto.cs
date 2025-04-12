using System.Text.Json;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class ContentAnalysisDto
    {
        public ContentAnalysisDto() { }

        public ContentAnalysisDto(ContentAnalysisSchema schema)
        {
            Id = schema.Id;
            RunId = schema.RunId;
            Url = schema.Url;
            WordCount = schema.WordCount;
            ParagraphCount = schema.ParagraphCount;
            Images = schema.Images;
            Resources = schema.Resources;
            Links = schema.Links;
            ExternalLinks = schema.ExternalLinks;
            InternalLinks = schema.InternalLinks;
            ReadabilityScore = schema.ReadabilityScore;
            KeywordDensity = JsonSerializer.Deserialize<Dictionary<string, int>>(schema.KeywordDensity);
            MissingAltTextImages = schema.MissingAltTextImages;
            MissingTitleImages = schema.MissingTitleImages;
            CreatedDate = schema.CreatedDate;
        }

        public int Id { get; set; }
        public int RunId { get; set; }
        public string? Url { get; set; }
        public int WordCount { get; set; }
        public int ParagraphCount { get; set; }
        public int Images { get; set; }
        public int Resources { get; set; }
        public int Links { get; set; }
        public int ExternalLinks { get; set; }
        public int InternalLinks { get; set; }
        public double ReadabilityScore { get; set; }
        public Dictionary<string, int>? KeywordDensity { get; set; }
        public string? MissingAltTextImages { get; set; }
        public string? MissingTitleImages { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
