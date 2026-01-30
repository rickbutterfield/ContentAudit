using System.Text.Json;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Infrastructure.Scoping;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Services.Persistence
{
    /// <summary>
    /// Umbraco-specific implementation of crawl result persistence
    /// </summary>
    public class UmbracoCrawlResultPersistence : ICrawlResultPersistence
    {
        private readonly IScopeProvider _scopeProvider;
        private readonly IAppPolicyCache _runtimeCache;

        public UmbracoCrawlResultPersistence(IScopeProvider scopeProvider, AppCaches appCaches)
        {
            _scopeProvider = scopeProvider;
            _runtimeCache = appCaches.RuntimeCache;
        }

        /// <inheritdoc/>
        public async Task<Guid> CreateAuditAsync(string baseUrl, CancellationToken cancellationToken = default)
        {
            using var scope = _scopeProvider.CreateScope();

            var overview = new OverviewSchema
            {
                Key = Guid.NewGuid(),
                RunDate = DateTime.Now,
                Total = 0,
                TotalInternal = 0,
                TotalExternal = 0,
                TotalAssets = 0,
                TotalBlocked = 0,
                HealthScore = 0,
                Status = (int)AuditStatus.InProgress,
                BaseUrl = baseUrl
            };

            await scope.Database.InsertAsync(overview);
            scope.Complete();

            return overview.Key;
        }

        /// <inheritdoc/>
        public async Task<Guid?> GetIncompleteAuditAsync(string baseUrl, CancellationToken cancellationToken = default)
        {
            using var scope = _scopeProvider.CreateScope();

            var result = await scope.Database.FirstOrDefaultAsync<OverviewSchema>(
                $"SELECT * FROM [{OverviewSchema.TableName}] WHERE [BaseUrl] = @0 AND [Status] = @1 ORDER BY [RunDate] DESC",
                new object[] { baseUrl, (int)AuditStatus.InProgress });

            scope.Complete();

            return result?.Key;
        }

        /// <inheritdoc/>
        public async Task UpdateAuditTotalsAsync(Guid auditKey, AuditMetadata metadata, CancellationToken cancellationToken = default)
        {
            using var scope = _scopeProvider.CreateScope();

            await scope.Database.ExecuteAsync(
                $"UPDATE [{OverviewSchema.TableName}] SET [Total] = @0, [TotalInternal] = @1, [TotalExternal] = @2, [TotalAssets] = @3, [TotalBlocked] = @4 WHERE [Key] = @5",
                new object[] { metadata.TotalUrls, metadata.TotalInternal, metadata.TotalExternal, metadata.TotalAssets, metadata.TotalBlocked, auditKey });

            scope.Complete();
        }

        /// <inheritdoc/>
        public async Task SavePagesAsync(Guid auditKey, IEnumerable<PageDto> pages, CancellationToken cancellationToken = default)
        {
            var schemas = pages.Select(page => new PageSchema(page, auditKey)).ToList();
            if (schemas.Count == 0) return;

            using var scope = _scopeProvider.CreateScope();
            await scope.Database.InsertBulkAsync(schemas);
            scope.Complete();
        }

        /// <inheritdoc/>
        public async Task SaveSeoDataAsync(Guid auditKey, IEnumerable<SeoDto> seoData, IEnumerable<LinkDto> internalLinks, CancellationToken cancellationToken = default)
        {
            var internalLinksList = internalLinks.ToList();
            var schemas = seoData.Select(data =>
            {
                data.AuditKey = auditKey;
                data.IsOrphaned = !internalLinksList.Any(x => data.Url?.Contains(x.Url!) == true);
                return new SeoSchema(data);
            }).ToList();

            if (schemas.Count == 0) return;

            using var scope = _scopeProvider.CreateScope();
            await scope.Database.InsertBulkAsync(schemas);
            scope.Complete();
        }

        /// <inheritdoc/>
        public async Task SaveContentAnalysisAsync(Guid auditKey, IEnumerable<ContentAnalysisDto> data, CancellationToken cancellationToken = default)
        {
            var schemas = data.Select(d =>
            {
                d.AuditKey = auditKey;
                return new ContentAnalysisSchema(d);
            }).ToList();

            if (schemas.Count == 0) return;

            using var scope = _scopeProvider.CreateScope();
            await scope.Database.InsertBulkAsync(schemas);
            scope.Complete();
        }

        /// <inheritdoc/>
        public async Task SavePerformanceAsync(Guid auditKey, IEnumerable<PerformanceDto> data, CancellationToken cancellationToken = default)
        {
            var schemas = data.Select(d =>
            {
                d.AuditKey = auditKey;
                return new PerformanceSchema(d);
            }).ToList();

            if (schemas.Count == 0) return;

            using var scope = _scopeProvider.CreateScope();
            await scope.Database.InsertBulkAsync(schemas);
            scope.Complete();
        }

        /// <inheritdoc/>
        public async Task SaveAccessibilityAsync(Guid auditKey, IEnumerable<AccessibilityDto> data, CancellationToken cancellationToken = default)
        {
            var schemas = data.Select(d =>
            {
                d.AuditKey = auditKey;
                return new AccessibilitySchema(d);
            }).ToList();

            if (schemas.Count == 0) return;

            using var scope = _scopeProvider.CreateScope();
            await scope.Database.InsertBulkAsync(schemas);
            scope.Complete();
        }

        /// <inheritdoc/>
        public async Task SaveTechnicalSeoAsync(Guid auditKey, IEnumerable<TechnicalSeoDto> data, CancellationToken cancellationToken = default)
        {
            var schemas = data.Select(d =>
            {
                d.AuditKey = auditKey;
                return new TechnicalSeoSchema(d);
            }).ToList();

            if (schemas.Count == 0) return;

            using var scope = _scopeProvider.CreateScope();
            await scope.Database.InsertBulkAsync(schemas);
            scope.Complete();
        }

        /// <inheritdoc/>
        public async Task SaveSocialMediaAsync(Guid auditKey, IEnumerable<SocialMediaDto> data, CancellationToken cancellationToken = default)
        {
            var schemas = data.Select(d =>
            {
                d.AuditKey = auditKey;
                return new SocialMediaSchema(d);
            }).ToList();

            if (schemas.Count == 0) return;

            using var scope = _scopeProvider.CreateScope();
            await scope.Database.InsertBulkAsync(schemas);
            scope.Complete();
        }

        /// <inheritdoc/>
        public async Task SaveContentQualityAsync(Guid auditKey, IEnumerable<ContentQualityDto> data, CancellationToken cancellationToken = default)
        {
            var schemas = data.Select(d =>
            {
                d.AuditKey = auditKey;
                return new ContentQualitySchema(d);
            }).ToList();

            if (schemas.Count == 0) return;

            using var scope = _scopeProvider.CreateScope();
            await scope.Database.InsertBulkAsync(schemas);
            scope.Complete();
        }

        /// <inheritdoc/>
        public async Task SaveImagesAsync(Guid auditKey, IEnumerable<ImageDto> images, CancellationToken cancellationToken = default)
        {
            var schemas = images.Select(d =>
            {
                d.AuditKey = auditKey;
                return new ImageSchema(d);
            }).ToList();

            if (schemas.Count == 0) return;

            using var scope = _scopeProvider.CreateScope();
            await scope.Database.InsertBulkAsync(schemas);
            scope.Complete();
        }

        /// <inheritdoc/>
        public async Task SaveResourcesAsync(Guid auditKey, IEnumerable<ResourceDto> resources, CancellationToken cancellationToken = default)
        {
            var schemas = resources.Select(d =>
            {
                d.AuditKey = auditKey;
                return new ResourceSchema(d);
            }).ToList();

            if (schemas.Count == 0) return;

            using var scope = _scopeProvider.CreateScope();
            await scope.Database.InsertBulkAsync(schemas);
            scope.Complete();
        }

        /// <inheritdoc/>
        public async Task SaveLinksAsync(Guid auditKey, IEnumerable<LinkDto> links, CancellationToken cancellationToken = default)
        {
            var schemas = links.Select(d =>
            {
                d.AuditKey = auditKey;
                return new LinkSchema(d);
            }).ToList();

            if (schemas.Count == 0) return;

            using var scope = _scopeProvider.CreateScope();
            await scope.Database.InsertBulkAsync(schemas);
            scope.Complete();
        }

        /// <inheritdoc/>
        public async Task CompleteAuditAsync(Guid auditKey, double healthScore, CancellationToken cancellationToken = default)
        {
            using var scope = _scopeProvider.CreateScope();

            await scope.Database.ExecuteAsync(
                $"UPDATE [{OverviewSchema.TableName}] SET [HealthScore] = @0, [Status] = @1 WHERE [Key] = @2",
                new object[] { healthScore, (int)AuditStatus.Completed, auditKey });

            scope.Complete();

            _runtimeCache.Clear(Constants.Cache.Key);
        }

        /// <inheritdoc/>
        public async Task FailAuditAsync(Guid auditKey, CancellationToken cancellationToken = default)
        {
            using var scope = _scopeProvider.CreateScope();

            await scope.Database.ExecuteAsync(
                $"UPDATE [{OverviewSchema.TableName}] SET [Status] = @0 WHERE [Key] = @1",
                new object[] { (int)AuditStatus.Failed, auditKey });

            scope.Complete();

            _runtimeCache.Clear(Constants.Cache.Key);
        }

        /// <inheritdoc/>
        public async Task SaveCrawlStateAsync(Guid auditKey, CrawlState state, CancellationToken cancellationToken = default)
        {
            using var scope = _scopeProvider.CreateScope();

            var existing = await scope.Database.FirstOrDefaultAsync<CrawlStateSchema>(
                $"SELECT * FROM [{CrawlStateSchema.TableName}] WHERE [AuditKey] = @0",
                new object[] { auditKey });

            var schema = new CrawlStateSchema
            {
                AuditKey = auditKey,
                VisitedUrlsJson = JsonSerializer.Serialize(state.VisitedUrls),
                PendingUrlsJson = JsonSerializer.Serialize(state.PendingUrls),
                DisallowedPathsJson = JsonSerializer.Serialize(state.DisallowedPaths),
                LastUpdated = DateTime.Now
            };

            if (existing != null)
            {
                schema.Id = existing.Id;
                await scope.Database.UpdateAsync(schema);
            }
            else
            {
                await scope.Database.InsertAsync(schema);
            }

            scope.Complete();
        }

        /// <inheritdoc/>
        public async Task<CrawlState?> LoadCrawlStateAsync(Guid auditKey, CancellationToken cancellationToken = default)
        {
            using var scope = _scopeProvider.CreateScope();

            var schema = await scope.Database.FirstOrDefaultAsync<CrawlStateSchema>(
                $"SELECT * FROM [{CrawlStateSchema.TableName}] WHERE [AuditKey] = @0",
                new object[] { auditKey });

            scope.Complete();

            if (schema == null) return null;

            var visitedUrls = string.IsNullOrEmpty(schema.VisitedUrlsJson)
                ? Enumerable.Empty<string>()
                : JsonSerializer.Deserialize<IEnumerable<string>>(schema.VisitedUrlsJson) ?? Enumerable.Empty<string>();

            var pendingUrls = string.IsNullOrEmpty(schema.PendingUrlsJson)
                ? Enumerable.Empty<UrlQueueItem>()
                : JsonSerializer.Deserialize<IEnumerable<UrlQueueItem>>(schema.PendingUrlsJson) ?? Enumerable.Empty<UrlQueueItem>();

            var disallowedPaths = string.IsNullOrEmpty(schema.DisallowedPathsJson)
                ? Enumerable.Empty<string>()
                : JsonSerializer.Deserialize<IEnumerable<string>>(schema.DisallowedPathsJson) ?? Enumerable.Empty<string>();

            return new CrawlState(visitedUrls, pendingUrls, disallowedPaths);
        }

        /// <inheritdoc/>
        public async Task DeleteCrawlStateAsync(Guid auditKey, CancellationToken cancellationToken = default)
        {
            using var scope = _scopeProvider.CreateScope();

            await scope.Database.ExecuteAsync(
                $"DELETE FROM [{CrawlStateSchema.TableName}] WHERE [AuditKey] = @0",
                new object[] { auditKey });

            scope.Complete();
        }

        /// <inheritdoc/>
        public async Task<PageFingerprintDto?> GetPageFingerprintAsync(string url, CancellationToken cancellationToken = default)
        {
            using var scope = _scopeProvider.CreateScope();

            var schema = await scope.Database.FirstOrDefaultAsync<PageFingerprintSchema>(
                $"SELECT * FROM [{PageFingerprintSchema.TableName}] WHERE [Url] = @0",
                new object[] { url });

            scope.Complete();

            if (schema == null) return null;

            return new PageFingerprintDto
            {
                Url = schema.Url,
                ContentHash = schema.ContentHash,
                ETag = schema.ETag,
                LastModified = schema.LastModified,
                UmbracoUpdateDate = schema.UmbracoUpdateDate,
                LastCrawled = schema.LastCrawled
            };
        }

        /// <inheritdoc/>
        public async Task<Dictionary<string, PageFingerprintDto>> GetPageFingerprintsAsync(string baseUrl, CancellationToken cancellationToken = default)
        {
            using var scope = _scopeProvider.CreateScope();

            var schemas = await scope.Database.FetchAsync<PageFingerprintSchema>(
                $"SELECT * FROM [{PageFingerprintSchema.TableName}] WHERE [Url] LIKE @0",
                new object[] { baseUrl + "%" });

            scope.Complete();

            return schemas.ToDictionary(
                s => s.Url,
                s => new PageFingerprintDto
                {
                    Url = s.Url,
                    ContentHash = s.ContentHash,
                    ETag = s.ETag,
                    LastModified = s.LastModified,
                    UmbracoUpdateDate = s.UmbracoUpdateDate,
                    LastCrawled = s.LastCrawled
                },
                StringComparer.OrdinalIgnoreCase);
        }

        /// <inheritdoc/>
        public async Task SavePageFingerprintAsync(Guid auditKey, PageFingerprintDto fingerprint, CancellationToken cancellationToken = default)
        {
            using var scope = _scopeProvider.CreateScope();

            var existing = await scope.Database.FirstOrDefaultAsync<PageFingerprintSchema>(
                $"SELECT * FROM [{PageFingerprintSchema.TableName}] WHERE [Url] = @0",
                new object[] { fingerprint.Url });

            var schema = new PageFingerprintSchema
            {
                Url = fingerprint.Url,
                ContentHash = fingerprint.ContentHash,
                ETag = fingerprint.ETag,
                LastModified = fingerprint.LastModified,
                UmbracoUpdateDate = fingerprint.UmbracoUpdateDate,
                LastCrawled = DateTime.Now,
                LastAuditKey = auditKey
            };

            if (existing != null)
            {
                schema.Id = existing.Id;
                await scope.Database.UpdateAsync(schema);
            }
            else
            {
                await scope.Database.InsertAsync(schema);
            }

            scope.Complete();
        }

        /// <inheritdoc/>
        public async Task SavePageFingerprintsAsync(Guid auditKey, IEnumerable<PageFingerprintDto> fingerprints, CancellationToken cancellationToken = default)
        {
            var fingerprintList = fingerprints.ToList();
            if (fingerprintList.Count == 0) return;

            using var scope = _scopeProvider.CreateScope();

            foreach (var fingerprint in fingerprintList)
            {
                var existing = await scope.Database.FirstOrDefaultAsync<PageFingerprintSchema>(
                    $"SELECT * FROM [{PageFingerprintSchema.TableName}] WHERE [Url] = @0",
                    new object[] { fingerprint.Url });

                var schema = new PageFingerprintSchema
                {
                    Url = fingerprint.Url,
                    ContentHash = fingerprint.ContentHash,
                    ETag = fingerprint.ETag,
                    LastModified = fingerprint.LastModified,
                    UmbracoUpdateDate = fingerprint.UmbracoUpdateDate,
                    LastCrawled = DateTime.Now,
                    LastAuditKey = auditKey
                };

                if (existing != null)
                {
                    schema.Id = existing.Id;
                    await scope.Database.UpdateAsync(schema);
                }
                else
                {
                    await scope.Database.InsertAsync(schema);
                }
            }

            scope.Complete();
        }
    }
}
