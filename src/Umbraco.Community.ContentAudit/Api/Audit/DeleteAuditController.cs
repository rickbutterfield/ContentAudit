using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Api.Audit
{
    /// <summary>
    /// Deletes an audit and all its related data.
    /// </summary>
    public class DeleteAuditController : AuditControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the controller.
        /// </summary>
        /// <param name="dataService">Audit data service.</param>
        public DeleteAuditController(IDataService dataService) : base(dataService) { }

        /// <summary>
        /// Deletes an audit by its unique identifier.
        /// </summary>
        /// <param name="id">Audit unique identifier.</param>
        [HttpDelete("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(Guid id)
        {
            var result = await DataService.DeleteAudit(id);
            return result ? Ok() : NotFound();
        }
    }
}
