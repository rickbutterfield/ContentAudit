using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    /// <summary>
    /// Migration that adds support for incremental crawls via page fingerprints
    /// </summary>
    public class AddPageFingerprintMigration : AsyncMigrationBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AddPageFingerprintMigration"/> class
        /// </summary>
        public AddPageFingerprintMigration(IMigrationContext context) : base(context)
        {
        }

        /// <inheritdoc/>
        protected override Task MigrateAsync()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "AddPageFingerprintMigration");

            if (!TableExists(PageFingerprintSchema.TableName))
            {
                Create.Table<PageFingerprintSchema>().Do();
            }

            return Task.CompletedTask;
        }
    }
}
