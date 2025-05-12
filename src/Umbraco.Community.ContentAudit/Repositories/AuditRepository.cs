using Umbraco.Cms.Infrastructure.Scoping;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Repositories
{
    public class AuditRepository : IAuditRepository
    {
        private readonly IScopeProvider _scopeProvider;

        public AuditRepository(IScopeProvider scopeProvider)
        {
            _scopeProvider = scopeProvider;
        }

        public async Task<int?> GetLatestAuditId()
        {
            using var scope = _scopeProvider.CreateScope();

            string providerName = scope.Database.DatabaseType.GetProviderName();
            bool isSQLite = providerName.Contains("sqlite", StringComparison.OrdinalIgnoreCase);

            string sql = isSQLite
                ? $"SELECT [Id] FROM [{OverviewSchema.TableName}] ORDER BY [RunDate] DESC LIMIT 1"
                : $"SELECT TOP 1 [Id] FROM [{OverviewSchema.TableName}] ORDER BY [RunDate] DESC";

            int? latestId = await scope.Database.ExecuteScalarAsync<int?>(sql);

            scope.Complete();

            return latestId;
        }

        public async Task<IEnumerable<OverviewSchema>> GetLatestAuditOverview(int latestRunId)
        {
            using var scope = _scopeProvider.CreateScope();

            var latestAudit = await scope.Database.FetchAsync<OverviewSchema>(
                $"SELECT * FROM [{OverviewSchema.TableName}] WHERE Id = @0", latestRunId);

            scope.Complete();

            return latestAudit;
        }

        public async Task<IEnumerable<PageSchema>> GetPagesByRunId(int runId)
        {
            using var scope = _scopeProvider.CreateScope();

            string sqlQuery = $@"
                SELECT * 
                FROM [{PageSchema.TableName}] 
                WHERE RunId = @0";

            var pageData = await scope.Database.FetchAsync<PageSchema>(sqlQuery, runId);

            scope.Complete();

            return pageData;
        }

        public async Task<IEnumerable<SeoSchema>> GetSeoData(int runId, string url)
        {
            using var scope = _scopeProvider.CreateScope();

            string seoSqlQuery = $@"SELECT * FROM [{SeoSchema.TableName}] WHERE RunId = @0 AND Url = @1";
            var seoData = await scope.Database.FetchAsync<SeoSchema>(seoSqlQuery, runId, url);

            scope.Complete();

            return seoData;
        }

        public async Task<IEnumerable<ContentAnalysisSchema>> GetContentAnalysisData(int runId, string url)
        {
            using var scope = _scopeProvider.CreateScope();

            string contentAnalysisSqlQuery = $@"SELECT * FROM [{ContentAnalysisSchema.TableName}] WHERE RunId = @0 AND Url = @1";
            var contentAnalysisData = await scope.Database.FetchAsync<ContentAnalysisSchema>(contentAnalysisSqlQuery, runId, url);

            scope.Complete();

            return contentAnalysisData;
        }

        public async Task<IEnumerable<PerformanceSchema>> GetPerformanceData(int runId, string url)
        {
            using var scope = _scopeProvider.CreateScope();

            string performanceSqlQuery = $@"SELECT * FROM [{PerformanceSchema.TableName}] WHERE RunId = @0 AND Url = @1";
            var performanceData = await scope.Database.FetchAsync<PerformanceSchema>(performanceSqlQuery, runId, url);

            scope.Complete();

            return performanceData;
        }

        public async Task<IEnumerable<AccessibilitySchema>> GetAccessibilityData(int runId, string url)
        {
            using var scope = _scopeProvider.CreateScope();

            string accessibilitySqlQuery = $@"SELECT * FROM [{AccessibilitySchema.TableName}] WHERE RunId = @0 AND Url = @1";
            var accessibilityData = await scope.Database.FetchAsync<AccessibilitySchema>(accessibilitySqlQuery, runId, url);

            scope.Complete();

            return accessibilityData;
        }

        public async Task<IEnumerable<TechnicalSeoSchema>> GetTechnicalSeoData(int runId, string url)
        {
            using var scope = _scopeProvider.CreateScope();

            string technicalSeoSqlQuery = $@"SELECT * FROM [{TechnicalSeoSchema.TableName}] WHERE RunId = @0 AND Url = @1";
            var technicalSeoData = await scope.Database.FetchAsync<TechnicalSeoSchema>(technicalSeoSqlQuery, runId, url);

            scope.Complete();

            return technicalSeoData;
        }

        public async Task<IEnumerable<SocialMediaSchema>> GetSocialMediaData(int runId, string url)
        {
            using var scope = _scopeProvider.CreateScope();

            string socialMediaSqlQuery = $@"SELECT * FROM [{SocialMediaSchema.TableName}] WHERE RunId = @0 AND Url = @1";
            var socialMediaData = await scope.Database.FetchAsync<SocialMediaSchema>(socialMediaSqlQuery, runId, url);

            scope.Complete();

            return socialMediaData;
        }

        public async Task<IEnumerable<ContentQualitySchema>> GetContentQualityData(int runId, string url)
        {
            using var scope = _scopeProvider.CreateScope();

            string contentQualitySqlQuery = $@"SELECT * FROM [{ContentQualitySchema.TableName}] WHERE RunId = @0 AND Url = @1";
            var contentQualityData = await scope.Database.FetchAsync<ContentQualitySchema>(contentQualitySqlQuery, runId, url);

            scope.Complete();

            return contentQualityData;
        }

        public async Task<IEnumerable<LinkSchema>> GetLinkData(int runId, string foundPage)
        {
            using var scope = _scopeProvider.CreateScope();

            string linksSqlQuery = $@"SELECT * FROM [{LinkSchema.TableName}] WHERE {nameof(LinkSchema.RunId)} = @0 AND {nameof(LinkSchema.FoundPage)} = @1";
            var linksData = await scope.Database.FetchAsync<LinkSchema>(linksSqlQuery, runId, foundPage);

            scope.Complete();

            return linksData;
        }

        public async Task<IEnumerable<ResourceSchema>> GetResourceData(int runId, string foundPage)
        {
            using var scope = _scopeProvider.CreateScope();

            string resourcesSqlQuery = $@"SELECT * FROM [{ResourceSchema.TableName}] WHERE {nameof(ResourceSchema.RunId)} = @0 AND {nameof(ResourceSchema.FoundPage)} = @1";
            var resourcesData = await scope.Database.FetchAsync<ResourceSchema>(resourcesSqlQuery, runId, foundPage);

            scope.Complete();

            return resourcesData;
        }

        public async Task<IEnumerable<ImageSchema>> GetImageData(int runId, string foundPage)
        {
            using var scope = _scopeProvider.CreateScope();

            string imagesSqlQuery = $@"SELECT * FROM [{ImageSchema.TableName}] WHERE {nameof(ImageSchema.RunId)} = @0 AND {nameof(ImageSchema.FoundPage)} = @1";
            var imagesData = await scope.Database.FetchAsync<ImageSchema>(imagesSqlQuery, runId, foundPage);

            scope.Complete();

            return imagesData;
        }
    }
}
