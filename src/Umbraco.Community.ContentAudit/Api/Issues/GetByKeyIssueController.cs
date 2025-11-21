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
        [ProducesResponseType(typeof(IssueDto), 200)]
        public async Task<IssueDto?> GetIssue(Guid id)
            => await DataService.GetIssue(id);
    }
}
