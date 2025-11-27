using System.Text.Json.Serialization;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    /// <summary>
    /// Data transfer object representing timing metrics for a web resource, used for performance analysis.
    /// </summary>
    public class ResourceTimingDto
    {
        /// <summary>
        /// Gets or sets the URL of the resource being measured.
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [JsonPropertyName("url")]
        public string? Url { get; set; }

        /// <summary>
        /// Gets or sets the type of resource (e.g., "script", "stylesheet", "image", "fetch", "xmlhttprequest").
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [JsonPropertyName("resourceType")]
        public string? ResourceType { get; set; }

        /// <summary>
        /// Gets or sets the total duration in milliseconds that the resource took to load.
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [JsonPropertyName("duration")]
        public double? Duration { get; set; }

        /// <summary>
        /// Gets or sets the time in milliseconds when the resource began loading, relative to when the page started loading.
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [JsonPropertyName("startTime")]
        public double? StartTime { get; set; }

        /// <summary>
        /// Gets or sets the size of the resource in bytes.
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [JsonPropertyName("size")]
        public int? Size { get; set; }
    }
}
