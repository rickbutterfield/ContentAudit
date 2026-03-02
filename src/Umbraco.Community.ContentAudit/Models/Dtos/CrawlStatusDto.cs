using System.Text.Json.Serialization;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class CrawlStatusDto
    {
        [JsonPropertyName("isRunning")]
        public bool IsRunning { get; set; }

        [JsonPropertyName("phase")]
        public string? Phase { get; set; }

        [JsonPropertyName("total")]
        public int Total { get; set; }

        [JsonPropertyName("internal")]
        public int Internal { get; set; }

        [JsonPropertyName("external")]
        public int External { get; set; }

        [JsonPropertyName("resources")]
        public int Resources { get; set; }

        [JsonPropertyName("images")]
        public int Images { get; set; }

        [JsonPropertyName("blocked")]
        public int Blocked { get; set; }

        [JsonPropertyName("skipped")]
        public int Skipped { get; set; }

        [JsonPropertyName("recentUrls")]
        public List<CrawlDto> RecentUrls { get; set; } = [];
    }
}
