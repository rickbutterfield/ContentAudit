using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.ViewModels.Pagination;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Api.Audit
{
    /// <summary>
    /// Gets pages with missing metadata.
    /// </summary>
    public class GetPagesWithMissingMetadataController : AuditControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the controller.
        /// </summary>
        /// <param name="dataService">Audit data service.</param>
        public GetPagesWithMissingMetadataController(IDataService dataService) : base(dataService) { }

        /// <summary>
        /// Returns a paginated list of pages missing metadata.
        /// </summary>
        /// <param name="cancellationToken">Cancellation token.</param>
        /// <param name="skip">Items to skip.</param>
        /// <param name="take">Items to take.</param>
        /// <param name="filter">Optional filter string.</param>
        [HttpGet("missing-metadata")]
        [ProducesResponseType(typeof(PagedViewModel<PageAnalysisDto>), 200)]
        public async Task<PagedViewModel<PageAnalysisDto>> GetPagesWithMissingMetadata(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20,
            string filter = "")
        {
            var latestData = await DataService.GetPagesWithMissingMetadata(filter);

            var viewModel = new PagedViewModel<PageAnalysisDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
            };

            return viewModel;
        }
    }
}
