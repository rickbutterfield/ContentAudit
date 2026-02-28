using Microsoft.AspNetCore.Mvc;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Api.Audit
{
    /// <summary>
    /// Gets latest audit data for a specific page.
    /// </summary>
    public class ByKeyAuditController : AuditControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the controller.
        /// </summary>
        /// <param name="dataService">Audit data service.</param>
        public ByKeyAuditController(IDataService dataService) : base(dataService) { }

        /// <summary>
        /// Returns page analysis for the given unique identifier.
        /// </summary>
        /// <param name="cancellationToken">Token to observe while waiting for the task to complete.</param>
        /// <param name="id">Page unique identifier.</param>
        [HttpGet("{id:guid}")]
        [ProducesResponseType(typeof(PageAnalysisDto), 200)]
        public async Task<IActionResult> GetByKey(CancellationToken cancellationToken, Guid id)
        {
            PageAnalysisDto audit = await DataService.GetLatestPageAuditData(id);
            return Ok(audit);
        }
    }
}
