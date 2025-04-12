using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    public class AddInternalPageTable : MigrationBase
    {
        public AddInternalPageTable(IMigrationContext context) : base(context)
        {
        }
        protected override void Migrate()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "AddInternalPageTable");

            if (TableExists(PageSchema.TableName) == false)
            {
                Create.Table<PageSchema>().Do();
            }
            else
            {
                Logger.LogDebug("The database table {DbTable} already exists, skipping", PageSchema.TableName);
            }
        }
    }
}
