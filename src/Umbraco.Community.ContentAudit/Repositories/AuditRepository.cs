using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Scoping;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Schemas;
using Umbraco.Extensions;

namespace Umbraco.Community.ContentAudit.Repositories
{
    /// <inheritdoc/>
    public class AuditRepository : IAuditRepository
    {
        private readonly IScopeProvider _scopeProvider;
        private readonly ILogger<AuditRepository> _logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="AuditRepository"/> class
        /// </summary>
        /// <param name="scopeProvider">The Umbraco scope provider for database access</param>
        /// <param name="logger">The logger instance</param>
        public AuditRepository(IScopeProvider scopeProvider, ILogger<AuditRepository> logger)
        {
            _scopeProvider = scopeProvider;
            _logger = logger;
        }

        /// <inheritdoc/>
        public async Task<Guid?> GetLatestAuditKey()
        {
            using var scope = _scopeProvider.CreateScope();

            var sql = scope.SqlContext.Sql()
                .Select<OverviewSchema>(x => x.Key)
                .From<OverviewSchema>()
                .Where<OverviewSchema>(x => x.Status == (int)AuditStatus.Completed)
                .OrderByDescending<OverviewSchema>(x => x.RunDate);

            var latestKey = await scope.Database.FirstOrDefaultAsync<Guid?>(sql);

            scope.Complete();

            return latestKey;
        }

        /// <inheritdoc/>
        public async Task<Guid?> GetLatestCompletedAuditKeyExcluding(Guid excludeKey)
        {
            using var scope = _scopeProvider.CreateScope();

            var sql = scope.SqlContext.Sql()
                .Select<OverviewSchema>(x => x.Key)
                .From<OverviewSchema>()
                .Where<OverviewSchema>(x => x.Status == (int)AuditStatus.Completed && x.Key != excludeKey)
                .OrderByDescending<OverviewSchema>(x => x.RunDate);

            var latestKey = await scope.Database.FirstOrDefaultAsync<Guid?>(sql);

            scope.Complete();

            return latestKey;
        }

        /// <inheritdoc/>
        public async Task<IEnumerable<OverviewSchema>> GetAuditOverviews()
        {
            using var scope = _scopeProvider.CreateScope();

            var sql = scope.SqlContext.Sql()
                .Select("*")
                .From<OverviewSchema>()
                .Where<OverviewSchema>(x => x.Status == (int)AuditStatus.Completed);

            var auditOverviews = await scope.Database.FetchAsync<OverviewSchema>(sql);

            scope.Complete();

            return auditOverviews;
        }

        /// <inheritdoc/>
        public async Task<OverviewSchema?> GetAuditOverview(Guid auditKey)
        {
            using var scope = _scopeProvider.CreateScope();

            var sql = scope.SqlContext.Sql()
                .Select("*")
                .From<OverviewSchema>()
                .Where<OverviewSchema>(x => x.Key == auditKey);

            var latestAudit = await scope.Database.FirstOrDefaultAsync<OverviewSchema>(sql);

            scope.Complete();

            return latestAudit;
        }

        /// <inheritdoc/>
        public async Task<IEnumerable<PageSchema>> GetPagesByAuditKey(Guid auditKey)
        {
            using var scope = _scopeProvider.CreateScope();

            var sql = scope.SqlContext.Sql()
                .Select("*")
                .From<PageSchema>()
                .Where<PageSchema>(x => x.AuditKey == auditKey);

            var pageData = await scope.Database.FetchAsync<PageSchema>(sql);

            scope.Complete();

            return pageData;
        }

        /// <inheritdoc/>
        public async Task<IEnumerable<SeoSchema>> GetSeoData(Guid auditKey, string url)
        {
            using var scope = _scopeProvider.CreateScope();

            var sql = scope.SqlContext.Sql()
                .Select("*")
                .From<SeoSchema>()
                .Where<SeoSchema>(x => x.AuditKey == auditKey && x.Url == url);

            var seoData = await scope.Database.FetchAsync<SeoSchema>(sql);

            scope.Complete();

            return seoData;
        }

        /// <inheritdoc/>
        public async Task<IEnumerable<ContentAnalysisSchema>> GetContentAnalysisData(Guid auditKey, string url)
        {
            using var scope = _scopeProvider.CreateScope();

            var sql = scope.SqlContext.Sql()
                .Select("*")
                .From<ContentAnalysisSchema>()
                .Where<ContentAnalysisSchema>(x => x.AuditKey == auditKey && x.Url == url);

            var contentAnalysisData = await scope.Database.FetchAsync<ContentAnalysisSchema>(sql);

            scope.Complete();

            return contentAnalysisData;
        }

        /// <inheritdoc/>
        public async Task<IEnumerable<PerformanceSchema>> GetPerformanceData(Guid auditKey, string url)
        {
            using var scope = _scopeProvider.CreateScope();

            var sql = scope.SqlContext.Sql()
                .Select("*")
                .From<PerformanceSchema>()
                .Where<PerformanceSchema>(x => x.AuditKey == auditKey && x.Url == url);

            var performanceData = await scope.Database.FetchAsync<PerformanceSchema>(sql);

            scope.Complete();

            return performanceData;
        }

        /// <inheritdoc/>
        public async Task<IEnumerable<AccessibilitySchema>> GetAccessibilityData(Guid auditKey, string url)
        {
            using var scope = _scopeProvider.CreateScope();

            var sql = scope.SqlContext.Sql()
                .Select("*")
                .From<AccessibilitySchema>()
                .Where<AccessibilitySchema>(x => x.AuditKey == auditKey && x.Url == url);

            var accessibilityData = await scope.Database.FetchAsync<AccessibilitySchema>(sql);

            scope.Complete();

            return accessibilityData;
        }

