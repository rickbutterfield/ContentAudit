using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Models
{
    public class ContentAuditDto : IContentAuditDto
    {
        public Guid Unique { get; set; }
        public string EntityType { get; set; }
    }
}
