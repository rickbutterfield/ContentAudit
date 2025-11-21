using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.ViewModels.Pagination;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Api.Audit
{
    /// <summary>
    /// Management API controller for retrieving a collection of audit overviews.
    /// </summary>
    public class GetCollectionAuditsController : AuditControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GetCollectionAuditsController"/> class.
        /// </summary>
        /// <param name="dataService">The data service for audit operations.</param>
        public GetCollectionAuditsController(IDataService dataService) : base(dataService) { }

        /// <summary>
        /// Gets a paginated collection of all audit run overviews with summary statistics and health scores.
        /// </summary>
        /// <param name="skip">Number of items to skip for pagination. Default is 0.</param>
        /// <param name="take">Number of items to take for pagination. Default is max integer value (all items).</param>
        /// <returns>A paged view model containing audit overview data including run dates, URL counts, and health scores.</returns>
        /// <remarks>
        /// This endpoint is useful for displaying historical audit data and tracking site health over time.
        /// Each overview includes the total number of URLs crawled, internal/external/asset counts, and the calculated health score.
        /// </remarks>
        [HttpGet]
        [ProducesResponseType(typeof(PagedViewModel<OverviewDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetCollection(int skip = 0, int take = int.MaxValue)
        {
            var audits = await DataService.GetAuditOverviews();

            var viewModel = new PagedViewModel<OverviewDto>
            {
                Total = audits.Count,
                Items = audits.Skip(skip).Take(take)
            };

            return Ok(viewModel);
        }
    }
}
