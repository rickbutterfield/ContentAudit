using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Community.ContentAudit.Authorization;
using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Api.Audit.Tree
{
    /// <summary>
    /// Management API base controller for common functionality when working with the audit tree.
    /// </summary>
    [ApiExplorerSettings(GroupName = "Audit")]
    [Authorize(Policy = AuthorizationPolicies.SectionAccessContentAudit)]
    [Route($"{Constants.ManagementApi.RootPath}/tree/audit")]
    public class AuditTreeControllerBase : AuditControllerBase
    {
        public AuditTreeControllerBase(IDataService dataService) : base(dataService)
        {
        }
    }
}
