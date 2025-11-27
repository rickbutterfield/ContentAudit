namespace Umbraco.Community.ContentAudit.Interfaces
{
    /// <summary>
    /// Base interface for all content audit data transfer objects
    /// </summary>
    public interface IContentAuditDto
    {
        /// <summary>
        /// Gets or sets the unique identifier for the entity
        /// </summary>
        Guid Unique { get; set; }

        /// <summary>
        /// Gets or sets the type of entity (Page, Image, etc.)
        /// </summary>
        string EntityType { get; set; }
    }
}
