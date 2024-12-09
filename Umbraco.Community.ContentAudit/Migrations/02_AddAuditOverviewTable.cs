using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    public class AddAuditOverviewTable : MigrationBase
    {
        public AddAuditOverviewTable(IMigrationContext context) : base(context)
        {
        }
        protected override void Migrate()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "AddAuditOverviewTable");

            // Lots of methods available in the MigrationBase class - discover with this.
            if (TableExists(OverviewSchema.TableName) == false)
            {
                Create.Table<OverviewSchema>().Do();
            }
            else
            {
                Logger.LogDebug("The database table {DbTable} already exists, skipping", OverviewSchema.TableName);
            }
        }
    }
}
