using System.Text.Json.Serialization;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class ImageDto : BaseContentAuditDto
    {
        public ImageDto() { }

        public ImageDto(ResourceDto dto)
        {
            Id = dto.Id;
            RunId = dto.RunId;
            Url = dto.Url;
            IsExternal = dto.IsExternal;
            Size = dto.Size;
            StatusCode = dto.StatusCode;
            ContentType = dto.ContentType;
            FoundPage = dto.FoundPage;
            NodeKey = dto.NodeKey;
            CreatedDate = dto.CreatedDate;
        }

        public ImageDto(ImageSchema schema)
        {
            Id = schema.Id;
            RunId = schema.RunId;
            Url = schema.Url;
            IsExternal = schema.IsExternal;
            Size = schema.Size;
            StatusCode = schema.StatusCode;
            ContentType = schema.ContentType;
            AltText = schema.AltText;
            Title = schema.Title;
            FoundPage = schema.FoundPage;
            NodeKey = schema.NodeKey;
            CreatedDate = schema.CreatedDate;
            IsBackground = schema.IsBackground;
        }

        [JsonPropertyName("id")]
        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }

        [JsonPropertyName("runId")]
        public int RunId { get; set; }

        [JsonPropertyName("url")]
        public string? Url { get; set; }

        [JsonPropertyName("isExternal")]
        public bool IsExternal { get; set; }

        [JsonPropertyName("size")]
        public double? Size { get; set; }

        [JsonPropertyName("statusCode")]
        public int StatusCode { get; set; }

        [JsonPropertyName("contentType")]
        public string? ContentType { get; set; }

        [JsonPropertyName("altText")]
        public string? AltText { get; set; }

        [JsonPropertyName("title")]
        public string? Title { get; set; }

        [JsonPropertyName("foundPage")]
        public string? FoundPage { get; set; }

        [JsonPropertyName("nodeKey")]
        public Guid? NodeKey { get; set; }

        [JsonPropertyName("createdDate")]
        public DateTime CreatedDate { get; set; }

        [JsonPropertyName("isBackground")]
        public bool IsBackground { get; set; }
    }
} 