namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class CarbonRatingListItemDto : BaseContentAuditDto
    {
        public PageDto PageData { get; set; } = new();
        public string? ContentType { get; set; }
        public int? TotalBytes { get; set; }
        public EmissionsDto EmissionsData { get; set; } = new();
    }
}
