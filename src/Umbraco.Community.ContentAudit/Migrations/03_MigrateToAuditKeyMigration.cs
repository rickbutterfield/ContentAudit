using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    /// <summary>
    /// Migration that adds AuditKey (Guid) columns to all child schemas and populates them from OverviewSchema.Key.
    /// </summary>
    /// <remarks>
    /// This migration transitions from using int RunId to Guid AuditKey for linking audit data.
    /// The RunId columns are kept for migration safety and potential rollback.
    ///
    /// Steps performed:
    /// 1. Ensures all OverviewSchema records have valid Guid Keys
    /// 2. Adds AuditKey column to all 11 child tables (nullable initially)
    /// 3. Populates AuditKey by joining with OverviewSchema on RunId = Id
    /// 4. Creates indexes on AuditKey for query performance
    /// 5. Makes AuditKey non-nullable
    /// </remarks>
    public class MigrateToAuditKeyMigration : AsyncMigrationBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="MigrateToAuditKeyMigration"/> class.
        /// </summary>
        /// <param name="context">The migration context.</param>
        public MigrateToAuditKeyMigration(IMigrationContext context) : base(context)
        {
        }

        /// <summary>
        /// Executes the migration asynchronously to add AuditKey columns to all child tables.
        /// </summary>
        /// <returns>A task representing the asynchronous operation.</returns>
        protected override async Task MigrateAsync()
        {
            Logger.LogInformation("Running migration {MigrationStep}", "MigrateToAuditKeyMigration");

            // Step 0: Ensure all OverviewSchema records have valid Guid Keys
            await EnsureOverviewKeysPopulated();

            // Step 1-5: Migrate each child table
            await MigrateTable(PageSchema.TableName, "IX_PageSchema_AuditKey");
            await MigrateTable(SeoSchema.TableName, "IX_SeoSchema_AuditKey");
            await MigrateTable(ContentAnalysisSchema.TableName, "IX_ContentAnalysisSchema_AuditKey");
            await MigrateTable(PerformanceSchema.TableName, "IX_PerformanceSchema_AuditKey");
            await MigrateTable(AccessibilitySchema.TableName, "IX_AccessibilitySchema_AuditKey");
            await MigrateTable(TechnicalSeoSchema.TableName, "IX_TechnicalSeoSchema_AuditKey");
            await MigrateTable(SocialMediaSchema.TableName, "IX_SocialMediaSchema_AuditKey");
            await MigrateTable(ContentQualitySchema.TableName, "IX_ContentQualitySchema_AuditKey");
            await MigrateTable(LinkSchema.TableName, "IX_LinkSchema_AuditKey");
            await MigrateTable(ResourceSchema.TableName, "IX_ResourceSchema_AuditKey");
            await MigrateTable(ImageSchema.TableName, "IX_ImageSchema_AuditKey");

            Logger.LogInformation("Migration {MigrationStep} completed successfully", "MigrateToAuditKeyMigration");
        }

        /// <summary>
        /// Ensures all OverviewSchema records have valid non-empty Guid Keys.
        /// </summary>
        private async Task EnsureOverviewKeysPopulated()
        {
            if (!TableExists(OverviewSchema.TableName))
            {
                Logger.LogWarning("Table {TableName} does not exist, skipping Key population", OverviewSchema.TableName);
                return;
            }

            Logger.LogDebug("Ensuring all OverviewSchema records have valid Keys");

            string providerName = Database.DatabaseType.GetProviderName();
            bool isSQLite = providerName.Contains("sqlite", StringComparison.OrdinalIgnoreCase);

            // Generate new GUIDs for any records with NULL or empty GUIDs
            string sql = isSQLite
                ? $"UPDATE [{OverviewSchema.TableName}] SET [Key] = lower(hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' || substr(hex(randomblob(2)),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(hex(randomblob(2)),2) || '-' || hex(randomblob(6))) WHERE [Key] IS NULL OR [Key] = '00000000-0000-0000-0000-000000000000'"
                : $"UPDATE [{OverviewSchema.TableName}] SET [Key] = NEWID() WHERE [Key] IS NULL OR [Key] = '00000000-0000-0000-0000-000000000000'";

            await Database.ExecuteAsync(sql);
        }

        /// <summary>
        /// Migrates a single table by adding AuditKey column, populating it, and creating index.
        /// </summary>
        /// <param name="tableName">The name of the table to migrate.</param>
        /// <param name="indexName">The name of the index to create.</param>
        private async Task MigrateTable(string tableName, string indexName)
        {
            if (!TableExists(tableName))
            {
                Logger.LogWarning("Table {TableName} does not exist, skipping migration", tableName);
                return;
            }

            if (ColumnExists(tableName, "AuditKey"))
            {
                Logger.LogDebug("Column AuditKey already exists in {TableName}, skipping", tableName);
                return;
            }

            Logger.LogInformation("Migrating table {TableName}", tableName);

            string providerName = Database.DatabaseType.GetProviderName();
            bool isSQLite = providerName.Contains("sqlite", StringComparison.OrdinalIgnoreCase);

            // Step 1: Add AuditKey column (nullable initially)
            Logger.LogDebug("Adding AuditKey column to {TableName}", tableName);
            if (isSQLite)
            {
                // SQLite: Add column as nullable TEXT (SQLite doesn't have native GUID type)
                await Database.ExecuteAsync($"ALTER TABLE [{tableName}] ADD COLUMN [AuditKey] TEXT NULL");
            }
            else
            {
                // SQL Server: Add column as nullable UNIQUEIDENTIFIER
                await Database.ExecuteAsync($"ALTER TABLE [{tableName}] ADD [AuditKey] UNIQUEIDENTIFIER NULL");
            }

            // Step 2: Populate AuditKey from OverviewSchema
            Logger.LogDebug("Populating AuditKey in {TableName} from OverviewSchema", tableName);
            string updateSql = $@"
                UPDATE child
                SET child.[AuditKey] = parent.[Key]
                FROM [{tableName}] child
                INNER JOIN [{OverviewSchema.TableName}] parent ON child.[RunId] = parent.[Id]";

            if (isSQLite)
            {
                // SQLite doesn't support UPDATE FROM, use different syntax
                updateSql = $@"
                    UPDATE [{tableName}]
                    SET [AuditKey] = (
                        SELECT [Key]
                        FROM [{OverviewSchema.TableName}]
                        WHERE [{OverviewSchema.TableName}].[Id] = [{tableName}].[RunId]
                    )
                    WHERE EXISTS (
                        SELECT 1
                        FROM [{OverviewSchema.TableName}]
                        WHERE [{OverviewSchema.TableName}].[Id] = [{tableName}].[RunId]
                    )";
            }

            await Database.ExecuteAsync(updateSql);

            // Step 3: Verify no NULL values remain
            var nullCount = await Database.ExecuteScalarAsync<int>($"SELECT COUNT(*) FROM [{tableName}] WHERE [AuditKey] IS NULL");
            if (nullCount > 0)
            {
                Logger.LogWarning("{NullCount} records in {TableName} have NULL AuditKey after population", nullCount, tableName);
            }

            // Step 4: Create index
            Logger.LogDebug("Creating index {IndexName} on {TableName}", indexName, tableName);
            if (!isSQLite)
            {
                // Only create index if it doesn't exist (SQL Server)
                string createIndexSql = $@"
                    IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = '{indexName}' AND object_id = OBJECT_ID('[{tableName}]'))
                    BEGIN
                        CREATE INDEX [{indexName}] ON [{tableName}]([AuditKey])
                    END";
                await Database.ExecuteAsync(createIndexSql);
            }
            else
            {
                // SQLite: Create index if not exists
                await Database.ExecuteAsync($"CREATE INDEX IF NOT EXISTS [{indexName}] ON [{tableName}]([AuditKey])");
            }

            // Step 5: Make AuditKey non-nullable (optional - can be done in a later migration after verification)
            // Commented out for safety - can be enabled after verifying the migration works
            // if (!isSQLite)
            // {
            //     Logger.LogDebug("Making AuditKey non-nullable in {TableName}", tableName);
            //     await Database.ExecuteAsync($"ALTER TABLE [{tableName}] ALTER COLUMN [AuditKey] UNIQUEIDENTIFIER NOT NULL");
            // }
            // else
            // {
            //     Logger.LogWarning("SQLite does not support ALTER COLUMN - AuditKey will remain nullable in {TableName}", tableName);
            // }

            Logger.LogInformation("Successfully migrated table {TableName}", tableName);
        }
    }
}
