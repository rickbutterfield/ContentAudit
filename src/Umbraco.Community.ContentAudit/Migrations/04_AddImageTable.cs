using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    public class AddImageTable : MigrationBase
    {
        public AddImageTable(IMigrationContext context) : base(context)
        {
        }
        protected override void Migrate()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "AddImageTable");

            // Lots of methods available in the MigrationBase class - discover with this.
            if (TableExists(ImageSchema.TableName) == false)
            {
                Create.Table<ImageSchema>().Do();
            }
            else
            {
                Logger.LogDebug("The database table {DbTable} already exists, skipping", ImageSchema.TableName);
            }
        }
    }
}
