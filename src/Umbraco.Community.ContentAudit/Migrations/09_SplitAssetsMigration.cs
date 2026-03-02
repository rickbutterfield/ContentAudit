using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    public class SplitAssetsMigration : AsyncMigrationBase
    {
        public SplitAssetsMigration(IMigrationContext context) : base(context)
        {
        }

        protected override async Task MigrateAsync()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "SplitAssetsMigration");

            bool isSQLite = Database.DatabaseType.GetProviderName()
                .Contains("sqlite", StringComparison.OrdinalIgnoreCase);

            if (isSQLite)
                await MigrateSqliteAsync();
            else
                await MigrateSqlServerAsync();
        }

        private async Task MigrateSqlServerAsync()
        {
            if (!ColumnExists(OverviewSchema.TableName, "TotalResources"))
            {
                Create.Column("TotalResources")
                    .OnTable(OverviewSchema.TableName)
                    .AsInt32()
                    .NotNullable()
                    .WithDefaultValue(0)
                    .Do();
            }

            if (!ColumnExists(OverviewSchema.TableName, "TotalImages"))
            {
                Create.Column("TotalImages")
                    .OnTable(OverviewSchema.TableName)
                    .AsInt32()
                    .NotNullable()
                    .WithDefaultValue(0)
                    .Do();
            }

            if (ColumnExists(OverviewSchema.TableName, "TotalAssets"))
            {
                await Database.ExecuteAsync(
                    $"UPDATE [{OverviewSchema.TableName}] SET [TotalResources] = [TotalAssets] WHERE [TotalResources] = 0 AND [TotalAssets] > 0");

                Delete.DefaultConstraint()
                    .OnTable(OverviewSchema.TableName)
                    .OnColumn("TotalAssets")
                    .Do();

                Delete.Column("TotalAssets")
                    .FromTable(OverviewSchema.TableName)
                    .Do();
            }
        }

        private async Task MigrateSqliteAsync()
        {
            if (!ColumnExists(OverviewSchema.TableName, "TotalAssets"))
            {
                if (!ColumnExists(OverviewSchema.TableName, "TotalResources"))
                {
                    Create.Column("TotalResources")
                        .OnTable(OverviewSchema.TableName)
                        .AsInt32()
                        .NotNullable()
                        .WithDefaultValue(0)
                        .Do();
                }

                if (!ColumnExists(OverviewSchema.TableName, "TotalImages"))
                {
                    Create.Column("TotalImages")
                        .OnTable(OverviewSchema.TableName)
                        .AsInt32()
                        .NotNullable()
                        .WithDefaultValue(0)
                        .Do();
                }

                return;
            }

            var rows = await Database.FetchAsync<OldOverviewDto>(
                $"SELECT * FROM [{OverviewSchema.TableName}]");

            Database.Execute("COMMIT;");
            Database.Execute("PRAGMA foreign_keys=off;");
            Database.Execute("BEGIN TRANSACTION;");

            Delete.Table(OverviewSchema.TableName).Do();
            Create.Table<OverviewSchema>().Do();

            foreach (var row in rows)
            {
                Database.Insert(OverviewSchema.TableName, "Id", false, new OverviewSchema
                {
                    Id = row.Id,
                    Key = row.Key,
                    RunDate = row.RunDate,
                    Total = row.Total,
                    TotalInternal = row.TotalInternal,
                    TotalExternal = row.TotalExternal,
                    TotalResources = row.TotalAssets,
                    TotalImages = 0,
                    TotalBlocked = row.TotalBlocked,
                    HealthScore = row.HealthScore,
                    Status = row.Status,
                    BaseUrl = row.BaseUrl,
                    IsEnriched = row.IsEnriched
                });
            }
        }

        private class OldOverviewDto
        {
            public int Id { get; set; }
            public Guid Key { get; set; }
            public DateTime RunDate { get; set; }
            public int Total { get; set; }
            public int TotalInternal { get; set; }
            public int TotalExternal { get; set; }
            public int TotalAssets { get; set; }
            public int TotalBlocked { get; set; }
            public double HealthScore { get; set; }
            public int Status { get; set; }
            public string? BaseUrl { get; set; }
            public bool IsEnriched { get; set; }
        }
    }
}
