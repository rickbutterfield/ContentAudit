using System.Net.Http.Headers;
using System.Text.Json.Serialization;

namespace Umbraco.Community.ContentAudit.Models
{
    public class ExternalPageGroupDto : BaseContentAuditDto
    {
        [JsonPropertyName("url")]
        public string? Url { get; set; }

        [JsonPropertyName("statusCode")]
        public int? StatusCode { get; set; }

        [JsonPropertyName("contentType")]
        public MediaTypeHeaderValue? ContentType { get; set; }

        [JsonPropertyName("externalPages")]
        public List<ExternalPageDto>? ExternalPages { get; set; }
    }
}
