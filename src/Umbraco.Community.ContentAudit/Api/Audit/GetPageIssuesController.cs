using Microsoft.AspNetCore.Mvc;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Api.Audit
{
    /// <summary>
    /// Gets audit issues detected on a specific page.
    /// </summary>
    public class GetPageIssuesController : AuditControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the controller.
        /// </summary>
        /// <param name="dataService">Audit data service.</param>
        public GetPageIssuesController(IDataService dataService) : base(dataService) { }

        /// <summary>
        /// Returns audit issues detected on the page with the given unique identifier.
        /// </summary>
        /// <param name="cancellationToken">Token to observe while waiting for the task to complete.</param>
        /// <param name="id">Page unique identifier.</param>
        [HttpGet("{id:guid}/issues")]
        [ProducesResponseType(typeof(List<IssueDto>), 200)]
        public async Task<IActionResult> GetPageIssues(CancellationToken cancellationToken, Guid id)
        {
            var issues = await DataService.GetPageIssues(id);
            return Ok(issues);
        }
    }
}
