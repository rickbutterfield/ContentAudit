using Microsoft.AspNetCore.Mvc;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Api.Audit
{
    /// <summary>
    /// Gets the overall health score for the site.
    /// </summary>
    public class GetHealthScoreController : AuditControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the controller.
        /// </summary>
        /// <param name="dataService">Audit data service.</param>
        public GetHealthScoreController(IDataService dataService) : base(dataService) { }

        /// <summary>
        /// Returns the health score.
        /// </summary>
        [HttpGet("health-score")]
        [ProducesResponseType(typeof(HealthScoreDto), 200)]
        public async Task<HealthScoreDto> GetHealthScore()
        {
            return await DataService.GetHealthScore();
        }
    }
}
