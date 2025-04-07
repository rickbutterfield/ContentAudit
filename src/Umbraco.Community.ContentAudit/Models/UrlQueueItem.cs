namespace Umbraco.Community.ContentAudit.Models
{
    public class UrlQueueItem
    {
        public string Url { get; set; } = string.Empty;
        public bool IsExternal { get; set; }
        public bool IsAsset { get; set; }
        public string SourceUrl { get; set; } = string.Empty;
        public Guid NodeKey { get; set; }
        public string ContentType { get; set; } = string.Empty;
        public int StatusCode { get; set; }
    }
}
