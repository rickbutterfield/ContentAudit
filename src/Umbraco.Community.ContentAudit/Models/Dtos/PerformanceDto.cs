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
            FirstContentfulPaint = schema.FirstContentfulPaint;
            LargestContentfulPaint = schema.LargestContentfulPaint;
            TimeToInteractive = schema.TimeToInteractive;
            TotalRequests = schema.TotalRequests;
            TotalBytes = schema.TotalBytes;
            ResourceTimings = JsonSerializer.Deserialize<List<ResourceTimingDto>>(schema.ResourceTimings);
            CreatedDate = schema.CreatedDate;
        }

        public int Id { get; set; }
        public int RunId { get; set; }
        public string? Url { get; set; }
        public long? PageLoadTime { get; set; }
        public long? FirstContentfulPaint { get; set; }
        public long? LargestContentfulPaint { get; set; }
        public long? TimeToInteractive { get; set; }
        public int? TotalRequests { get; set; }
        public int? TotalBytes { get; set; }
        public List<ResourceTimingDto>? ResourceTimings { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
