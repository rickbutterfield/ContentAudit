namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface IContentAuditDto
    {
        Guid Unique { get; set; }
        string EntityType { get; set; }
    }
}
