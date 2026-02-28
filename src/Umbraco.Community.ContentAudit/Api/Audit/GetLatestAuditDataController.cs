using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.ViewModels.Pagination;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Api.Audit
{
    /// <summary>
    /// Gets latest audit data for all pages.
    /// </summary>
    public class GetLatestAuditDataController : AuditControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the controller.
        /// </summary>
        /// <param name="dataService">Audit data service.</param>
        public GetLatestAuditDataController(IDataService dataService) : base(dataService) { }

        /// <summary>
        /// Returns paged lightweight audit data for list views.
        /// </summary>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <param name="skip">Items to skip.</param>
        /// <param name="take">Items to take.</param>
        /// <param name="filter">Optional filter string.</param>
        /// <param name="statusCode">Optional HTTP status filter.</param>
        [HttpGet("latest-data")]
        [ProducesResponseType(typeof(PagedViewModel<PageListItemDto>), 200)]
        public async Task<PagedViewModel<PageListItemDto>> GetLatestAuditData(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20,
            string filter = "",
            int statusCode = 0)
        {
            var latestData = await DataService.GetLatestAuditDataLightweight(filter, statusCode);

            var viewModel = new PagedViewModel<PageListItemDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
            };

            return viewModel;
        }
    }
}
