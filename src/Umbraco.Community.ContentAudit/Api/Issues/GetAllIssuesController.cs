using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.ViewModels.Pagination;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Api.Issue
{
    /// <summary>
    /// Gets all detected issues.
    /// </summary>
    public class GetAllIssuesController : IssueControllerBase
    {
        public GetAllIssuesController(IDataService dataService) : base(dataService) { }

        [HttpGet]
        [ProducesResponseType(typeof(PagedViewModel<IssueDto>), 200)]
        public async Task<PagedViewModel<IssueDto>> GetAllIssues(
            CancellationToken cancellationToken,
            int skip = 0,
            int take = 20)
        {
            var allIssues = await DataService.GetAllIssues();
            var orderedIssues = allIssues.OrderByDescending(x => x.PercentOfTotal).ToList();

            var viewModel = new PagedViewModel<IssueDto>
            {
                Total = orderedIssues.Count(),
                Items = orderedIssues.Skip(skip).Take(take)
            };

            return viewModel;
        }
    }
}
