using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace Umbraco.Community.ContentAudit.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class ContentQualitySchema
    {
        public const string TableName = "umbContentAuditQuality";

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