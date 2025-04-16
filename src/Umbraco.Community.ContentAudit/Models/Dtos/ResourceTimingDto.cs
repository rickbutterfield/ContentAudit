using System.Text.Json.Serialization;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class ResourceTimingDto
    {
        [NullSetting(NullSetting = NullSettings.Null)]
        [JsonPropertyName("url")]
        public string? Url { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        [JsonPropertyName("resourceType")]
        public string? ResourceType { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        [JsonPropertyName("duration")]
        public double? Duration { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        [JsonPropertyName("startTime")]
        public double? StartTime { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        [JsonPropertyName("size")]
        public int? Size { get; set; }
    }
}
