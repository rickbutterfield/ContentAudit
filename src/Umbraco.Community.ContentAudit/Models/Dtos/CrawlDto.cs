using System.Text.Json.Serialization;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class CrawlDto
    {
        [JsonPropertyName("url")]
        public string? Url { get; set; }

        [JsonPropertyName("external")]
        public bool External { get; set; }

        [JsonPropertyName("asset")]
        public bool Asset { get; set; }
        
        [JsonPropertyName("crawled")]
        public bool Crawled { get; set; }

        [JsonPropertyName("blocked")]
        public bool Blocked { get; set; }

        [JsonPropertyName("unique")]
        public Guid Unique { get; set; }
    }
}
