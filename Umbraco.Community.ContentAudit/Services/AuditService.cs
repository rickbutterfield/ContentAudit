using Umbraco.Cms.Infrastructure.Scoping;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Services
{
    public class AuditService : IAuditService
    {
        private readonly IScopeProvider _scopeProvider;

        public AuditService(
            IScopeProvider scopeProvider)
        {
            _scopeProvider = scopeProvider;
        }
        
        public async Task<AuditOverviewDto> GetLatestAuditOverview()
        {
            var auditOverview = new AuditOverviewDto();

            using var scope = _scopeProvider.CreateScope();

            var latestAudit = await scope.Database.FetchAsync<OverviewSchema>(
                $"SELECT * FROM [{OverviewSchema.TableName}] ORDER BY [RunDate] DESC LIMIT 1");

            if (latestAudit != null && latestAudit?.Any() == true)
                auditOverview = new AuditOverviewDto(latestAudit.First());

            scope.Complete();

            return auditOverview;
        }
    }
}
