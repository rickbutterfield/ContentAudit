using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Community.ContentAudit.Api.Audit;

namespace Umbraco.Community.ContentAudit.Api
{
    /// <summary>
    /// Root base controller for all Content Audit Management API controllers.
    /// </summary>
    /// <remarks>
    /// This controller provides the foundational configuration for all Content Audit API endpoints:
    /// - Maps all derived controllers to the "content-audit" API namespace
    /// - Applies [ApiController] attribute for automatic model validation and binding
    /// - Inherits from <see cref="Controller"/> to provide standard MVC controller functionality
    /// 
    /// All Content Audit API controllers should derive from this base class either directly
    /// or through intermediate base classes like <see cref="AuditControllerBase"/>.
    /// 
    /// The [MapToApi] attribute ensures all endpoints are properly routed under the
    /// "/umbraco/content-audit/management/api/v1/" path prefix.
    /// </remarks>
    [ApiController]
    [MapToApi("content-audit")]
    public class ContentAuditManagementApiControllerBase : Controller
    { }
}
