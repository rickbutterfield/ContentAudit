using System.Text.Json.Serialization;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class ExternalPageDto : BaseContentAuditDto
    {
        public ExternalPageDto() { }

        public ExternalPageDto(ExternalPageSchema schema)
        {
            Unique = schema.NodeKey.GetValueOrDefault();

            Id = schema.Id;
            Url = schema.Url;
            NodeKey = schema.NodeKey;
            FoundPage = schema.FoundPage;
            StatusCode = schema.StatusCode;
            ContentType = schema.ContentType;
        }

        [JsonPropertyName("id")]
        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }

        [JsonPropertyName("url")]
        public string? Url { get; set; }

        [JsonPropertyName("nodeKey")]
        public Guid? NodeKey { get; set; }

        [JsonPropertyName("foundPage")]
        public string? FoundPage { get; set; }

        [JsonPropertyName("statusCode")]
        public int StatusCode { get; set; }

        [JsonPropertyName("contentType")]
        public string? ContentType { get; set; }
    }
}
