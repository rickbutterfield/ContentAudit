using System.Text.Json;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    /// <summary>
    /// Data transfer object containing social media integration and tracking information for an audited page.
    /// Includes social sharing capabilities, pixel tracking, and social media links.
    /// </summary>
    public class SocialMediaDto
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="SocialMediaDto"/> class.
        /// </summary>
        public SocialMediaDto() { }

        /// <summary>
        /// Initializes a new instance of the <see cref="SocialMediaDto"/> class from a <see cref="SocialMediaSchema"/>.
        /// </summary>
        /// <param name="schema">The social media schema containing the social integration data.</param>
        public SocialMediaDto(SocialMediaSchema schema)
        {
            Id = schema.Id;
            AuditKey = schema.AuditKey;
            Url = schema.Url;
            SocialShareButtons = JsonSerializer.Deserialize<List<string>>(schema.SocialShareButtons!);
            HasFacebookPixel = schema.HasFacebookPixel;
            HasTwitterPixel = schema.HasTwitterPixel;
            HasLinkedInPixel = schema.HasLinkedInPixel;
            SocialMediaLinks = JsonSerializer.Deserialize<List<string>>(schema.SocialMediaLinks!);
            CreatedDate = schema.CreatedDate;
        }

        /// <summary>
        /// Gets or sets the unique database identifier for this social media record.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the unique identifier of the audit run.
        /// </summary>
        public Guid AuditKey { get; set; }

        /// <summary>
        /// Gets or sets the URL of the audited page.
        /// </summary>
        public string? Url { get; set; }

        /// <summary>
        /// Gets or sets a list of social media platforms with active share buttons (e.g., Facebook, Twitter, LinkedIn, Pinterest).
        /// </summary>
        public List<string>? SocialShareButtons { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the page includes Facebook pixel for conversion tracking and analytics.
        /// </summary>
        public bool HasFacebookPixel { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the page includes Twitter pixel (Twitter Conversion Tracking) for analytics.
        /// </summary>
        public bool HasTwitterPixel { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the page includes LinkedIn pixel for conversion and audience tracking.
        /// </summary>
        public bool HasLinkedInPixel { get; set; }

        /// <summary>
        /// Gets or sets a list of social media profile URLs linked from the page (e.g., Facebook, Twitter, LinkedIn, Instagram).
        /// </summary>
        public List<string>? SocialMediaLinks { get; set; }

        /// <summary>
        /// Gets or sets the date and time when the social media data was collected.
        /// </summary>
        public DateTime CreatedDate { get; set; }
    }
}
