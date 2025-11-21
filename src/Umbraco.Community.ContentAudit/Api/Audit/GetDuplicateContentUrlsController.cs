using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.ViewModels.Pagination;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Api.Audit
{
    /// <summary>
    /// Gets URLs with duplicate content.
    /// </summary>
    public class GetDuplicateContentUrlsController : AuditControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the controller.
        /// </summary>
        /// <param name="dataService">Audit data service.</param>
        public GetDuplicateContentUrlsController(IDataService dataService) : base(dataService) { }

        /// <summary>
        /// Returns a paginated list of duplicate content URLs.
        /// </summary>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <param name="skip">Items to skip.</param>
        /// <param name="take">Items to take.</param>
        /// <param name="filter">Optional filter string.</param>
        [HttpGet("duplicate-content")]
        [ProducesResponseType(typeof(PagedViewModel<PageDto>), 200)]
        public async Task<PagedViewModel<PageDto>> GetDuplicateContentUrls(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20,
            string filter = "")
        {
            var latestData = await DataService.GetDuplicateContentUrls(filter);

            var viewModel = new PagedViewModel<PageDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
            };

            return viewModel;
        }
    }
}
