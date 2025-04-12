using System.Text.Json;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class ContentQualityDto
    {
        public ContentQualityDto() { }

        public ContentQualityDto(ContentQualitySchema schema)
        {
            Id = schema.Id;
            RunId = schema.RunId;
            Url = schema.Url;
            HasDuplicateContent = schema.HasDuplicateContent;
            DuplicateContentUrls = JsonSerializer.Deserialize<List<string>>(schema.DuplicateContentUrls);
            HasThinContent = schema.HasThinContent;
            ContentScore = schema.ContentScore;
            ContentGaps = JsonSerializer.Deserialize<List<string>>(schema.ContentGaps);
            ContentStrengths = JsonSerializer.Deserialize<List<string>>(schema.ContentStrengths);
            CreatedDate = schema.CreatedDate;
        }

        public int Id { get; set; }
        public int RunId { get; set; }
        public string? Url { get; set; }
        public bool HasDuplicateContent { get; set; }
        public List<string>? DuplicateContentUrls { get; set; }
        public bool HasThinContent { get; set; }
        public int ContentScore { get; set; }
        public List<string>? ContentGaps { get; set; }
        public List<string>? ContentStrengths { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
