using System.Net.Http.Headers;
using System.Text.Json.Serialization;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class ImageDto : BaseContentAuditDto, IPageResourceDto
    {
        public ImageDto(ResourceDto resource)
        {
            Url = resource.Url;
            IsExternal = resource.IsExternal;
            IsAsset = resource.IsAsset;
            Size = resource.Size;
            StatusCode = resource.StatusCode;
            ContentType = resource.ContentType;
        }

        public ImageDto(ImageSchema schema)
        {
            Url = schema.Url;
            AltText = schema.AltText;
            FoundPage = schema.FoundPage;
            IsExternal = schema.IsExternal;
            Size = schema.Size;
            StatusCode = schema.StatusCode;
            ContentType = schema.ContentType;
            NodeKey = schema.NodeKey;
            IsBackground = schema.IsBackground;
        }

        [JsonPropertyName("url")]
        public string? Url { get; set; }

        [JsonPropertyName("isExternal")]
        public bool IsExternal { get; set; }

        [JsonPropertyName("isAsset")]
        public bool IsAsset { get; set; }

        [JsonPropertyName("isBackground")]
        public bool IsBackground { get; set; }

        [JsonPropertyName("size")]
        public double? Size { get; set; }

        [JsonPropertyName("statusCode")]
        public int StatusCode { get; set; }

        [JsonPropertyName("contentType")]
        public string? ContentType { get; set; }

        [JsonPropertyName("altText")]
        public string? AltText { get; set; }

        [JsonPropertyName("foundPage")]
        public string? FoundPage { get; set; }

        [JsonPropertyName("nodeKey")]
        public Guid? NodeKey { get; set; }
    }
}
