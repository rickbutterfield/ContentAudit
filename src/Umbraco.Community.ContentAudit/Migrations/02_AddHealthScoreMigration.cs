using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    /// <summary>
    /// Migration that adds the HealthScore column to the audit overview table.
    /// </summary>
    /// <remarks>
    /// This migration adds a HealthScore column to track the overall site health for each audit run.
    /// The health score is calculated based on the number of pages with detected issues and stored
    /// for historical tracking and trend analysis.
    /// </remarks>
    public class AddHealthScoreMigration : AsyncMigrationBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AddHealthScoreMigration"/> class.
        /// </summary>
        /// <param name="context">The migration context.</param>
        public AddHealthScoreMigration(IMigrationContext context) : base(context)
        {
        }

        /// <summary>
        /// Executes the migration asynchronously to add the HealthScore column to the overview table.
        /// </summary>
        /// <returns>A task representing the asynchronous operation.</returns>
        /// <remarks>
        /// The HealthScore column is added as a double (floating-point) value with a default of 0.
        /// The column is only added if the table exists and the column doesn't already exist,
        /// making this migration idempotent and safe to run multiple times.
        /// </remarks>
        protected override Task MigrateAsync()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "AddHealthScoreMigration");

            if (TableExists(OverviewSchema.TableName) && !ColumnExists(OverviewSchema.TableName, "HealthScore"))
            {
                AddColumn<OverviewSchema>(OverviewSchema.TableName, "HealthScore");
            }

            return Task.CompletedTask;
        }
    }
}
