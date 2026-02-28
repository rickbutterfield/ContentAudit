using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Community.ContentAudit.Authorization;

namespace Umbraco.Community.ContentAudit.Api.Enrich
{
    /// <summary>
    /// Management API controller for triggering and monitoring Playwright performance enrichment.
    /// </summary>
    [ApiExplorerSettings(GroupName = "Enrich")]
    [Authorize(Policy = AuthorizationPolicies.SectionAccessContentAudit)]
    [Route($"{Constants.ManagementApi.RootPath}/enrich")]
    public class EnrichControllerBase : ContentAuditManagementApiControllerBase
    {
    }
}
