using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.ViewModels.Pagination;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Api.Audit
{
    /// <summary>
    /// Gets Core Web Vitals data for all pages.
    /// </summary>
    public class GetCoreWebVitalsController : AuditControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the controller.
        /// </summary>
        /// <param name="dataService">Audit data service.</param>
        public GetCoreWebVitalsController(IDataService dataService) : base(dataService) { }

        /// <summary>
        /// Returns a paginated list of pages with Core Web Vitals data.
        /// </summary>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <param name="skip">Items to skip.</param>
        /// <param name="take">Items to take.</param>
        /// <param name="filter">Optional filter string.</param>
        [HttpGet("core-web-vitals")]
        [ProducesResponseType(typeof(PagedViewModel<CoreWebVitalsListItemDto>), 200)]
        public async Task<PagedViewModel<CoreWebVitalsListItemDto>> GetCoreWebVitals(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20,
            string filter = "")
        {
            var latestData = await DataService.GetCoreWebVitalsListItems(filter);

            var viewModel = new PagedViewModel<CoreWebVitalsListItemDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
            };

            return viewModel;
        }
    }
}
