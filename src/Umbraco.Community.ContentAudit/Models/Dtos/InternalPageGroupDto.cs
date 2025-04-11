using System.Text.Json.Serialization;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class InternalPageGroupDto : BaseContentAuditDto
    {
        [JsonPropertyName("url")]
        public string? Url { get; set; }

        [JsonPropertyName("statusCode")]
        public int? StatusCode { get; set; }

        [JsonPropertyName("contentType")]
        public string? ContentType { get; set; }

        [JsonPropertyName("internalPages")]
        public List<InternalPageDto>? InternalPages { get; set; }
    }
}
