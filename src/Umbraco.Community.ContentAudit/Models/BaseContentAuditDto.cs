using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Models
{
    public class BaseContentAuditDto : IContentAuditDto
    {
        public Guid Unique { get; set; }
        public string EntityType { get; set; } = "";
    }
}
