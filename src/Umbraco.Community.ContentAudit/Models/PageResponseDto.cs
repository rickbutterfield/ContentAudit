using System.Text.Json.Serialization;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models
{
    public class PageResponseDto : PageResourceDto
    {
        public PageResponseDto() { }

        public PageResponseDto(PageSchema schema)
        {
            Id = schema.Id;
            Url = schema.Url;
            NodeKey = schema.NodeKey;
            MetaTitle = schema.MetaTitle;
            MetaDescription = schema.MetaDescription;
            MetaKeywords = schema.MetaKeywords;
            CanonicalUrl = schema.CanonicalUrl;
            Canonicalised = schema.Canonicalised;
        }

        [JsonPropertyName("id")]
        public int? Id { get; set; }

        [JsonPropertyName("metaTitle")]
        public string? MetaTitle { get; set; }

        [JsonIgnore]
        public string? PageContent { get; set; }

        [JsonPropertyName("metaDescription")]
        public string? MetaDescription { get; set; }

        [JsonPropertyName("metaKeywords")]
        public string? MetaKeywords { get; set; }

        [JsonPropertyName("canonicalUrl")]
        public string? CanonicalUrl { get; set; }

        [JsonPropertyName("canonicalised")]
        public bool Canonicalised { get; set; }

        [JsonPropertyName("nodeKey")]
        public Guid? NodeKey { get; set; }

        public List<PageResourceDto> Resources { get; set; } = new List<PageResourceDto>();
        public List<string> Links { get; set; } = new List<string>();
    }
}
