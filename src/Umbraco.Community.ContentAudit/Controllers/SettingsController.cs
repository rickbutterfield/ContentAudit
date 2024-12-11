using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Umbraco.Community.ContentAudit.Common.Configuration;

namespace Umbraco.Community.ContentAudit.Controllers
{
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "Settings")]
    public class SettingsController : ContentAuditControllerBase
    {
        private readonly ContentAuditSettings _contentAuditSettings;

        public SettingsController(
            IOptionsMonitor<ContentAuditSettings> optionsMonitor)
        {
            _contentAuditSettings = optionsMonitor.CurrentValue;
        }

        [HttpGet("get-settings")]
        [ProducesResponseType(typeof(ContentAuditSettings), 200)]
        public ContentAuditSettings GetSettings()
        {
            return _contentAuditSettings;
        }
    }
}
