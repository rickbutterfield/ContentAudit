using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    /// <summary>
    /// Audit issue that identifies images missing alternative text (alt text) attributes.
    /// </summary>
    /// <remarks>
    /// Alt text (alternative text) is critical for both accessibility and SEO:
    /// 
    /// <para><strong>Accessibility Impact:</strong></para>
    /// - Screen readers rely on alt text to describe images to visually impaired users
    /// - Required for WCAG 2.1 Level A compliance
    /// - Helps users understand image content when images fail to load
    /// - Essential for users with cognitive disabilities
    /// 
    /// <para><strong>SEO Impact:</strong></para>
    /// - Search engines use alt text to understand image content
    /// - Improves image search rankings
    /// - Provides context for page indexing
    /// - Helps with keyword relevance
    /// 
    /// This is classified as a high-priority issue because missing alt text violates accessibility
    /// standards and negatively impacts both user experience and SEO. Background images are excluded
    /// from this check as they are typically decorative.
    /// </remarks>
    public class MissingAltText : IAuditImageIssue
    {
        /// <summary>
        /// Gets the unique identifier for this audit issue.
        /// </summary>
        public Guid Id => new Guid("8368418c-b231-46b4-9fbb-642acf92436b");

        /// <summary>
        /// Gets the display name of this audit issue.
        /// </summary>
        public string Name => "Missing alt text";

        /// <summary>
        /// Gets the description of this audit issue.
        /// </summary>
        public string Description => "Pages with images that are missing alt text";

        /// <summary>
        /// Gets the category this audit issue belongs to.
        /// </summary>
        public string Category => "Content";

        /// <summary>
        /// Gets the issue type classification.
        /// </summary>
        public IssueType Type => IssueType.Issue;

        /// <summary>
        /// Gets the priority level of this audit issue.
        /// </summary>
        public IssuePriority Priority => IssuePriority.High;

        /// <summary>
        /// Gets the properties to expose in the UI for this audit issue.
        /// </summary>
        public IEnumerable<AuditIssueProperty> ExposedProperties => default;
        
        /// <summary>
        /// Checks images to identify those without alt text attributes.
        /// </summary>
        /// <param name="images">The collection of images to analyze.</param>
        /// <param name="pages">The collection of pages for context (not used in this check).</param>
        /// <returns>A filtered collection of images that are missing alt text.</returns>
        /// <remarks>
        /// This method filters images based on the following criteria:
        /// - Image is not a background image (decorative images are excluded)
        /// - Alt text property is null or empty
        /// 
        /// Background images are excluded because they are typically decorative and don't require alt text.
        /// Content images (img tags with src attributes) must have meaningful alt text for accessibility.
        /// </remarks>
        public IEnumerable<ImageDto> CheckImages(IEnumerable<ImageDto> images, IEnumerable<PageAnalysisDto> pages)
        {
            return images.Where(x => !x.IsBackground && string.IsNullOrEmpty(x.AltText));
        }
    }
}
