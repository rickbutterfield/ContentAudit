using NPoco;
using System.Text.Json;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class ContentQualitySchema
    {
        public const string TableName = "umbContentAuditQuality";

        public ContentQualitySchema() { }

        public ContentQualitySchema(ContentQualityDto dto)
        {
            Id = dto.Id;
            RunId = dto.RunId;
            Url = dto.Url;
            HasDuplicateContent = dto.HasDuplicateContent;
            DuplicateContentUrls = JsonSerializer.Serialize(dto.DuplicateContentUrls);
            HasThinContent = dto.HasThinContent;
            ContentScore = dto.ContentScore;
            ContentGaps = JsonSerializer.Serialize(dto.ContentGaps);
            ContentStrengths = JsonSerializer.Serialize(dto.ContentStrengths);
            CreatedDate = dto.CreatedDate;
        }

        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }
        public int RunId { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? Url { get; set; }
        public bool HasDuplicateContent { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? DuplicateContentUrls { get; set; }
        public bool HasThinContent { get; set; }
        public int ContentScore { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? ContentGaps { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? ContentStrengths { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
} 