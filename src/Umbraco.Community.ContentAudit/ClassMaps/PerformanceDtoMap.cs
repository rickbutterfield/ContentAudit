using CsvHelper.Configuration;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.ClassMaps
{
    public class PerformanceDtoMap : ClassMap<PerformanceDto>
    {
        public PerformanceDtoMap()
        {
            Map(m => m.PageLoadTime).Name("Page Load Time (ms)");
            Map(m => m.CumulativeLayoutShift).Name("Cumulative Layout Shift");
            Map(m => m.FirstContentfulPaint).Name("First Contentful Paint");
            Map(m => m.LargestContentfulPaint).Name("Largest Contentful Paint");
            Map(m => m.TimeToInteractive).Name("Time To Interactive");
            Map(m => m.TimeToFirstByte).Name("Time To First Byte");
            Map(m => m.TotalRequests).Name("Total Requests");
            Map(m => m.TotalBytes).Name("Total Bytes");
            Map(m => m.ResourceTimings).Name("Resource Timings");
        }
    }
}
