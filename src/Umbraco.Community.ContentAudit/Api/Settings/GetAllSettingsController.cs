using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Umbraco.Community.ContentAudit.Configuration;

namespace Umbraco.Community.ContentAudit.Api.Settings
{
    /// <summary>
    /// Gets all Content Audit configuration settings.
    /// </summary>
    public class GetAllSettingsController : SettingsControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the controller.
        /// </summary>
        /// <param name="optionsMonitor">ContentAudit settings</param>
        public GetAllSettingsController(IOptionsMonitor<ContentAuditSettings> optionsMonitor) : base(optionsMonitor) { }

        /// <summary>
        /// Gets the current Content Audit configuration settings.
        /// </summary>
        /// <returns>A <see cref="ContentAuditSettings"/> containing the current configuration.</returns>
        /// <remarks>
        /// This endpoint retrieves settings such as base URL, maximum concurrent crawls,
        /// robots.txt compliance, sitemap.xml usage, and Umbraco content index integration.
        /// </remarks>
        [HttpGet]
        [ProducesResponseType(typeof(ContentAuditSettings), 200)]
        public ContentAuditSettings GetSettings()
            => ContentAuditSettings;
    }
}
