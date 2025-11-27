using Microsoft.AspNetCore.Mvc;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Api.Audit
{
    /// <summary>
    /// Gets the latest audit overview containing summary statistics.
    /// </summary>
    public class OverviewByKeyAuditController : AuditControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the controller.
        /// </summary>
        /// <param name="dataService">Audit data service.</param>
        public OverviewByKeyAuditController(IDataService dataService) : base(dataService) { }

        /// <summary>
        /// Returns the latest audit overview.
        /// </summary>
        [HttpGet("{id:guid}/overview")]
        [ProducesResponseType(typeof(OverviewDto), 200)]
        public async Task<OverviewDto> OverviewByKey(Guid id)
        {
            return await DataService.GetAuditOverview(id);
        }
    }
}
