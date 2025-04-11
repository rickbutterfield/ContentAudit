using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class BaseContentAuditDto : IContentAuditDto
    {
        public Guid Unique { get; set; }
        public string EntityType { get; set; } = "";
    }
}
