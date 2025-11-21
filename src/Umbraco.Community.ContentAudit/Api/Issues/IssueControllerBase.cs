using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Community.ContentAudit.Authorization;
using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Api.Issue
{
    /// <summary>
    /// Management API base controller for common functionality when working with issues.
    /// </summary>
    [ApiExplorerSettings(GroupName = "Issue")]
    [Authorize(Policy = AuthorizationPolicies.SectionAccessContentAudit)]
    [Route($"{Constants.ManagementApi.RootPath}/issue")]
    public class IssueControllerBase : ContentAuditManagementApiControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="IssueControllerBase"/> class.
        /// </summary>
        /// <param name="dataService">The data service for accessing issue data.</param>
        public IssueControllerBase(IDataService dataService)
            => DataService = dataService;

        /// <summary>
        /// Gets the data service for accessing issue data.
        /// </summary>
        protected IDataService DataService { get; }
    }
}
