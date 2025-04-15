namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class HeadResponseDto
    {
        public int StatusCode { get; set; }
        public string? ContentType { get; set; } = string.Empty;
        public long? ContentLength { get; set; }
    }
}