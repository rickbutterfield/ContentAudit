using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Api.Issue
{
    /// <summary>
    /// Gets an issue by its unique identifier.
    /// </summary>
    public class GetByKeyIssueController : IssueControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the controller.
        /// </summary>
        /// <param name="dataService">Audit data service.</param>
        public GetByKeyIssueController(IDataService dataService) : base(dataService) { }

        /// <summary>
        /// Returns details for a specific issue.
        /// </summary>
        /// <param name="id">Issue unique identifier.</param>
        [HttpGet("{id:guid}")]
        [ProducesResponseType(typeof(IssueDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetIssue(Guid id)
        {
            var issue = await DataService.GetIssue(id);
            return issue != null ? Ok(issue) : NotFoundProblem("Issue", id);
        }
    }
}
