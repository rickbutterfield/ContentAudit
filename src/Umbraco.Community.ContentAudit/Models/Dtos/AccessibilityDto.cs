using System.Text.Json;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    /// <summary>
    /// Data transfer object containing accessibility metrics for a single audited page.
    /// Analyzes WCAG compliance including ARIA attributes, heading structure, color contrast, and general accessibility issues.
    /// </summary>
    public class AccessibilityDto
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AccessibilityDto"/> class.
        /// </summary>
        public AccessibilityDto() { }

        /// <summary>
        /// Initializes a new instance of the <see cref="AccessibilityDto"/> class from an <see cref="AccessibilitySchema"/>.
        /// Deserializes JSON-stored accessibility issue data into strongly-typed collections.
        /// </summary>
        /// <param name="schema">The accessibility schema object containing serialized accessibility audit data.</param>
        public AccessibilityDto(AccessibilitySchema schema)
        {
            Id = schema.Id;
            AuditKey = schema.AuditKey;
            Url = schema.Url;
            AccessibilityIssues = JsonSerializer.Deserialize<List<string>>(schema.AccessibilityIssues!);
            AriaLabelCount = schema.AriaLabelCount;
            AriaDescribedByCount = schema.AriaDescribedByCount;
            HasSkipToContent = schema.HasSkipToContent;
            HasProperHeadingStructure = schema.HasProperHeadingStructure;
            ColorContrastIssues = JsonSerializer.Deserialize<List<string>>(schema.ColorContrastIssues!);
            CreatedDate = schema.CreatedDate;
        }

        /// <summary>
        /// Gets or sets the unique identifier for this accessibility audit record.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the audit key that uniquely identifies the parent audit run.
        /// </summary>
        public Guid AuditKey { get; set; }

        /// <summary>
        /// Gets or sets the URL of the page for which accessibility metrics were collected.
        /// </summary>
        public string? Url { get; set; }

        /// <summary>
        /// Gets or sets the list of accessibility issues detected on the page.
        /// Contains descriptions of WCAG violations, missing landmarks, missing alternative text, and other accessibility problems.
        /// </summary>
        public List<string>? AccessibilityIssues { get; set; }

        /// <summary>
        /// Gets or sets the count of elements with aria-label attributes.
        /// Indicates the use of ARIA labels for screen reader accessibility; higher counts generally indicate better accessibility.
        /// </summary>
        public int AriaLabelCount { get; set; }

        /// <summary>
        /// Gets or sets the count of elements with aria-describedby attributes.
        /// Tracks usage of aria-describedby for providing extended descriptions to assistive technologies.
        /// </summary>
        public int AriaDescribedByCount { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the page contains a skip to main content link.
        /// Skip links improve navigation for keyboard and screen reader users by allowing them to bypass repetitive content.
        /// </summary>
        public bool HasSkipToContent { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the page has a proper heading structure (H1, H2, H3, etc.).
        /// Proper heading hierarchy is essential for screen reader users and document outline semantics.
        /// </summary>
        public bool HasProperHeadingStructure { get; set; }

        /// <summary>
        /// Gets or sets the list of color contrast issues detected on the page.
        /// Contains details about text-background color combinations that fail WCAG AA or AAA color contrast ratio requirements.
        /// </summary>
        public List<string>? ColorContrastIssues { get; set; }

        /// <summary>
        /// Gets or sets the date and time when the accessibility metrics were collected.
        /// </summary>
        public DateTime CreatedDate { get; set; }
    }
}
