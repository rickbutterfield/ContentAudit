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

            if (TableExists(InternalPageSchema.TableName) == false)
            {
                Create.Table<InternalPageSchema>().Do();
            }
            else
            {
                Logger.LogDebug("The database table {DbTable} already exists, skipping", InternalPageSchema.TableName);
            }
        }
    }
}
