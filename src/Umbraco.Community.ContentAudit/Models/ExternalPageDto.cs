using System.Net.Http.Headers;
using System.Text.Json.Serialization;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models
{
    public class ExternalPageDto : BaseContentAuditDto, IPageResourceDto
    {
        public ExternalPageDto() { }

        public ExternalPageDto(ExternalPageSchema schema)
        {
            Unique = schema.NodeKey.GetValueOrDefault();

            Id = schema.Id;
            Url = schema.Url;
            NodeKey = schema.NodeKey;
            FoundPage = schema.FoundPage;
            IsAsset = schema.IsAsset;
            StatusCode = schema.StatusCode;
            ContentType = MediaTypeHeaderValue.Parse(schema.ContentType);
        }

        [JsonPropertyName("id")]
        public int? Id { get; set; }

        [JsonPropertyName("url")]
        public string? Url { get; set; }

        [JsonPropertyName("nodeKey")]
        public Guid? NodeKey { get; set; }

        [JsonPropertyName("foundPage")]
        public string? FoundPage { get; set; }

        [JsonPropertyName("isAsset")]
        public bool IsAsset { get; set; }

        [JsonPropertyName("size")]
        public double? Size { get; set; }

        [JsonPropertyName("statusCode")]
        public int StatusCode { get; set; }

        [JsonPropertyName("contentType")]
        public MediaTypeHeaderValue? ContentType { get; set; }
    }
}
