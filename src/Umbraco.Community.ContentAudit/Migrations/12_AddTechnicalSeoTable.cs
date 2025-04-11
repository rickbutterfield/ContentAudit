using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    public class AddTechnicalSeoTable : MigrationBase
    {
        public AddTechnicalSeoTable(IMigrationContext context) : base(context)
        {
        }

        protected override void Migrate()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "AddTechnicalSeoTable");

            if (TableExists(TechnicalSeoSchema.TableName) == false)
            {
                Create.Table<TechnicalSeoSchema>().Do();
            }
            else
            {
                Logger.LogDebug("The database table {DbTable} already exists, skipping", TechnicalSeoSchema.TableName);
            }
        }
    }
}