using System.Text.Json;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class PerformanceDto
    {
        public PerformanceDto() { }

        public PerformanceDto(PerformanceSchema schema)
        {
            Id = schema.Id;
            RunId = schema.RunId;
            Url = schema.Url;
            PageLoadTime = schema.PageLoadTime;
            if (!string.IsNullOrEmpty(schema.CumulativeLayoutShift))
            {
                CumulativeLayoutShift = JsonSerializer.Deserialize<MetricDto>(schema.CumulativeLayoutShift);
            }
            if (!string.IsNullOrEmpty(schema.FirstContentfulPaint))
            {
                FirstContentfulPaint = JsonSerializer.Deserialize<MetricDto>(schema.FirstContentfulPaint);
            }
            if (!string.IsNullOrEmpty(schema.LargestContentfulPaint))
            {
                LargestContentfulPaint = JsonSerializer.Deserialize<MetricDto>(schema.LargestContentfulPaint);
            }
            if (!string.IsNullOrEmpty(schema.TimeToInteractive))
            {
                TimeToInteractive = JsonSerializer.Deserialize<MetricDto>(schema.TimeToInteractive);
            }
            if (!string.IsNullOrEmpty(schema.TimeToFirstByte))
            {
                TimeToFirstByte = JsonSerializer.Deserialize<MetricDto>(schema.TimeToFirstByte);
            }
            TotalRequests = schema.TotalRequests;
            TotalBytes = schema.TotalBytes;
            ResourceTimings = JsonSerializer.Deserialize<List<ResourceTimingDto>>(schema.ResourceTimings);
            CreatedDate = schema.CreatedDate;
        }

        public int Id { get; set; }
        public int RunId { get; set; }
        public string? Url { get; set; }
        public long? PageLoadTime { get; set; }
        public MetricDto? CumulativeLayoutShift { get; set; }
        public MetricDto? FirstContentfulPaint { get; set; }
        public MetricDto? LargestContentfulPaint { get; set; }
        public MetricDto? TimeToInteractive { get; set; }
        public MetricDto? TimeToFirstByte { get; set; }
        public int? TotalRequests { get; set; }
        public int? TotalBytes { get; set; }
        public List<ResourceTimingDto>? ResourceTimings { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
