using NPoco;
using System.Text.Json;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Schemas
{
    /// <summary>
    /// Database schema for performance metrics including Core Web Vitals
    /// </summary>
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class PerformanceSchema
    {
        /// <summary>
        /// Database table name for performance data
        /// </summary>
        public const string TableName = "umbContentAuditPerformance";

        /// <summary>
        /// Initializes a new instance of the PerformanceSchema
        /// </summary>
        public PerformanceSchema() { }

        /// <summary>
        /// Initializes a new instance of the PerformanceSchema from a DTO
        /// </summary>
        /// <param name="dto">The data transfer object containing performance data</param>
        public PerformanceSchema(PerformanceDto dto)
        {
            Id = dto.Id;
            AuditKey = dto.AuditKey;
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
        /// Gets or sets the page load time in milliseconds
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        public long? PageLoadTime { get; set; }

        /// <summary>
        /// Gets or sets the Cumulative Layout Shift (CLS) metric as JSON
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? CumulativeLayoutShift { get; set; }

        /// <summary>
        /// Gets or sets the First Contentful Paint (FCP) metric as JSON
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? FirstContentfulPaint { get; set; }

        /// <summary>
        /// Gets or sets the Largest Contentful Paint (LCP) metric as JSON
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? LargestContentfulPaint { get; set; }

        /// <summary>
        /// Gets or sets the Time to Interactive (TTI) metric as JSON
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? TimeToInteractive { get; set; }

        /// <summary>
        /// Gets or sets the Time to First Byte (TTFB) metric as JSON
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? TimeToFirstByte { get; set; }

        /// <summary>
        /// Gets or sets the total number of HTTP requests made
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        public int? TotalRequests { get; set; }

        /// <summary>
        /// Gets or sets the total bytes transferred
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        public int? TotalBytes { get; set; }

        /// <summary>
        /// Gets or sets the resource timing data as JSON
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? ResourceTimings { get; set; }

        /// <summary>
        /// Gets the creation date in UTC
        /// </summary>
        public DateTime CreatedDate => DateTime.UtcNow;
    }
} 