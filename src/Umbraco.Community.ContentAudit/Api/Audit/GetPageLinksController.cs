using Microsoft.AspNetCore.Mvc;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Api.Audit
{
    /// <summary>
    /// Gets links found on a specific page.
    /// </summary>
    public class GetPageLinksController : AuditControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the controller.
        /// </summary>
        /// <param name="dataService">Audit data service.</param>
        public GetPageLinksController(IDataService dataService) : base(dataService) { }

        /// <summary>
        /// Returns links found on the page with the given unique identifier.
        /// </summary>
        /// <param name="cancellationToken">Token to observe while waiting for the task to complete.</param>
        /// <param name="id">Page unique identifier.</param>
        [HttpGet("{id:guid}/links")]
        [ProducesResponseType(typeof(List<LinkDto>), 200)]
        public async Task<IActionResult> GetPageLinks(CancellationToken cancellationToken, Guid id)
        {
            var links = await DataService.GetPageLinks(id);
            return Ok(links);
        }
    }
}
