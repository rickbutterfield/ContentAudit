namespace Umbraco.Community.ContentAudit.Models.Validation
{
    /// <summary>
    /// Represents a single validation message returned from W3C HTML validation.
    /// Contains details about HTML validation issues including error/warning type, location, and content excerpts.
    /// </summary>
    public class ValidationMessage
    {
        /// <summary>
        /// Gets or sets the severity type of the validation message.
        /// Values include "error", "warning", or "info".
        /// </summary>
        public string? Type { get; set; }

        /// <summary>
        /// Gets or sets the last line number where the issue occurs in the HTML source.
        /// </summary>
        public int? LastLine { get; set; }

        /// <summary>
        /// Gets or sets the last column number where the issue occurs on the line.
        /// </summary>
        public int? LastColumn { get; set; }

        /// <summary>
        /// Gets or sets the first line number where the issue starts in the HTML source.
        /// </summary>
        public int? FirstLine { get; set; }

        /// <summary>
        /// Gets or sets the first column number where the issue starts on the line.
        /// </summary>
        public int? FirstColumn { get; set; }

        /// <summary>
        /// Gets or sets the detailed description of the validation issue from W3C validation service.
        /// </summary>
        public string? Message { get; set; }

        /// <summary>
        /// Gets or sets the HTML code excerpt surrounding the validation issue.
        /// This provides context showing the problematic code in the source.
        /// </summary>
        public string? Extract { get; set; }

        /// <summary>
        /// Gets or sets the starting character position within the extract where the issue is highlighted.
        /// </summary>
        public int? HiliteStart { get; set; }

        /// <summary>
        /// Gets or sets the length of characters to highlight in the extract to indicate the issue location.
        /// </summary>
        public int? HiliteLength { get; set; }
    }
}
