using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.ViewModels.Pagination;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;
using Umbraco.Community.ContentAudit.Models.ManagementApi.Audit.Tree;

namespace Umbraco.Community.ContentAudit.Api.Audit.Tree
{
    /// <summary>
    /// Management API controller for rendering the root items of the audit tree
    /// </summary>
    public class RootAuditTreeController : AuditTreeControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="RootAuditTreeController"/> class.
        /// </summary>
        public RootAuditTreeController(IDataService dataService) : base(dataService)
        {
        }

        /// <summary>
        /// Management API endpoint for rendering the root items of the form's tree.
        /// </summary>
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

        private AuditTreeItemResponseModel CreateItemResponse(OverviewDto item) =>
            new AuditTreeItemResponseModel
            {
                Id = item.Key,
                HasChildren = false,
                Name = item.RunDate.HasValue ? item.RunDate.Value.ToString("g") : "Audit",
                IsFolder = false
            };
    }
}
