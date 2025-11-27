using System.Text.Json.Serialization;
using Umbraco.Community.ContentAudit.Enums;
using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    /// <summary>
    /// Data transfer object representing a web performance metric.
    /// </summary>
    /// <remarks>
    /// This DTO is used to serialize metric data in audit reports and API responses.
    /// It implements IMetricDto to provide structured metric information for performance analysis.
    /// </remarks>
    public class MetricDto : IMetricDto
    {
        /// <inheritdoc/>
        [JsonPropertyName("name")]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public MetricName Name { get; set; }

        /// <inheritdoc/>
        [JsonPropertyName("value")]
        public double Value { get; set; }

        /// <inheritdoc/>
        [JsonPropertyName("rating")]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public MetricRating Rating { get; set; }
    }
}
