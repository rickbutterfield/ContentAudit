using System.Net.Http.Headers;
using System.Text.Json.Serialization;
using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class ResourceDto : IPageResourceDto
    {
        [JsonPropertyName("url")]
        public required string Url { get; set; }

        [JsonPropertyName("isExternal")]
        public bool IsExternal { get; set; }

        [JsonPropertyName("isAsset")]
        public bool IsAsset { get; set; }

        [JsonPropertyName("size")]
        public double? Size { get; set; }

        [JsonPropertyName("statusCode")]
        public int StatusCode { get; set; }

        [JsonPropertyName("contentType")]
        public string? ContentType { get; set; }
    }
}
