using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    /// <summary>
    /// Data transfer object representing a page analyzed during a content audit.
    /// </summary>
    public class PageDto : BaseContentAuditDto
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="PageDto"/> class.
        /// </summary>
        public PageDto() { }

        /// <summary>
        /// Initializes a new instance of the <see cref="PageDto"/> class from a <see cref="PageSchema"/>.
        /// </summary>
        /// <param name="schema">The page schema containing the source data.</param>
        public PageDto(PageSchema schema)
        {
            Id = schema.Id;
            AuditKey = schema.AuditKey;
            Url = schema.Url;
            RedirectUrl = schema.RedirectUrl;
            Redirect = schema.Redirect;
            Unique = schema.Unique;
            StatusCode = schema.StatusCode;
        }

        /// <summary>
        /// Gets or sets the internal database identifier for the page.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the audit key that identifies which audit run this page belongs to.
        /// </summary>
        public Guid AuditKey { get; set; }

        /// <summary>
        /// Gets or sets the URL of the page.
        /// </summary>
        public string? Url { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the page is a redirect.
        /// </summary>
        public bool Redirect { get; set; }

        /// <summary>
        /// Gets or sets the URL that the page redirects to, if applicable.
        /// </summary>
        public string? RedirectUrl { get; set; }

        /// <inheritdoc/>
        public new Guid Unique { get; set; }

        /// <summary>
        /// Gets or sets the HTTP status code returned by the page.
        /// </summary>
        public int StatusCode { get; set; }
    }
}
