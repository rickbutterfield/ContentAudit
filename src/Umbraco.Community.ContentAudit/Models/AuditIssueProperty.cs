using System.Text.Json.Serialization;

namespace Umbraco.Community.ContentAudit.Models
{
    public class AuditIssueProperty
    {
        [JsonPropertyName("name")]
        public string? Name { get; set; }

        [JsonPropertyName("alias")]
        public string? Alias { get; set; }

        [JsonPropertyName("labelTemplate")]
        public string? LabelTemplate { get; set; }

        [JsonPropertyName("elementName")]
        public string? ElementName { get; set; }
    }
}
