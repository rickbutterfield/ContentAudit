using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    public class AddContentAnalysisTable : MigrationBase
    {
        public AddContentAnalysisTable(IMigrationContext context) : base(context)
        {
        }

        protected override void Migrate()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "AddContentAnalysisTable");

            if (TableExists(ContentAnalysisSchema.TableName) == false)
            {
                Create.Table<ContentAnalysisSchema>().Do();
            }
            else
            {
                Logger.LogDebug("The database table {DbTable} already exists, skipping", ContentAnalysisSchema.TableName);
            }
        }
    }
} 