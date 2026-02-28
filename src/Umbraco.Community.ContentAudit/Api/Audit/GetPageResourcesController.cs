using Microsoft.AspNetCore.Mvc;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Api.Audit
{
    /// <summary>
    /// Gets resources loaded by a specific page.
    /// </summary>
    public class GetPageResourcesController : AuditControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the controller.
        /// </summary>
        /// <param name="dataService">Audit data service.</param>
        public GetPageResourcesController(IDataService dataService) : base(dataService) { }

        /// <summary>
        /// Returns resources loaded by the page with the given unique identifier.
        /// </summary>
        /// <param name="cancellationToken">Token to observe while waiting for the task to complete.</param>
        /// <param name="id">Page unique identifier.</param>
        [HttpGet("{id:guid}/resources")]
        [ProducesResponseType(typeof(List<ResourceDto>), 200)]
        public async Task<IActionResult> GetPageResources(CancellationToken cancellationToken, Guid id)
        {
            var resources = await DataService.GetPageResources(id);
            return Ok(resources);
        }
    }
}
