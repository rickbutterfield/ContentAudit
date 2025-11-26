using Umbraco.Cms.Infrastructure.Scoping;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Repositories
{
    public class AuditRepository : IAuditRepository
    {
        private readonly IScopeProvider _scopeProvider;

        public AuditRepository(IScopeProvider scopeProvider)
            => _scopeProvider = scopeProvider;

        public async Task<Guid?> GetLatestAuditKey()
        {
            using var scope = _scopeProvider.CreateScope();

            string providerName = scope.Database.DatabaseType.GetProviderName();
            bool isSQLite = providerName.Contains("sqlite", StringComparison.OrdinalIgnoreCase);

            string sql = isSQLite
                ? $"SELECT [Key] FROM [{OverviewSchema.TableName}] ORDER BY [RunDate] DESC LIMIT 1"
                : $"SELECT TOP 1 [Key] FROM [{OverviewSchema.TableName}] ORDER BY [RunDate] DESC";

            string? latestKey = await scope.Database.ExecuteScalarAsync<string?>(sql);

            scope.Complete();

            if (Guid.TryParse(latestKey, out Guid key))
            {
                return key;
            }

            return Guid.Empty;
        }

        public async Task<IEnumerable<OverviewSchema>> GetAllAuditOverviews()
        {
            using var scope = _scopeProvider.CreateScope();

            var auditOverviews = await scope.Database.FetchAsync<OverviewSchema>(
                $"SELECT * FROM [{OverviewSchema.TableName}]", CancellationToken.None);

            scope.Complete();

            return auditOverviews;
        }

        public async Task<IEnumerable<OverviewSchema>> GetLatestAuditOverview(Guid auditKey)
        {
            using var scope = _scopeProvider.CreateScope();

            var latestAudit = await scope.Database.FetchAsync<OverviewSchema>(
                $"SELECT * FROM [{OverviewSchema.TableName}] WHERE [Key] = @0", new object[] { auditKey }, CancellationToken.None);

            scope.Complete();

            return latestAudit;
        }

        public async Task<IEnumerable<PageSchema>> GetPagesByAuditKey(Guid auditKey)
        {
            using var scope = _scopeProvider.CreateScope();

            string sqlQuery = $@"
                SELECT *
                FROM [{PageSchema.TableName}]
                WHERE AuditKey = @0";

            var pageData = await scope.Database.FetchAsync<PageSchema>(sqlQuery, new object[] { auditKey }, CancellationToken.None);

            scope.Complete();

            return pageData;
        }

        public async Task<IEnumerable<SeoSchema>> GetSeoData(Guid auditKey, string url)
        {
            using var scope = _scopeProvider.CreateScope();

            string seoSqlQuery = $@"SELECT * FROM [{SeoSchema.TableName}] WHERE AuditKey = @0 AND Url = @1";
            var seoData = await scope.Database.FetchAsync<SeoSchema>(seoSqlQuery, new object[] { auditKey, url }, CancellationToken.None);

            scope.Complete();

            return seoData;
        }

        public async Task<IEnumerable<ContentAnalysisSchema>> GetContentAnalysisData(Guid auditKey, string url)
        {
            using var scope = _scopeProvider.CreateScope();

            string contentAnalysisSqlQuery = $@"SELECT * FROM [{ContentAnalysisSchema.TableName}] WHERE AuditKey = @0 AND Url = @1";
            var contentAnalysisData = await scope.Database.FetchAsync<ContentAnalysisSchema>(contentAnalysisSqlQuery, new object[] { auditKey, url }, CancellationToken.None);

            scope.Complete();

            return contentAnalysisData;
        }

        public async Task<IEnumerable<PerformanceSchema>> GetPerformanceData(Guid auditKey, string url)
        {
            using var scope = _scopeProvider.CreateScope();

            string performanceSqlQuery = $@"SELECT * FROM [{PerformanceSchema.TableName}] WHERE AuditKey = @0 AND Url = @1";
            var performanceData = await scope.Database.FetchAsync<PerformanceSchema>(performanceSqlQuery, new object[] { auditKey, url }, CancellationToken.None);

            scope.Complete();

            return performanceData;
        }

        public async Task<IEnumerable<AccessibilitySchema>> GetAccessibilityData(Guid auditKey, string url)
        {
            using var scope = _scopeProvider.CreateScope();

            string accessibilitySqlQuery = $@"SELECT * FROM [{AccessibilitySchema.TableName}] WHERE AuditKey = @0 AND Url = @1";
            var accessibilityData = await scope.Database.FetchAsync<AccessibilitySchema>(accessibilitySqlQuery, new object[] { auditKey, url }, CancellationToken.None);

            scope.Complete();

            return accessibilityData;
        }

        public async Task<IEnumerable<TechnicalSeoSchema>> GetTechnicalSeoData(Guid auditKey, string url)
        {
            using var scope = _scopeProvider.CreateScope();

            string technicalSeoSqlQuery = $@"SELECT * FROM [{TechnicalSeoSchema.TableName}] WHERE AuditKey = @0 AND Url = @1";
            var technicalSeoData = await scope.Database.FetchAsync<TechnicalSeoSchema>(technicalSeoSqlQuery, new object[] { auditKey, url }, CancellationToken.None);

            scope.Complete();

            return technicalSeoData;
        }

        public async Task<IEnumerable<SocialMediaSchema>> GetSocialMediaData(Guid auditKey, string url)
        {
            using var scope = _scopeProvider.CreateScope();

            string socialMediaSqlQuery = $@"SELECT * FROM [{SocialMediaSchema.TableName}] WHERE AuditKey = @0 AND Url = @1";
            var socialMediaData = await scope.Database.FetchAsync<SocialMediaSchema>(socialMediaSqlQuery, new object[] { auditKey, url }, CancellationToken.None);

            scope.Complete();

            return socialMediaData;
        }

        public async Task<IEnumerable<ContentQualitySchema>> GetContentQualityData(Guid auditKey, string url)
        {
            using var scope = _scopeProvider.CreateScope();

            string contentQualitySqlQuery = $@"SELECT * FROM [{ContentQualitySchema.TableName}] WHERE AuditKey = @0 AND Url = @1";
            var contentQualityData = await scope.Database.FetchAsync<ContentQualitySchema>(contentQualitySqlQuery, new object[] { auditKey, url }, CancellationToken.None);

            scope.Complete();

            return contentQualityData;
        }

        public async Task<IEnumerable<LinkSchema>> GetLinkData(Guid auditKey, string foundPage)
        {
            using var scope = _scopeProvider.CreateScope();

            string linksSqlQuery = $@"SELECT * FROM [{LinkSchema.TableName}] WHERE {nameof(LinkSchema.AuditKey)} = @0 AND {nameof(LinkSchema.FoundPage)} = @1";
            var linksData = await scope.Database.FetchAsync<LinkSchema>(linksSqlQuery, new object[] { auditKey, foundPage }, CancellationToken.None);

            scope.Complete();

            return linksData;
        }

        public async Task<IEnumerable<ResourceSchema>> GetResourceData(Guid auditKey, string foundPage)
        {
            using var scope = _scopeProvider.CreateScope();

            string resourcesSqlQuery = $@"SELECT * FROM [{ResourceSchema.TableName}] WHERE {nameof(ResourceSchema.AuditKey)} = @0 AND {nameof(ResourceSchema.FoundPage)} = @1";
            var resourcesData = await scope.Database.FetchAsync<ResourceSchema>(resourcesSqlQuery, new object[] { auditKey, foundPage }, CancellationToken.None);

            scope.Complete();

            return resourcesData;
        }

        public async Task<IEnumerable<ImageSchema>> GetImageData(Guid auditKey, string foundPage)
        {
            using var scope = _scopeProvider.CreateScope();

            string imagesSqlQuery = $@"SELECT * FROM [{ImageSchema.TableName}] WHERE {nameof(ImageSchema.AuditKey)} = @0 AND {nameof(ImageSchema.FoundPage)} = @1";
            var imagesData = await scope.Database.FetchAsync<ImageSchema>(imagesSqlQuery, new object[] { auditKey, foundPage }, CancellationToken.None);

            scope.Complete();

            return imagesData;
        }
    }
}
