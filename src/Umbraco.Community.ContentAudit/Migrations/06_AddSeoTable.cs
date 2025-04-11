using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    public class AddSeoTable : MigrationBase
    {
        public AddSeoTable(IMigrationContext context) : base(context)
        {
        }

        protected override void Migrate()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "AddSeoTable");

            if (TableExists(SeoSchema.TableName) == false)
            {
                Create.Table<SeoSchema>().Do();
            }
            else
            {
                Logger.LogDebug("The database table {DbTable} already exists, skipping", SeoSchema.TableName);
            }
        }
    }
} 