using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    public class AddLinksTable : MigrationBase
    {
        public AddLinksTable(IMigrationContext context) : base(context)
        {
        }

        protected override void Migrate()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "AddLinksTable");

            if (TableExists(LinkSchema.TableName) == false)
            {
                Create.Table<LinkSchema>().Do();
            }
            else
            {
                Logger.LogDebug("The database table {DbTable} already exists, skipping", LinkSchema.TableName);
            }
        }
    }
} 