using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Umbraco.Community.ContentAudit.Configuration;

namespace Umbraco.Community.ContentAudit.Api
{
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "Settings")]
    [AllowAnonymous]
    [Route($"{Constants.ManagementApi.RootPath}/settings")]
    public class SettingsController : ContentAuditManagementApiControllerBase
    {
        private readonly ContentAuditSettings _contentAuditSettings;

        public SettingsController(IOptionsMonitor<ContentAuditSettings> optionsMonitor)
            => _contentAuditSettings = optionsMonitor.CurrentValue;

        [HttpGet]
        [ProducesResponseType(typeof(ContentAuditSettings), 200)]
        public ContentAuditSettings GetSettings()
        {
            return _contentAuditSettings;
        }
    }
}
