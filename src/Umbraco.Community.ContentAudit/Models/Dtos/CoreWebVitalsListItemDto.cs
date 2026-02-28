namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class CoreWebVitalsListItemDto : BaseContentAuditDto
    {
        public PageDto PageData { get; set; } = new();
        public PerformanceDto PerformanceData { get; set; } = new();
    }
}
