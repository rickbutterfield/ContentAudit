using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Umbraco.Community.ContentAudit.Configuration;

namespace Umbraco.Community.ContentAudit.Api.Settings
{
    /// <summary>
    /// Management API controller for retrieving Content Audit configuration settings.
    /// </summary>
    [ApiExplorerSettings(GroupName = "Settings")]
    [AllowAnonymous]
    [Route($"{Constants.ManagementApi.RootPath}/settings")]
    public class SettingsControllerBase : ContentAuditManagementApiControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="SettingsControllerBase"/> class.
        /// </summary>
        /// <param name="optionsMonitor">The options monitor for accessing Content Audit settings.</param>
        public SettingsControllerBase(IOptionsMonitor<ContentAuditSettings> optionsMonitor)
            => ContentAuditSettings = optionsMonitor.CurrentValue;

        /// <summary>
        /// Content Audit configuration settings.
        /// </summary>
        protected ContentAuditSettings ContentAuditSettings;
    }
}
