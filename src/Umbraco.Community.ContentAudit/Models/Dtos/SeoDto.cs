using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    /// <summary>
    /// Data transfer object containing SEO metadata and optimization information for an audited page.
    /// </summary>
    public class SeoDto
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="SeoDto"/> class.
        /// </summary>
        public SeoDto() { }

        /// <summary>
        /// Initializes a new instance of the <see cref="SeoDto"/> class from a <see cref="SeoSchema"/>.
        /// </summary>
        /// <param name="schema">The SEO schema containing the page SEO data.</param>
        public SeoDto(SeoSchema schema)
        {
            AuditKey = schema.AuditKey;
            Url = schema.Url;
            Title = schema.Title;
            MetaDescription = schema.MetaDescription;
            CanonicalUrl = schema.CanonicalUrl;
            H1 = schema.H1;
            H2s = schema.H2s?.Split(',').ToList();
            H3s = schema.H3s?.Split(',').ToList();
            HasNoIndex = schema.HasNoIndex;
            HasNoFollow = schema.HasNoFollow;
            IsOrphaned = schema.IsOrphaned;
            OpenGraphTitle = schema.OpenGraphTitle;
            OpenGraphDescription = schema.OpenGraphDescription;
            OpenGraphImage = schema.OpenGraphImage;
            TwitterCard = schema.TwitterCard;
            TwitterTitle = schema.TwitterTitle;
            TwitterDescription = schema.TwitterDescription;
            TwitterImage = schema.TwitterImage;
            CreatedDate = schema.CreatedDate;
        }

        /// <summary>
        /// Gets or sets the unique identifier of the audit run.
        /// </summary>
        public Guid AuditKey { get; set; }

        /// <summary>
        /// Gets or sets the URL of the audited page.
        /// </summary>
        public string? Url { get; set; }

        /// <summary>
        /// Gets or sets the page title (meta title tag).
        /// </summary>
        public string? Title { get; set; }

        /// <summary>
        /// Gets or sets the page meta description used in search engine results.
        /// </summary>
        public string? MetaDescription { get; set; }

        /// <summary>
        /// Gets or sets the canonical URL to help prevent duplicate content issues.
        /// </summary>
        public string? CanonicalUrl { get; set; }

        /// <summary>
        /// Gets or sets the main heading (H1) on the page.
        /// </summary>
        public string? H1 { get; set; }

        /// <summary>
        /// Gets or sets the list of secondary headings (H2) on the page.
        /// </summary>
        public List<string>? H2s { get; set; }

        /// <summary>
        /// Gets or sets the list of tertiary headings (H3) on the page.
        /// </summary>
        public List<string>? H3s { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the page is marked with noindex, preventing it from search engine indexes.
        /// </summary>
        public bool HasNoIndex { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the page is marked with nofollow, preventing search engine bot link following.
        /// </summary>
        public bool HasNoFollow { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the page is orphaned with no internal links pointing to it.
        /// </summary>
        public bool IsOrphaned { get; set; } = false;

        /// <summary>
        /// Gets or sets the Open Graph title for social media sharing.
        /// </summary>
        public string? OpenGraphTitle { get; set; }

        /// <summary>
        /// Gets or sets the Open Graph description for social media sharing.
        /// </summary>
        public string? OpenGraphDescription { get; set; }

        /// <summary>
        /// Gets or sets the Open Graph image URL for social media sharing.
        /// </summary>
        public string? OpenGraphImage { get; set; }

        /// <summary>
        /// Gets or sets the Twitter card type (summary, summary_large_image, app, player).
        /// </summary>
        public string? TwitterCard { get; set; }

        /// <summary>
        /// Gets or sets the Twitter card title.
        /// </summary>
        public string? TwitterTitle { get; set; }

        /// <summary>
        /// Gets or sets the Twitter card description.
        /// </summary>
        public string? TwitterDescription { get; set; }

        /// <summary>
        /// Gets or sets the Twitter card image URL.
        /// </summary>
        public string? TwitterImage { get; set; }

        /// <summary>
        /// Gets or sets the date and time when the SEO data was collected.
        /// </summary>
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}
