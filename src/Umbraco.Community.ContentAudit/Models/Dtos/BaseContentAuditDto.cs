using System.Text.Json.Serialization;
using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    /// <summary>
    /// Base data transfer object for content audit entities providing common identifier and type information.
    /// </summary>
    public class BaseContentAuditDto : IContentAuditDto
    {
        /// <inheritdoc/>
        [JsonPropertyName("unique")]
        public Guid Unique { get; set; }

        /// <inheritdoc/>
        [JsonPropertyName("entityType")]
        public string EntityType { get; set; } = "";
    }
}
