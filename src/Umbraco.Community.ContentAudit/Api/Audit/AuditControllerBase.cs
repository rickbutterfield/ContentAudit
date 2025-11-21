using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Community.ContentAudit.Authorization;
using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Api.Audit
{
    /// <summary>
    /// Management API base controller for common functionality when working with audits.
    /// </summary>
    /// <remarks>
    /// This controller serves as the base for all audit-related API controllers, providing:
    /// - Common data service access for audit operations
    /// - Authorization enforcement for Content Audit section access
    /// - Consistent routing under "/umbraco/content-audit/management/api/v1/audit"
    /// - API grouping under the "Audit" category for documentation
    /// 
    /// All derived controllers inherit the data service and authorization configuration,
    /// ensuring consistent access patterns and security across all audit endpoints.
    /// </remarks>
    [ApiExplorerSettings(GroupName = "Audit")]
    [Authorize(Policy = AuthorizationPolicies.SectionAccessContentAudit)]
    [Route($"{Constants.ManagementApi.RootPath}/audit")]
    public class AuditControllerBase : ContentAuditManagementApiControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AuditControllerBase"/> class.
        /// </summary>
        /// <param name="dataService">The data service for accessing audit data.</param>
        public AuditControllerBase(
            IDataService dataService)
        {
            DataService = dataService;
        }

        /// <summary>
        /// Gets the data service for accessing audit data, issues, pages, and related information.
        /// </summary>
        /// <value>An <see cref="IDataService"/> instance providing access to all audit data operations.</value>
        protected IDataService DataService { get; }
    }
}
