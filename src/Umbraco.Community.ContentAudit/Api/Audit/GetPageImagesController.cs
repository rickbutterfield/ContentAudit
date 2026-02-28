using Microsoft.AspNetCore.Mvc;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Api.Audit
{
    /// <summary>
    /// Gets images found on a specific page.
    /// </summary>
    public class GetPageImagesController : AuditControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the controller.
        /// </summary>
        /// <param name="dataService">Audit data service.</param>
        public GetPageImagesController(IDataService dataService) : base(dataService) { }

        /// <summary>
        /// Returns images found on the page with the given unique identifier.
        /// </summary>
        /// <param name="cancellationToken">Token to observe while waiting for the task to complete.</param>
        /// <param name="id">Page unique identifier.</param>
        [HttpGet("{id:guid}/images")]
        [ProducesResponseType(typeof(List<ImageDto>), 200)]
        public async Task<IActionResult> GetPageImages(CancellationToken cancellationToken, Guid id)
        {
            var images = await DataService.GetPageImages(id);
            return Ok(images);
        }
    }
}
