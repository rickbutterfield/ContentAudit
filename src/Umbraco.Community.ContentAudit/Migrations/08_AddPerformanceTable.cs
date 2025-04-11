using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    public class AddPerformanceTable : MigrationBase
    {
        public AddPerformanceTable(IMigrationContext context) : base(context)
        {
        }

        protected override void Migrate()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "AddPerformanceTable");

            if (TableExists(PerformanceSchema.TableName) == false)
            {
                Create.Table<PerformanceSchema>().Do();
            }
            else
            {
                Logger.LogDebug("The database table {DbTable} already exists, skipping", PerformanceSchema.TableName);
            }
        }
    }
} 