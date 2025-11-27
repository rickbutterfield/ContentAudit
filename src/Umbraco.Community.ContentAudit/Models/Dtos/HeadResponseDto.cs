namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    /// <summary>
    /// Data transfer object representing the response headers from an HTTP HEAD request.
    /// </summary>
    /// <remarks>
    /// This DTO captures essential HTTP response metadata retrieved via HEAD requests,
    /// which are used to check resource availability and characteristics without downloading the full content.
    /// </remarks>
    public class HeadResponseDto
    {
        /// <summary>
        /// Gets or sets the HTTP status code of the response (e.g., 200, 404, 500).
        /// </summary>
        public int StatusCode { get; set; }

        /// <summary>
        /// Gets or sets the MIME type of the resource (e.g., "text/html", "application/json").
        /// </summary>
        public string? ContentType { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the size of the resource in bytes, if available.
        /// </summary>
        public long? ContentLength { get; set; }
    }
}