using Microsoft.AspNetCore.Mvc;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Api.Audit
{
    /// <summary>
    /// Gets the latest audit overview containing summary statistics.
    /// </summary>
    public class GetLatestAuditOverviewController : AuditControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the controller.
        /// </summary>
        /// <param name="dataService">Audit data service.</param>
        public GetLatestAuditOverviewController(IDataService dataService) : base(dataService) { }

        /// <summary>
        /// Returns the latest audit overview.
        /// </summary>
        [HttpGet("latest-audit")]
        [ProducesResponseType(typeof(OverviewDto), 200)]
        public async Task<OverviewDto> GetLatestAuditOverview()
        {
            return await DataService.GetLatestAuditOverview();
        }
    }
}
