namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class IssueReferenceDto
    {
        public Guid Unique { get; set; }
        public string? Url { get; set; }
        public string? FoundPage { get; set; }
    }
}
