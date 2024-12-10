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
            MetaRobots = schema.MetaRobots;
            CanonicalUrl = schema.CanonicalUrl;

            if (schema.H1 != null)
            {
                H1 = schema.H1.Split(',').ToList();
            }
            if (schema.H2 != null)
            {
                H2 = schema.H2.Split(',').ToList();
            }

            Canonicalised = schema.CanonicalUrl == schema.Url;
        }

        [JsonPropertyName("id")]
        public int? Id { get; set; }

        [JsonPropertyName("nodeKey")]
        public Guid? NodeKey { get; set; }

        [JsonPropertyName("metaTitle")]
        public string? MetaTitle { get; set; }

        [JsonIgnore]
        public string? PageContent { get; set; }

        [JsonPropertyName("metaDescription")]
        public string? MetaDescription { get; set; }

        [JsonPropertyName("metaKeywords")]
        public string? MetaKeywords { get; set; }

        [JsonPropertyName("metaRobots")]
        public string? MetaRobots { get; set; }

        [JsonPropertyName("canonicalUrl")]
        public string? CanonicalUrl { get; set; }

        [JsonPropertyName("canonicalised")]
        public bool Canonicalised { get; set; }

        [JsonPropertyName("h1")]
        public List<string> H1 { get; set; } = new List<string>();

        [JsonPropertyName("h2")]
        public List<string> H2 { get; set; } = new List<string>();

        public List<PageResourceDto> Resources { get; set; } = new List<PageResourceDto>();
        public List<string> Links { get; set; } = new List<string>();
    }
}
