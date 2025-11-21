using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Umbraco.Community.ContentAudit.Configuration;

namespace Umbraco.Community.ContentAudit.Api
{
    /// <summary>
    /// Management API controller for retrieving Content Audit configuration settings.
    /// </summary>
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "Settings")]
    [AllowAnonymous]
    [Route($"{Constants.ManagementApi.RootPath}/settings")]
    public class SettingsController : ContentAuditManagementApiControllerBase
    {
        private readonly ContentAuditSettings _contentAuditSettings;

        /// <summary>
        /// Initializes a new instance of the <see cref="SettingsController"/> class.
        /// </summary>
        /// <param name="optionsMonitor">The options monitor for accessing Content Audit settings.</param>
        public SettingsController(IOptionsMonitor<ContentAuditSettings> optionsMonitor)
            => _contentAuditSettings = optionsMonitor.CurrentValue;

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
        {
            return _contentAuditSettings;
        }
    }
}
