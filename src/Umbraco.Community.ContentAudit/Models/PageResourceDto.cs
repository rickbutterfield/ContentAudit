using System.Net.Http.Headers;
using System.Text.Json.Serialization;

namespace Umbraco.Community.ContentAudit.Models
{
    public class PageResourceDto
    {
        [JsonPropertyName("url")]
        public string? Url { get; set; }

        [JsonPropertyName("size")]
        public long? Size { get; set; }

        [JsonPropertyName("statusCode")]
        public int StatusCode { get; set; }

        [JsonPropertyName("contentType")]
        public MediaTypeHeaderValue? ContentType { get; set; }
    }
}
