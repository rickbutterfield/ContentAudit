using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    public class AddOrphanedTable : MigrationBase
    {
        public AddOrphanedTable(IMigrationContext context) : base(context)
        {
        }
        protected override void Migrate()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "AddOrphanedTable");

            // Lots of methods available in the MigrationBase class - discover with this.
            if (TableExists(OrphanedPageSchema.TableName) == false)
            {
                Create.Table<OrphanedPageSchema>().Do();
            }
            else
            {
                Logger.LogDebug("The database table {DbTable} already exists, skipping", OrphanedPageSchema.TableName);
            }
        }
    }
}
