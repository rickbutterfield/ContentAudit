using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    public class AddAccessibilityTable : MigrationBase
    {
        public AddAccessibilityTable(IMigrationContext context) : base(context)
        {
        }

        protected override void Migrate()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "AddAccessibilityTable");

            if (TableExists(AccessibilitySchema.TableName) == false)
            {
                Create.Table<AccessibilitySchema>().Do();
            }
            else
            {
                Logger.LogDebug("The database table {DbTable} already exists, skipping", AccessibilitySchema.TableName);
            }
        }
    }
}