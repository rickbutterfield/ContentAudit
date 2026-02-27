using System.Text.Json.Serialization;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class CrawlStatusDto
    {
        [JsonPropertyName("isRunning")]
        public bool IsRunning { get; set; }

        [JsonPropertyName("results")]
        public IReadOnlyList<CrawlDto> Results { get; set; } = [];

        [JsonPropertyName("phase")]
        public string? Phase { get; set; }
    }
}
