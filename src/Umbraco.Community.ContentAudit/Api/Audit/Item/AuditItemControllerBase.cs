using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Community.ContentAudit.Authorization;
using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Api.Audit.Item
{
    /// <summary>
    /// Management API base controller for common functionality when working with audit items in the Umbraco backoffice.
    /// </summary>
    [ApiExplorerSettings(GroupName = "Audit")]
    [Authorize(Policy = AuthorizationPolicies.SectionAccessContentAudit)]
    [Route($"{Constants.ManagementApi.RootPath}/item/audit")]
    public class AuditItemControllerBase : AuditControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AuditItemControllerBase"/> class.
        /// </summary>
        /// <param name="dataService">The data service for accessing audit data and tree structure information.</param>
        public AuditItemControllerBase(IDataService dataService) : base(dataService)
        {
        }
    }
}