        /// <inheritdoc/>
        public async Task<IEnumerable<TechnicalSeoSchema>> GetTechnicalSeoData(Guid auditKey, string url)
        {
            using var scope = _scopeProvider.CreateScope();

            var sql = scope.SqlContext.Sql()
                .Select("*")
                .From<TechnicalSeoSchema>()
                .Where<TechnicalSeoSchema>(x => x.AuditKey == auditKey && x.Url == url);

            var technicalSeoData = await scope.Database.FetchAsync<TechnicalSeoSchema>(sql);

            scope.Complete();

            return technicalSeoData;
        }

        /// <inheritdoc/>
        public async Task<IEnumerable<SocialMediaSchema>> GetSocialMediaData(Guid auditKey, string url)
        {
            using var scope = _scopeProvider.CreateScope();

            var sql = scope.SqlContext.Sql()
                .Select("*")
                .From<SocialMediaSchema>()
                .Where<SocialMediaSchema>(x => x.AuditKey == auditKey && x.Url == url);

            var socialMediaData = await scope.Database.FetchAsync<SocialMediaSchema>(sql);

            scope.Complete();

            return socialMediaData;
        }

        /// <inheritdoc/>
        public async Task<IEnumerable<ContentQualitySchema>> GetContentQualityData(Guid auditKey, string url)
        {
            using var scope = _scopeProvider.CreateScope();

            var sql = scope.SqlContext.Sql()
                .Select("*")
                .From<ContentQualitySchema>()
                .Where<ContentQualitySchema>(x => x.AuditKey == auditKey && x.Url == url);

            var contentQualityData = await scope.Database.FetchAsync<ContentQualitySchema>(sql);

            scope.Complete();

            return contentQualityData;
        }

        /// <inheritdoc/>
        public async Task<IEnumerable<LinkSchema>> GetLinkData(Guid auditKey, string foundPage)
        {
            using var scope = _scopeProvider.CreateScope();

            var sql = scope.SqlContext.Sql()
                .Select("*")
                .From<LinkSchema>()
                .Where<LinkSchema>(x => x.AuditKey == auditKey && x.FoundPage == foundPage);

            var linksData = await scope.Database.FetchAsync<LinkSchema>(sql);

            scope.Complete();

            return linksData;
        }

        /// <inheritdoc/>
        public async Task<IEnumerable<ResourceSchema>> GetResourceData(Guid auditKey, string foundPage)
        {
            using var scope = _scopeProvider.CreateScope();

            var sql = scope.SqlContext.Sql()
                .Select("*")
                .From<ResourceSchema>()
                .Where<ResourceSchema>(x => x.AuditKey == auditKey && x.FoundPage == foundPage);

            var resourcesData = await scope.Database.FetchAsync<ResourceSchema>(sql);

            scope.Complete();

            return resourcesData;
        }

        /// <inheritdoc/>
        public async Task<IEnumerable<ImageSchema>> GetImageData(Guid auditKey, string foundPage)
        {
            using var scope = _scopeProvider.CreateScope();

            var sql = scope.SqlContext.Sql()
                .Select("*")
                .From<ImageSchema>()
                .Where<ImageSchema>(x => x.AuditKey == auditKey && x.FoundPage == foundPage);

            var imagesData = await scope.Database.FetchAsync<ImageSchema>(sql);

            scope.Complete();

            return imagesData;
        }

        /// <inheritdoc/>
        public async Task<bool> DeleteAuditByKey(Guid auditKey)
        {
            using var scope = _scopeProvider.CreateScope();
            var db = scope.Database;

            try
            {
                await db.ExecuteAsync($"DELETE FROM [{LinkSchema.TableName}] WHERE AuditKey = @0", new object[] { auditKey });
                await db.ExecuteAsync($"DELETE FROM [{ResourceSchema.TableName}] WHERE AuditKey = @0", new object[] { auditKey });
                await db.ExecuteAsync($"DELETE FROM [{ImageSchema.TableName}] WHERE AuditKey = @0", new object[] { auditKey });
                await db.ExecuteAsync($"DELETE FROM [{ContentQualitySchema.TableName}] WHERE AuditKey = @0", new object[] { auditKey });
                await db.ExecuteAsync($"DELETE FROM [{SocialMediaSchema.TableName}] WHERE AuditKey = @0", new object[] { auditKey });
                await db.ExecuteAsync($"DELETE FROM [{TechnicalSeoSchema.TableName}] WHERE AuditKey = @0", new object[] { auditKey });
                await db.ExecuteAsync($"DELETE FROM [{AccessibilitySchema.TableName}] WHERE AuditKey = @0", new object[] { auditKey });
                await db.ExecuteAsync($"DELETE FROM [{PerformanceSchema.TableName}] WHERE AuditKey = @0", new object[] { auditKey });
                await db.ExecuteAsync($"DELETE FROM [{ContentAnalysisSchema.TableName}] WHERE AuditKey = @0", new object[] { auditKey });
                await db.ExecuteAsync($"DELETE FROM [{SeoSchema.TableName}] WHERE AuditKey = @0", new object[] { auditKey });
                await db.ExecuteAsync($"DELETE FROM [{PageSchema.TableName}] WHERE AuditKey = @0", new object[] { auditKey });
                await db.ExecuteAsync($"DELETE FROM [{OverviewSchema.TableName}] WHERE [Key] = @0", new object[] { auditKey });

                scope.Complete();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to delete audit {AuditKey}", auditKey);
                return false;
            }
        }
    }
}
