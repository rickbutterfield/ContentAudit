namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class MetadataListItemDto : BaseContentAuditDto
    {
        public PageDto PageData { get; set; } = new();
        public SeoDto SeoData { get; set; } = new();
    }
}
