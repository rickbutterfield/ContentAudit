using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    public class AddExternalPageTable : MigrationBase
    {
        public AddExternalPageTable(IMigrationContext context) : base(context)
        {
        }
        protected override void Migrate()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "AddExternalPageTable");

            if (TableExists(ExternalPageSchema.TableName) == false)
            {
                Create.Table<ExternalPageSchema>().Do();
            }
            else
            {
                Logger.LogDebug("The database table {DbTable} already exists, skipping", ExternalPageSchema.TableName);
            }
        }
    }
}
