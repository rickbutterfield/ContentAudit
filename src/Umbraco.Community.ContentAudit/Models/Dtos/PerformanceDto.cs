using System.Text.Json;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    /// <summary>
    /// Data transfer object containing performance metrics for a single audited page.
    /// Captures Core Web Vitals and resource metrics collected during the audit, including
    /// CLS (Cumulative Layout Shift), FCP (First Contentful Paint), LCP (Largest Contentful Paint),
    /// TTI (Time to Interactive), and TTFB (Time to First Byte).
    /// </summary>
    public class PerformanceDto
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="PerformanceDto"/> class.
        /// </summary>
        public PerformanceDto() { }

        /// <summary>
        /// Initializes a new instance of the <see cref="PerformanceDto"/> class from a <see cref="PerformanceSchema"/>.
        /// Deserializes JSON-stored metric data into strongly-typed metric objects.
        /// </summary>
        /// <param name="schema">The performance schema object containing serialized metric data.</param>
        public PerformanceDto(PerformanceSchema schema)
        {
            Id = schema.Id;
            AuditKey = schema.AuditKey;
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
            ResourceTimings = JsonSerializer.Deserialize<List<ResourceTimingDto>>(schema.ResourceTimings!);
            CreatedDate = schema.CreatedDate;
        }

        /// <summary>
        /// Gets or sets the unique identifier for this performance record.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the audit key that uniquely identifies the parent audit run.
        /// </summary>
        public Guid AuditKey { get; set; }

        /// <summary>
        /// Gets or sets the URL of the page for which performance metrics were collected.
        /// </summary>
        public string? Url { get; set; }

        /// <summary>
        /// Gets or sets the total time in milliseconds required to fully load the page.
        /// Represents the time from initial navigation until the page is interactive.
        /// </summary>
        public long? PageLoadTime { get; set; }

        /// <summary>
        /// Gets or sets the Cumulative Layout Shift (CLS) metric.
        /// Measures visual stability by quantifying how much the page's layout shifts during loading.
        /// Core Web Vital: values should be less than 0.1 for a good user experience.
        /// </summary>
        public MetricDto? CumulativeLayoutShift { get; set; }

        /// <summary>
        /// Gets or sets the First Contentful Paint (FCP) metric.
        /// Measures the time when the browser paints the first content (text, images, or background colors) to the screen.
        /// Indicates the start of page rendering; target is under 1.8 seconds.
        /// </summary>
        public MetricDto? FirstContentfulPaint { get; set; }

        /// <summary>
        /// Gets or sets the Largest Contentful Paint (LCP) metric.
        /// Measures the time when the largest content element becomes visible in the viewport.
        /// Core Web Vital: target is under 2.5 seconds for good performance.
        /// </summary>
        public MetricDto? LargestContentfulPaint { get; set; }

        /// <summary>
        /// Gets or sets the Time to Interactive (TTI) metric.
        /// Measures when the page becomes fully interactive and responsive to user input.
        /// Target is under 3.8 seconds for good user experience.
        /// </summary>
        public MetricDto? TimeToInteractive { get; set; }

        /// <summary>
        /// Gets or sets the Time to First Byte (TTFB) metric.
        /// Measures the time from the start of the request to when the server sends the first byte of the response.
        /// Indicates server response performance; target is under 600 milliseconds.
        /// </summary>
        public MetricDto? TimeToFirstByte { get; set; }

        /// <summary>
        /// Gets or sets the total number of HTTP requests made to load the page.
        /// Includes all requests for HTML, CSS, JavaScript, images, fonts, and other resources.
        /// </summary>
        public int? TotalRequests { get; set; }

        /// <summary>
        /// Gets or sets the total number of bytes transferred to load the page.
        /// Represents the combined size of all resources fetched, useful for analyzing page weight and bandwidth usage.
        /// </summary>
        public int? TotalBytes { get; set; }

        /// <summary>
        /// Gets or sets the detailed resource timing information for individual page resources.
        /// Contains metrics such as download time, processing time, and size for each resource loaded.
        /// </summary>
        public List<ResourceTimingDto>? ResourceTimings { get; set; }

        /// <summary>
        /// Gets or sets the date and time when the performance metrics were collected.
        /// </summary>
        public DateTime CreatedDate { get; set; }
    }
}
