using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface IAuditService
    {
        Task<AuditOverviewDto> GetLatestAuditOverview();
    }
}
