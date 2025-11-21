using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Community.ContentAudit.Authorization;
using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Api.Audit.Tree
{
    /// <summary>
    /// Management API base controller for common functionality when working with the audit tree in the Umbraco backoffice.
    /// </summary>
    /// <remarks>
    /// This controller serves as the base for all audit tree-related controllers, providing common configuration
    /// including authorization, routing, and API grouping. Tree controllers are used to render hierarchical views
    /// of audit runs in the Umbraco backoffice navigation.
    /// 
    /// The controller enforces Content Audit section access authorization and is grouped under the "Audit" API explorer category.
    /// All derived controllers will inherit the base route "/umbraco/content-audit/management/api/v1/tree/audit".
    /// </remarks>
    [ApiExplorerSettings(GroupName = "Audit")]
    [Authorize(Policy = AuthorizationPolicies.SectionAccessContentAudit)]
    [Route($"{Constants.ManagementApi.RootPath}/tree/audit")]
    public class AuditTreeControllerBase : AuditControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AuditTreeControllerBase"/> class.
        /// </summary>
        /// <param name="dataService">The data service for accessing audit data and tree structure information.</param>
        public AuditTreeControllerBase(IDataService dataService) : base(dataService)
        {
        }
    }
}
