using System.Text.Json.Serialization;

namespace Umbraco.Community.ContentAudit.Models
{
    /// <summary>
    /// Represents metadata for a property exposed by an audit issue.
    /// </summary>
    /// <remarks>
    /// This class is used to define configurable properties or parameters that an audit issue
    /// exposes for customization, filtering, or reporting purposes. It includes the property's
    /// display name, alias, label template, and associated UI element information.
    /// </remarks>
    public class AuditIssueProperty
    {
        /// <summary>
        /// Gets or sets the display name of the audit issue property.
        /// </summary>
        /// <remarks>
        /// This is the human-readable name shown in the user interface for this property.
        /// </remarks>
        [JsonPropertyName("name")]
        public string? Name { get; set; }

        /// <summary>
        /// Gets or sets the alias of the audit issue property.
        /// </summary>
        /// <remarks>
        /// This is a programmatic identifier for the property, typically used in code or API references.
        /// </remarks>
        [JsonPropertyName("alias")]
        public string? Alias { get; set; }

        /// <summary>
        /// Gets or sets the label template for the audit issue property.
        /// </summary>
        /// <remarks>
        /// This template is used to format or display the property's label in the user interface,
        /// potentially supporting variable substitution or templating.
        /// </remarks>
        [JsonPropertyName("labelTemplate")]
        public string? LabelTemplate { get; set; }

        /// <summary>
        /// Gets or sets the name of the UI element associated with this property.
        /// </summary>
        /// <remarks>
        /// This identifies the type of UI element (control or component) that should be used
        /// to render or edit this property in the user interface.
        /// </remarks>
        [JsonPropertyName("elementName")]
        public string? ElementName { get; set; }
    }
}
