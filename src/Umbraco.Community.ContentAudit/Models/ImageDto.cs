using System.Net.Http.Headers;
using System.Text.Json.Serialization;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models
{
    public class ImageDto : ResourceDto
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
            ContentType = MediaTypeHeaderValue.Parse(schema.ContentType);
        }

        [JsonPropertyName("altText")]
        public string? AltText { get; set; }

        [JsonPropertyName("foundPage")]
        public string? FoundPage { get; set; }
    }
}
