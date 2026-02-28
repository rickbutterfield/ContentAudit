using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class PageListItemDto : BaseContentAuditDto
    {
        public PageDto PageData { get; set; } = new();
        public string? ContentType { get; set; }
    }
}
