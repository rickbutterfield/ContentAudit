using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    public class AddAuditPageTable : MigrationBase
    {
        public AddAuditPageTable(IMigrationContext context) : base(context)
        {
        }
        protected override void Migrate()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "AddAuditPageTable");

            // Lots of methods available in the MigrationBase class - discover with this.
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
