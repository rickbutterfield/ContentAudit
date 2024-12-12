using System.Net.Http.Headers;
using System.Text.Json.Serialization;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models
{
    public class PageDto : BaseContentAuditDto, IPageResourceDto
    {
        public PageDto() { }

        public PageDto(PageSchema schema)
        {
            Unique = schema.NodeKey.GetValueOrDefault();

            Id = schema.Id;
            Url = schema.Url;
            NodeKey = schema.NodeKey;
            StatusCode = schema.StatusCode;
            ContentType = MediaTypeHeaderValue.Parse(schema.ContentType);
            MetaTitle = schema.MetaTitle;
            MetaDescription = schema.MetaDescription;
            MetaKeywords = schema.MetaKeywords;
            MetaRobots = schema.MetaRobots;
            CanonicalUrl = schema.CanonicalUrl;
            IsOrphaned = schema.IsOrphaned;

            if (schema.H1 != null)
            {
                H1 = schema.H1.Split(',').ToList();
            }
            if (schema.H2 != null)
            {
                H2 = schema.H2.Split(',').ToList();
            }

            if (schema.OutboundLinks != null)
            {
                OutboundLinks = schema.OutboundLinks.Split(',').ToList();
            }

            IsExternal = schema.IsExternal;
            IsAsset = schema.IsAsset;
            Size = schema.PageBytes;
            Canonicalised = schema.CanonicalUrl == schema.Url;
        }

        public PageDto(OrphanedPageSchema schema)
        {
            Unique = schema.NodeKey.GetValueOrDefault();

            Id = schema.Id;
            Url = schema.Url;
            NodeKey = schema.NodeKey;
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

        [JsonPropertyName("outboundLinks")]
        public List<string> OutboundLinks { get; set; } = new List<string>();

        [JsonPropertyName("url")]
        public string? Url { get; set; }

        [JsonPropertyName("isExternal")]
        public bool IsExternal { get; set; }

        [JsonPropertyName("isOrphaned")]
        public bool IsOrphaned { get; set; }

        [JsonPropertyName("isAsset")]
        public bool IsAsset { get; set; }

        [JsonPropertyName("size")]
        public double? Size { get; set; }

        [JsonPropertyName("statusCode")]
        public int StatusCode { get; set; }

        [JsonPropertyName("contentType")]
        public MediaTypeHeaderValue? ContentType { get; set; }

        public List<string> Links { get; set; } = new List<string>();
        public List<ResourceDto> Resources { get; set; } = new List<ResourceDto>();
        public List<ImageDto> Images { get; set; } = new List<ImageDto>();
    }
}
