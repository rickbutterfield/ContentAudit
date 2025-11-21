using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.ViewModels.Pagination;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.ManagementApi.Audit.Tree;

namespace Umbraco.Community.ContentAudit.Api.Audit.Tree
{
    /// <summary>
    /// Management API controller for rendering the child items of the audit tree.
    /// </summary>
    public class ChildrenAuditTreeController : AuditTreeControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChildrenAuditTreeController"/> class.
        /// </summary>
        public ChildrenAuditTreeController(IDataService dataService) : base(dataService)
        {
        }

        /// <summary>
        /// Management API endpoint for rendering the child items of the form's tree.
        /// </summary>
        [HttpGet("children/{parentId:guid}")]
        [ProducesResponseType(typeof(PagedViewModel<AuditTreeItemResponseModel>), StatusCodes.Status200OK)]
        public ActionResult<PagedViewModel<AuditTreeItemResponseModel>> Children(Guid parentId)
        {
            return Ok(PagedViewModel<AuditTreeItemResponseModel>.Empty());
        }
    }
}
