using System.Text.Json.Serialization;
using Umbraco.Community.ContentAudit.Enums;
using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class MetricDto : IMetricDto
    {
        [JsonPropertyName("name")]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public MetricName Name { get; set; }

        [JsonPropertyName("value")]
        public double Value { get; set; }

        [JsonPropertyName("rating")]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public MetricRating Rating { get; set; }
    }
}
