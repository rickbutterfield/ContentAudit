using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.ViewModels.Pagination;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Api.Audit
{
    /// <summary>
    /// Gets internal links grouped by URL.
    /// </summary>
    public class GetInternalLinksController : AuditControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the controller.
        /// </summary>
        /// <param name="dataService">Audit data service.</param>
        public GetInternalLinksController(IDataService dataService) : base(dataService) { }

        /// <summary>
        /// Returns a paginated list of grouped internal links.
        /// </summary>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <param name="skip">Items to skip.</param>
        /// <param name="take">Items to take.</param>
        /// <param name="filter">Optional filter string.</param>
        [HttpGet("internal-links")]
        [ProducesResponseType(typeof(PagedViewModel<LinkGroupDto>), 200)]
        public async Task<PagedViewModel<LinkGroupDto>> GetInternalLinks(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20,
            string filter = "")
        {
            var latestData = await DataService.GetInternalLinks(filter);

            var viewModel = new PagedViewModel<LinkGroupDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
            };

            return viewModel;
        }
    }
}
