using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.ViewModels.Pagination;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Api.Issue
{
    /// <summary>
    /// Gets paginated references (pages or images) affected by a specific issue.
    /// </summary>
    public class GetIssueReferencesController : IssueControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the controller.
        /// </summary>
        /// <param name="dataService">Audit data service.</param>
        public GetIssueReferencesController(IDataService dataService) : base(dataService) { }

        /// <summary>
        /// Returns paginated references for a specific issue.
        /// </summary>
        /// <param name="id">Issue unique identifier.</param>
        /// <param name="skip">Number of items to skip.</param>
        /// <param name="take">Number of items to take.</param>
        /// <param name="filter">Optional URL filter.</param>
        [HttpGet("{id:guid}/references")]
        [ProducesResponseType(typeof(PagedViewModel<IssueReferenceDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetIssueReferences(Guid id, int skip = 0, int take = 50, string filter = "")
        {
            var result = await DataService.GetIssueReferences(id, skip, take, filter);

            if (result == null)
                return NotFoundProblem("Issue", id);

            return Ok(new PagedViewModel<IssueReferenceDto>
            {
                Total = result.Value.Total,
                Items = result.Value.Items
            });
        }
    }
}
