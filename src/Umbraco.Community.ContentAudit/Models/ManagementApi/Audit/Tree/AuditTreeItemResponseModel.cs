using Umbraco.Cms.Api.Management.ViewModels.Tree;

namespace Umbraco.Community.ContentAudit.Models.ManagementApi.Audit.Tree
{
    /// <summary>
    /// Represents a tree item response model for audit-related navigation in the Umbraco Management API.
    /// </summary>
    /// <remarks>
    /// This model extends <see cref="FolderTreeItemResponseModel"/> to provide tree navigation support for audit items
    /// in the Content Audit section. It inherits all tree item properties and folder functionality from its base class,
    /// enabling hierarchical display of audits in the backoffice tree view.
    /// </remarks>
    public class AuditTreeItemResponseModel : FolderTreeItemResponseModel
    {

    }
}
