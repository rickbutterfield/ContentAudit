using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Community.ContentAudit.Authorization;
using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Api.Crawl
{
    /// <summary>
    /// Management API controller for initiating and monitoring audit crawl operations.
    /// </summary>
    [ApiExplorerSettings(GroupName = "Crawl")]
    [Authorize(Policy = AuthorizationPolicies.SectionAccessContentAudit)]
    [Route($"{Constants.ManagementApi.RootPath}/crawl")]
    public class CrawlControllerBase : ContentAuditManagementApiControllerBase
    {
        /// <summary>
        /// Gets the audit service for accessing audit related services.
        /// </summary>
        /// <value>An <see cref="IAuditService"/> instance providing access to all audit operations.</value>
        protected IAuditService AuditService;

        /// <summary>
        /// Initializes a new instance of the <see cref="CrawlControllerBase"/> class.
        /// </summary>
        /// <param name="auditService">The audit service for performing crawl operations.</param>
        public CrawlControllerBase(IAuditService auditService)
            => AuditService = auditService;
    }
}
