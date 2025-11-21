using Microsoft.AspNetCore.Mvc;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Api.Audit
{
    /// <summary>
    /// Gets latest audit data for a specific page.
    /// </summary>
    public class GetByKeyAuditController : AuditControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the controller.
        /// </summary>
        /// <param name="dataService">Audit data service.</param>
        public GetByKeyAuditController(IDataService dataService) : base(dataService) { }

        /// <summary>
        /// Returns page analysis for the given unique identifier.
        /// </summary>
        /// <param name="unique">Page unique identifier.</param>
        [HttpGet("latest-page-data")]
        [ProducesResponseType(typeof(PageAnalysisDto), 200)]
        public async Task<PageAnalysisDto> GetByKey(Guid unique)
        {
            var latestData = await DataService.GetLatestPageAuditData(unique);
            return latestData;
        }
    }
}
