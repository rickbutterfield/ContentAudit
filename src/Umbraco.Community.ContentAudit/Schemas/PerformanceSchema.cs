using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace Umbraco.Community.ContentAudit.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class PerformanceSchema
    {
        public const string TableName = "umbContentAuditPerformance";

        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }
        public int RunId { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? Url { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public long? PageLoadTime { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public long? FirstContentfulPaint { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public long? LargestContentfulPaint { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public long? TimeToInteractive { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public int? TotalRequests { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public int? TotalBytes { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? ResourceTimings { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }

    public class ResourceTiming
    {
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? Url { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? ResourceType { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public long? Duration { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public long? StartTime { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public int? Size { get; set; }
    }
} 