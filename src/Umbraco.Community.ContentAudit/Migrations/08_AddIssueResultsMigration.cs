using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    public class AddIssueResultsMigration : AsyncMigrationBase
    {
        public AddIssueResultsMigration(IMigrationContext context) : base(context)
        {
        }

        protected override async Task MigrateAsync()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "AddIssueResultsMigration");

            if (!TableExists(IssueResultSchema.TableName))
            {
                Create.Table<IssueResultSchema>().Do();
            }

            string providerName = Database.DatabaseType.GetProviderName();
            bool isSQLite = providerName.Contains("sqlite", StringComparison.OrdinalIgnoreCase);

            string indexName = "IX_IssueResults_AuditKey_IssueId";

            if (isSQLite)
            {
                await Database.ExecuteAsync(
                    $"CREATE INDEX IF NOT EXISTS [{indexName}] ON [{IssueResultSchema.TableName}]([AuditKey], [IssueId])");
            }
            else
            {
                string sql = $@"
                    IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = '{indexName}' AND object_id = OBJECT_ID('[{IssueResultSchema.TableName}]'))
                    BEGIN
                        CREATE INDEX [{indexName}] ON [{IssueResultSchema.TableName}]([AuditKey], [IssueId])
                    END";
                await Database.ExecuteAsync(sql);
            }
        }
    }
}
