using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    public class AddContentQualityTable : MigrationBase
    {
        public AddContentQualityTable(IMigrationContext context) : base(context)
        {
        }

        protected override void Migrate()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "AddContentQualityTable");

            if (TableExists(ContentQualitySchema.TableName) == false)
            {
                Create.Table<ContentQualitySchema>().Do();
            }
            else
            {
                Logger.LogDebug("The database table {DbTable} already exists, skipping", ContentQualitySchema.TableName);
            }
        }
    }
}