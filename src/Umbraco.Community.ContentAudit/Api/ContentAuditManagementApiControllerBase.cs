using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;

namespace Umbraco.Community.ContentAudit.Api
{
    [ApiController]
    [MapToApi("content-audit")]
    public class ContentAuditManagementApiControllerBase : Controller
    { }
}
