using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.ViewModels.Pagination;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Api.Audit
{
    /// <summary>
    /// Gets carbon rating data for all pages.
    /// </summary>
    public class GetCarbonRatingsController : AuditControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the controller.
        /// </summary>
        /// <param name="dataService">Audit data service.</param>
        public GetCarbonRatingsController(IDataService dataService) : base(dataService) { }

        /// <summary>
        /// Returns a paginated list of pages with carbon rating data.
        /// </summary>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <param name="skip">Items to skip.</param>
        /// <param name="take">Items to take.</param>
        /// <param name="filter">Optional filter string.</param>
        [HttpGet("carbon-ratings")]
        [ProducesResponseType(typeof(PagedViewModel<CarbonRatingListItemDto>), 200)]
        public async Task<PagedViewModel<CarbonRatingListItemDto>> GetCarbonRatings(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20,
            string filter = "")
        {
            var latestData = await DataService.GetCarbonRatingListItems(filter);

            var viewModel = new PagedViewModel<CarbonRatingListItemDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
            };

            return viewModel;
        }
    }
}
