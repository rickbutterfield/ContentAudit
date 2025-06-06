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
            CumulativeLayoutShift = JsonSerializer.Serialize(dto.CumulativeLayoutShift);
            FirstContentfulPaint = JsonSerializer.Serialize(dto.FirstContentfulPaint);
            LargestContentfulPaint = JsonSerializer.Serialize(dto.LargestContentfulPaint);
            TimeToInteractive = JsonSerializer.Serialize(dto.TimeToInteractive);
            TimeToFirstByte = JsonSerializer.Serialize(dto.TimeToFirstByte);
            TotalRequests = dto.TotalRequests;
            TotalBytes = dto.TotalBytes;
            ResourceTimings = JsonSerializer.Serialize(dto.ResourceTimings);
        }

        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }
        public int RunId { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? Url { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public long? PageLoadTime { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public string? CumulativeLayoutShift { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public string? FirstContentfulPaint { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? LargestContentfulPaint { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? TimeToInteractive { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public string? TimeToFirstByte { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public int? TotalRequests { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public int? TotalBytes { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? ResourceTimings { get; set; }

        public DateTime CreatedDate => DateTime.UtcNow;
    }
} 