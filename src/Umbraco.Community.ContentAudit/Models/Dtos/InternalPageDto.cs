using System.Text.Json.Serialization;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class InternalPageDto : BaseContentAuditDto, IPageResourceDto
    {
        public InternalPageDto() { }

        public InternalPageDto(InternalPageSchema schema)
        {
            Unique = schema.NodeKey.GetValueOrDefault();

            Id = schema.Id;
            Url = schema.Url;
            NodeKey = schema.NodeKey;
            StatusCode = schema.StatusCode;
            //ContentType = schema.ContentType;
            //IsOrphaned = schema.IsOrphaned;
            //PageBytes = schema.PageBytes;
        }

        public InternalPageDto(OrphanedPageSchema schema)
        {
            Unique = schema.NodeKey.GetValueOrDefault();

            Id = schema.Id;
            Url = schema.Url;
            NodeKey = schema.NodeKey;
        }

        [JsonPropertyName("id")]
         [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)] public int Id { get; set; }

        [JsonPropertyName("nodeKey")]
        public Guid? NodeKey { get; set; }

        [JsonPropertyName("metaRobots")]
        public string? MetaRobots { get; set; }

        [JsonPropertyName("canonicalUrl")]
        public string? CanonicalUrl { get; set; }

        [JsonPropertyName("url")]
        public string? Url { get; set; }

        //[JsonPropertyName("isOrphaned")]
        //public bool IsOrphaned { get; set; }

        [JsonPropertyName("isAsset")]
        public bool IsAsset { get; set; }

        [JsonPropertyName("pageBytes")]
        public double? Size { get; set; }

        [JsonPropertyName("statusCode")]
        public int StatusCode { get; set; }

        [JsonPropertyName("contentType")]
        public string? ContentType { get; set; }

        [JsonPropertyName("emissionsPerPageView")]
        public double? EmissionsPerPageView { get; set; }

        [JsonPropertyName("carbonRating")]
        public string? CarbonRating { get; set; }
    }
}
