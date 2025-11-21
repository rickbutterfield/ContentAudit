using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.ViewModels.Pagination;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.ManagementApi.Audit.Tree;

namespace Umbraco.Community.ContentAudit.Api.Audit.Tree
{
    /// <summary>
    /// Management API controller for rendering the child items of the audit tree in the Umbraco backoffice.
    /// </summary>
    public class ChildrenAuditTreeController : AuditTreeControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChildrenAuditTreeController"/> class.
        /// </summary>
        /// <param name="dataService">The data service for audit operations.</param>
        public ChildrenAuditTreeController(IDataService dataService) : base(dataService)
        {
        }

        /// <summary>
        /// Gets the child items of a specific audit tree node.
        /// </summary>
        /// <param name="parentId">The unique identifier of the parent audit node.</param>
        /// <returns>An empty paged view model as audit tree items do not have children.</returns>
        /// <remarks>
        /// This endpoint always returns an empty collection since audit tree items are leaf nodes
        /// with no child items. It exists to satisfy the tree API contract.
        /// </remarks>
        [HttpGet("children/{parentId:guid}")]
        [ProducesResponseType(typeof(PagedViewModel<AuditTreeItemResponseModel>), StatusCodes.Status200OK)]
        public ActionResult<PagedViewModel<AuditTreeItemResponseModel>> Children(Guid parentId)
        {
            return Ok(PagedViewModel<AuditTreeItemResponseModel>.Empty());
        }
    }
}
