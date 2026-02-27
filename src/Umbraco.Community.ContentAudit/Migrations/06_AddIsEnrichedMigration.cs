using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    /// <summary>
    /// Migration that adds the IsEnriched column to the audit overview table
    /// </summary>
    public class AddIsEnrichedMigration : AsyncMigrationBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AddIsEnrichedMigration"/> class
        /// </summary>
        public AddIsEnrichedMigration(IMigrationContext context) : base(context)
        {
        }

        /// <inheritdoc/>
        protected override Task MigrateAsync()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "AddIsEnrichedMigration");

            if (TableExists(OverviewSchema.TableName) && !ColumnExists(OverviewSchema.TableName, "IsEnriched"))
            {
                AddColumn<OverviewSchema>(OverviewSchema.TableName, "IsEnriched");
            }

            return Task.CompletedTask;
        }
    }
}
