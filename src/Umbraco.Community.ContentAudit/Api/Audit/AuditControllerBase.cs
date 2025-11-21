using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Community.ContentAudit.Authorization;
using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Api.Audit
{
    /// <summary>
    /// Management API base controller for common functionality when working with audits.
    /// </summary>
    [ApiExplorerSettings(GroupName = "Audit")]
    [Authorize(Policy = AuthorizationPolicies.SectionAccessContentAudit)]
    [Route($"{Constants.ManagementApi.RootPath}/audit")]
    public class AuditControllerBase : ContentAuditManagementApiControllerBase
    {
        public AuditControllerBase(
            IDataService dataService)
        => DataService = dataService;

        /// <summary>
        /// Gets the <see cref="IDataService"/>.
        /// </summary>
        protected IDataService DataService { get; }
    }
}
