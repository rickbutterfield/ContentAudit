namespace Umbraco.Community.ContentAudit.Models.Validation
{
    /// <summary>
    /// Represents metadata about the source document from W3C HTML validation.
    /// Contains information about the document's character encoding and document type.
    /// </summary>
    public class ValidationSource
    {
        /// <summary>
        /// Gets or sets the character encoding of the validated HTML document (e.g., "utf-8", "iso-8859-1").
        /// </summary>
        public string? Encoding { get; set; }

        /// <summary>
        /// Gets or sets the document type of the validated HTML document.
        /// Examples include "html5", "xhtml", or other DOCTYPE declarations detected by W3C validation.
        /// </summary>
        public string? Type { get; set; }
    }
}
