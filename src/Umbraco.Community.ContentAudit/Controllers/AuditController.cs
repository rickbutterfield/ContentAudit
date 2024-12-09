using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Controllers
{
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "Audit")]
    public class AuditController : ContentAuditControllerBase
    {
        private readonly IAuditService _auditService;

        public AuditController(
            IAuditService auditService)
        {
            _auditService = auditService;
        }

        [HttpGet("latest-audit")]
        [ProducesResponseType(typeof(AuditOverviewDto), 200)]
        public async Task<AuditOverviewDto> GetLatestAuditOverview()
        {
            return await _auditService.GetLatestAuditOverview();
        }
    }
}
