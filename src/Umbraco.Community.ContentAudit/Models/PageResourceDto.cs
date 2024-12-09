using System.Net.Http.Headers;

namespace Umbraco.Community.ContentAudit.Models
{
    public class PageResourceDto
    {
        public string? Url { get; set; }
        public long? Size { get; set; }
        public int StatusCode { get; set; }
        public MediaTypeHeaderValue? ContentType { get; set; }
    }
}
