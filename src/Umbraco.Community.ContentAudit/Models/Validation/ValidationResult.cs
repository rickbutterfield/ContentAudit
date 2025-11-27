namespace Umbraco.Community.ContentAudit.Models.Validation
{
    /// <summary>
    /// Represents the complete validation result from W3C HTML validation service.
    /// Contains all validation messages, source information, and metadata about the validated page.
    /// </summary>
    public class ValidationResult
    {
        /// <summary>
        /// Gets or sets the list of validation messages (errors, warnings, and info) returned from W3C validation.
        /// Each message contains details about a specific HTML validation issue.
        /// Initialized to an empty list by default.
        /// </summary>
        public List<ValidationMessage>? Messages { get; set; } = new();

        /// <summary>
        /// Gets or sets the source information about the validated document.
        /// Contains details such as character encoding and document type.
        /// </summary>
        public ValidationSource? Source { get; set; }

        /// <summary>
        /// Gets or sets the URL of the page that was validated.
        /// </summary>
        public string? Url { get; set; }

        /// <summary>
        /// Gets or sets the detected language of the HTML document (e.g., "en", "fr").
        /// </summary>
        public string? Language { get; set; }
    }
}
