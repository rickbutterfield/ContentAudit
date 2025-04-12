using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    public class AddResourcesTable : MigrationBase
    {
        public AddResourcesTable(IMigrationContext context) : base(context)
        {
        }

        protected override void Migrate()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "AddResourcesTable");

            if (TableExists(ResourceSchema.TableName) == false)
            {
                Create.Table<ResourceSchema>().Do();
            }
            else
            {
                Logger.LogDebug("The database table {DbTable} already exists, skipping", ResourceSchema.TableName);
            }
        }
    }
}