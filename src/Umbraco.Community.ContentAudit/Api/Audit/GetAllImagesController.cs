using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.ViewModels.Pagination;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Api.Audit
{
    /// <summary>
    /// Gets all images discovered in the audit.
    /// </summary>
    public class GetAllImagesController : AuditControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the controller.
        /// </summary>
        /// <param name="dataService">Audit data service.</param>
        public GetAllImagesController(IDataService dataService) : base(dataService) { }

        /// <summary>
        /// Returns a paginated list of images.
        /// </summary>
        /// <param name="skip">Items to skip.</param>
        /// <param name="take">Items to take.</param>
        /// <param name="filter">Optional filter string.</param>
        [HttpGet("all-images")]
        [ProducesResponseType(typeof(PagedViewModel<ImageDto>), 200)]
        public async Task<PagedViewModel<ImageDto>> GetAllImages(int skip = 0, int take = 20, string filter = "")
        {
            var latestData = await DataService.GetAllImages(filter);

            var viewModel = new PagedViewModel<ImageDto>
            {
                Total = latestData.Count(),
                Items = latestData.Skip(skip).Take(take)
            };

            return viewModel;
        }
    }
}
