using NPoco;
using System.Text.Json;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class PerformanceSchema
    {
        public const string TableName = "umbContentAuditPerformance";

        public PerformanceSchema() { }

        public PerformanceSchema(PerformanceDto dto)
        {
            Id = dto.Id;
            RunId = dto.RunId;
            Url = dto.Url;
            PageLoadTime = dto.PageLoadTime;
            FirstContentfulPaint = dto.FirstContentfulPaint;
            LargestContentfulPaint = dto.LargestContentfulPaint;
            TimeToInteractive = dto.TimeToInteractive;
            TotalRequests = dto.TotalRequests;
            TotalBytes = dto.TotalBytes;
            ResourceTimings = JsonSerializer.Serialize(dto.ResourceTimings);
        }

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
        public DateTime CreatedDate => DateTime.UtcNow;
    }
} 