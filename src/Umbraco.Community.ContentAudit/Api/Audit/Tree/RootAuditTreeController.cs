using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.ViewModels.Pagination;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;
using Umbraco.Community.ContentAudit.Models.ManagementApi.Audit.Tree;

namespace Umbraco.Community.ContentAudit.Api.Audit.Tree
{
    /// <summary>
    /// Management API controller for rendering the root items of the audit tree in the Umbraco backoffice.
    /// </summary>
    public class RootAuditTreeController : AuditTreeControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="RootAuditTreeController"/> class.
        /// </summary>
        /// <param name="dataService">The data service for audit operations.</param>
        public RootAuditTreeController(IDataService dataService) : base(dataService)
        {
        }

        /// <summary>
        /// Gets the root items of the audit tree, displaying all historical audit runs ordered by date.
        /// </summary>
        /// <returns>A paged view model containing audit tree items representing each audit run.</returns>
        /// <remarks>
        /// Each tree item represents a completed audit run with its run date as the display name.
        /// Items are ordered by run date in descending order (most recent first).
        /// Empty or invalid audits (with empty GUIDs) are filtered out.
        /// </remarks>
        [HttpGet("root")]
        [ProducesResponseType(typeof(PagedViewModel<AuditTreeItemResponseModel>), StatusCodes.Status200OK)]
        public async Task<ActionResult<PagedViewModel<AuditTreeItemResponseModel>>> Root()
        {
            var items = new List<AuditTreeItemResponseModel>();
            var audits = await DataService.GetAuditOverviews();
            if (audits.Count != 0)
            {
                audits = audits.Where(x => x.Key != Guid.Empty).OrderByDescending(x => x.RunDate).ToList();

                foreach (var audit in audits)
                {
                    AuditTreeItemResponseModel item = CreateItemResponse(audit);
                    items.Add(item);
                }
            }

            return Ok(new PagedViewModel<AuditTreeItemResponseModel>()
            {
                Items = items,
                Total = items.Count
            });
        }

        /// <summary>
        /// Creates a tree item response model from an audit overview DTO.
        /// </summary>
        /// <param name="item">The audit overview DTO to convert.</param>
        /// <returns>An <see cref="AuditTreeItemResponseModel"/> configured for display in the tree.</returns>
        private AuditTreeItemResponseModel CreateItemResponse(OverviewDto item) =>
            new AuditTreeItemResponseModel
            {
                Id = item.Key,
                HasChildren = false,
                Name = item.RunDate.HasValue ? item.RunDate.Value.ToString("g") : "Audit",
                IsFolder = false,
            };
    }
}
