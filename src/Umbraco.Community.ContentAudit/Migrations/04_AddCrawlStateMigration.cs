using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    /// <summary>
    /// Migration that adds support for streaming results and resumable crawls
    /// </summary>
    public class AddCrawlStateMigration : AsyncMigrationBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AddCrawlStateMigration"/> class
        /// </summary>
        public AddCrawlStateMigration(IMigrationContext context) : base(context)
        {
        }

        /// <inheritdoc/>
        protected override Task MigrateAsync()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "AddCrawlStateMigration");

            if (TableExists(OverviewSchema.TableName))
            {
                if (!ColumnExists(OverviewSchema.TableName, "Status"))
                {
                    // SQLite requires a default value when adding NOT NULL column to existing table
                    Execute.Sql($"ALTER TABLE {OverviewSchema.TableName} ADD COLUMN Status INTEGER NOT NULL DEFAULT 1").Do();
                }

                if (!ColumnExists(OverviewSchema.TableName, "BaseUrl"))
                {
                    // BaseUrl is nullable so we can use the standard method
                    AddColumn<OverviewSchema>(OverviewSchema.TableName, "BaseUrl");
                }
            }

            if (!TableExists(CrawlStateSchema.TableName))
            {
                Create.Table<CrawlStateSchema>().Do();
            }

            return Task.CompletedTask;
        }
    }
}
