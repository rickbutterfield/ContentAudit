using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    public class AddCompositeIndexesMigration : AsyncMigrationBase
    {
        public AddCompositeIndexesMigration(IMigrationContext context) : base(context)
        {
        }

        protected override async Task MigrateAsync()
        {
            Logger.LogInformation("Running migration {MigrationStep}", "AddCompositeIndexesMigration");

            string providerName = Database.DatabaseType.GetProviderName();
            bool isSQLite = providerName.Contains("sqlite", StringComparison.OrdinalIgnoreCase);

            // Tables queried with WHERE AuditKey = @0 AND Url = @1
            await CreateCompositeIndex(PageSchema.TableName, "IX_PageSchema_AuditKey_Url", "AuditKey", "Url", isSQLite);
            await CreateCompositeIndex(SeoSchema.TableName, "IX_SeoSchema_AuditKey_Url", "AuditKey", "Url", isSQLite);
            await CreateCompositeIndex(ContentAnalysisSchema.TableName, "IX_ContentAnalysisSchema_AuditKey_Url", "AuditKey", "Url", isSQLite);
            await CreateCompositeIndex(PerformanceSchema.TableName, "IX_PerformanceSchema_AuditKey_Url", "AuditKey", "Url", isSQLite);
            await CreateCompositeIndex(AccessibilitySchema.TableName, "IX_AccessibilitySchema_AuditKey_Url", "AuditKey", "Url", isSQLite);
            await CreateCompositeIndex(TechnicalSeoSchema.TableName, "IX_TechnicalSeoSchema_AuditKey_Url", "AuditKey", "Url", isSQLite);
            await CreateCompositeIndex(SocialMediaSchema.TableName, "IX_SocialMediaSchema_AuditKey_Url", "AuditKey", "Url", isSQLite);
            await CreateCompositeIndex(ContentQualitySchema.TableName, "IX_ContentQualitySchema_AuditKey_Url", "AuditKey", "Url", isSQLite);

            // Tables queried with WHERE AuditKey = @0 AND FoundPage = @1
            await CreateCompositeIndex(LinkSchema.TableName, "IX_LinkSchema_AuditKey_FoundPage", "AuditKey", "FoundPage", isSQLite);
            await CreateCompositeIndex(ResourceSchema.TableName, "IX_ResourceSchema_AuditKey_FoundPage", "AuditKey", "FoundPage", isSQLite);
            await CreateCompositeIndex(ImageSchema.TableName, "IX_ImageSchema_AuditKey_FoundPage", "AuditKey", "FoundPage", isSQLite);

            Logger.LogInformation("Migration {MigrationStep} completed successfully", "AddCompositeIndexesMigration");
        }

        private async Task CreateCompositeIndex(string tableName, string indexName, string column1, string column2, bool isSQLite)
        {
            if (!TableExists(tableName))
            {
                Logger.LogWarning("Table {TableName} does not exist, skipping index creation", tableName);
                return;
            }

            Logger.LogDebug("Creating composite index {IndexName} on {TableName}({Column1}, {Column2})", indexName, tableName, column1, column2);

            if (isSQLite)
            {
                await Database.ExecuteAsync($"CREATE INDEX IF NOT EXISTS [{indexName}] ON [{tableName}]([{column1}], [{column2}])");
            }
            else
            {
                string sql = $@"
                    IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = '{indexName}' AND object_id = OBJECT_ID('[{tableName}]'))
                    BEGIN
                        CREATE INDEX [{indexName}] ON [{tableName}]([{column1}], [{column2}])
                    END";
                await Database.ExecuteAsync(sql);
            }
        }
    }
}
