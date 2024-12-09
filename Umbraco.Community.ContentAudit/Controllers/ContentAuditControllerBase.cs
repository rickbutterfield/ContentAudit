using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Web.Common.Routing;

namespace Umbraco.Community.ContentAudit.Controllers
{
    [ApiController]
    [BackOfficeRoute("content-audit/api/v{version:apiVersion}")]
    [AllowAnonymous]
    [MapToApi("content-audit")]
    public class ContentAuditControllerBase : Controller
    { }
}
