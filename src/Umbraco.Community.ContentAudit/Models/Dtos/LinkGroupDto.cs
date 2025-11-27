using System.Text.Json.Serialization;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    /// <summary>
    /// Represents a grouped collection of links that share the same destination URL.
    /// Aggregates link information with HTTP response details and a collection of individual links.
    /// </summary>
    public class LinkGroupDto : BaseContentAuditDto
    {
        /// <summary>
        /// Gets or sets the destination URL that all links in this group share.
        /// </summary>
        [JsonPropertyName("url")]
        public string? Url { get; set; }

        /// <summary>
        /// Gets or sets the HTTP status code returned when the grouped URL was accessed.
        /// </summary>
        [JsonPropertyName("statusCode")]
        public int? StatusCode { get; set; }

        /// <summary>
        /// Gets or sets the Content-Type header value of the resource the grouped URL points to.
        /// </summary>
        [JsonPropertyName("contentType")]
        public string? ContentType { get; set; }

        /// <summary>
        /// Gets or sets the collection of individual links that point to the URL in this group.
        /// </summary>
        [JsonPropertyName("links")]
        public List<LinkDto>? Links { get; set; }
    }
}
