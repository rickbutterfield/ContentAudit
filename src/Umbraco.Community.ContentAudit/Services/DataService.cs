using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Infrastructure.Scoping;
using Umbraco.Community.ContentAudit.Composing;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;
using Umbraco.Community.ContentAudit.Schemas;
using Umbraco.Extensions;

namespace Umbraco.Community.ContentAudit.Services
{
    public class DataService : IDataService
    {
        private readonly IScopeProvider _scopeProvider;
        private readonly AuditIssueCollection _auditIssueCollection;
        private readonly IAppPolicyCache _runtimeCache;

        public DataService(
            IScopeProvider scopeProvider,
            AuditIssueCollection auditIssueCollection,
            AppCaches appCaches)
        {
            _scopeProvider = scopeProvider;
            _auditIssueCollection = auditIssueCollection;
            _runtimeCache = appCaches.RuntimeCache;
        }

        public async Task<OverviewDto> GetLatestAuditOverview()
        {
            var auditOverview = new OverviewDto();
            var latestRunId = await GetLatestAuditId();

            using var scope = _scopeProvider.CreateScope();

            var latestAudit = await scope.Database.FetchAsync<OverviewSchema>(
                $"SELECT * FROM [{OverviewSchema.TableName}] WHERE Id = @0", latestRunId);

            if (latestAudit != null && latestAudit?.Any() == true)
                auditOverview = new OverviewDto(latestAudit.FirstOrDefault());

            scope.Complete();

            return auditOverview;
        }

        public async Task<List<PageAnalysisDto>> GetLatestAuditData(string filter = "", int statusCode = 0)
        {
#if NET9_0
            var data = await _runtimeCache.GetCacheItemAsync(Constants.Cache.Key,
#else
            var data = await _runtimeCache.GetCacheItem(Constants.Cache.Key,
#endif
                async () =>
                {
                    var results = await GetLatestAuditDataInternal(filter, statusCode);
                    return results;
                },
                TimeSpan.FromMinutes(30));

            return data ?? new List<PageAnalysisDto>();

        }

        private async Task<List<PageAnalysisDto>> GetLatestAuditDataInternal(string filter = "", int statusCode = 0)
        {
            var results = new List<PageAnalysisDto>();
            var latestRunId = await GetLatestAuditId();

            using var scope = _scopeProvider.CreateScope();

            string sqlQuery = $@"
                SELECT * 
                FROM [{PageSchema.TableName}] 
                WHERE RunId = @0";

            var pageData = await scope.Database.FetchAsync<PageSchema>(sqlQuery, latestRunId);

            if (pageData != null && pageData.Any())
            {
                if (!string.IsNullOrEmpty(filter))
                {
                    pageData = pageData.Where(x => x.Url.ToLower().Contains(filter.ToLower())).ToList();
                }

                if (statusCode != 0)
                {
                    pageData = pageData.Where(x => x.StatusCode == statusCode).ToList();
                }

                foreach (var page in pageData)
                {
                    var result = await PopulatePageAnalysisData(page, latestRunId, scope);
                    results.Add(result);
                }
            }

            scope.Complete();
            return results;
        }

        public async Task<PageAnalysisDto> GetLatestPageAuditData(Guid unique)
        {
            var result = new PageAnalysisDto();

            var latestData = await GetLatestAuditData();

            if (latestData != null && latestData.Any())
            {
                var page = latestData.FirstOrDefault(x => x.PageData.Unique == unique);
                if (page != null)
                {
                    result = page;
                    result.Issues = new();

                    foreach (IAuditPageIssue issue in _auditIssueCollection.Where(x => x is IAuditPageIssue))
                    {
                        var issueCheck = issue.CheckPages(new List<PageAnalysisDto>() { page });

                        if (issueCheck != null)
                        {
                            var pagesWithIssues = issueCheck?.Count();

                            if (pagesWithIssues != 0)
                            {
                                var auditIssue = new IssueDto(issue);
                                auditIssue.PriorityScore = CalculatePriorityScore(auditIssue);
                                result.Issues.Add(auditIssue);
                            }
                        }
                    }
                }
            }

            return result;
        }

        public async Task<PageAnalysisDto?> GetAuditDataByUrl(string url)
        {
            var latestRunId = await GetLatestAuditId();

            using var scope = _scopeProvider.CreateScope();

            string sqlQuery = $@"
                SELECT * 
                FROM [{PageSchema.TableName}] 
                WHERE RunId = @0
                AND Url = @1";

            var pageData = await scope.Database.FetchAsync<PageSchema>(sqlQuery, latestRunId, url);

            if (pageData != null && pageData.Any())
            {
                var page = pageData.FirstOrDefault();
                var result = await PopulatePageAnalysisData(page, latestRunId, scope);
            }

            scope.Complete();
            return null;
        }

        public async Task<List<PageDto>> GetOrphanedPages(string filter = "")
        {
            var result = new List<PageDto>();

            var pageData = await GetLatestAuditData();

            if (pageData != null && pageData.Any())
            {
                var filtered = pageData.Where(x => x.SeoData.IsOrphaned);
                result.AddRange(filtered.Select(x => x.PageData));
            }

            return result;
        }

        public async Task<List<ImageDto>> GetAllImages(string filter = "")
        {
            var latestRunId = await GetLatestAuditId();

            var latestAuditData = await GetLatestAuditData(filter);
            var images = latestAuditData.SelectMany(x => x.Images).Where(x => !x.IsBackground);

            return images.ToList();
        }

        public async Task<List<PageDto>> GetDuplicateContentUrls(string filter = "")
        {
            //var result = new List<InternalPageGroupDto>();
            //var latestRunId = await GetLatestAuditId();

            //using var scope = _scopeProvider.CreateScope();

            //string sqlQuery = $"SELECT * FROM [{PageSchema.TableName}] WHERE RunId = @0 AND CanonicalUrl IS NOT NULL";
            //var data = await scope.Database.FetchAsync<PageSchema>(sqlQuery, latestRunId);

            //if (data != null && data.Any())
            //{
            //    if (!string.IsNullOrEmpty(filter))
            //    {
            //        data = data.Where(x => x.Url.ToLower().Contains(filter.ToLower())).ToList();
            //    }

            //    var convertedData = data.Select(x => new PageDto(x));

            //    //var groupedData = convertedData.GroupBy(x => x.CanonicalUrl).Where(x => x.Count() > 1).ToList();

            //    //var finalGrouping = groupedData.Select(x =>
            //    //{
            //    //    return new InternalPageGroupDto()
            //    //    {
            //    //        Url = x.Key,
            //    //        Unique = Guid.Parse(x.FirstOrDefault()?.Unique.ToString()),
            //    //        InternalPages = x.ToList(),
            //    //        StatusCode = x.FirstOrDefault()?.StatusCode,
            //    //        ContentType = x.FirstOrDefault()?.ContentType,
            //    //    };
            //    //});

            //    //result = finalGrouping.ToList();

            //    result = default;
            //}

            //scope.Complete();

            //return result;
            throw new NotImplementedException();
        }

        public async Task<List<PageAnalysisDto>> GetPagesWithMissingMetadata(string filter = "")
        {
            var result = new List<PageAnalysisDto>();

            var pageData = await GetLatestAuditData();

            result.AddRange(pageData);

            return result;
        }

        public async Task<List<IssueDto>> GetAllIssues()
        {
            var result = new List<IssueDto>();

            var pageData = await GetLatestAuditData();
            var imageData = pageData.SelectMany(x => x.Images);

            if (pageData != null && pageData.Any())
            {
                var pageCount = pageData.Count;

                foreach (IAuditPageIssue issue in _auditIssueCollection.Where(x => x is IAuditPageIssue))
                {
                    var issueCheck = issue.CheckPages(pageData);
                    var pagesWithIssues = issueCheck?.Count();

                    if (pagesWithIssues != null)
                    {
                        double percent = ((double)pagesWithIssues / (double)pageCount) * 100.0;

                        var auditIssue = new IssueDto(issue)
                        {
                            NumberOfUrls = pagesWithIssues,
                            PercentOfTotal = percent,
                            Pages = issueCheck
                        };

                        auditIssue.PriorityScore = CalculatePriorityScore(auditIssue);

                        result.Add(auditIssue);
                    }
                }

                if (imageData != null && imageData.Any())
                {
                    var imageCount = imageData.Count();

                    foreach (IAuditImageIssue issue in _auditIssueCollection.Where(x => x is IAuditImageIssue))
                    {
                        var issueCheck = issue.CheckImages(imageData, pageData);
                        var imagesWithIssues = issueCheck.DistinctBy(x => x.FoundPage).Count();

                        double percent = ((double)imagesWithIssues / (double)imageCount) * 100.0;

                        var auditIssue = new IssueDto(issue)
                        {
                            NumberOfUrls = imagesWithIssues,
                            PercentOfTotal = percent,
                            Images = issueCheck
                        };

                        auditIssue.PriorityScore = CalculatePriorityScore(auditIssue);

                        result.Add(auditIssue);
                    }
                }
            }

            return result;
        }

        public async Task<IssueDto?> GetIssue(Guid issueGuid)
        {
            var result = new List<IssueDto>();
            var pageData = await GetLatestAuditData();
            var imageData = pageData.SelectMany(x => x.Images);

            if (pageData != null && pageData.Any())
            {
                var pageCount = pageData.Count;
                var issue = _auditIssueCollection.FirstOrDefault(x => x.Id == issueGuid);

                if (issue is IAuditPageIssue pageIssue)
                {
                    var issueCheck = pageIssue.CheckPages(pageData);
                    var pagesWithIssue = issueCheck.Count();
                    double percent = ((double)pagesWithIssue / (double)pageCount) * 100.0;

                    var auditIssue = new IssueDto(pageIssue)
                    {
                        NumberOfUrls = pagesWithIssue,
                        PercentOfTotal = percent,
                        Pages = issueCheck
                    };

                    auditIssue.PriorityScore = CalculatePriorityScore(auditIssue);

                    return auditIssue;
                }

                else if (issue is IAuditImageIssue imageIssue)
                {
                    if (imageData != null && imageData.Any())
                    {
                        var imageCount = imageData.Count();
                        var issueCheck = imageIssue.CheckImages(imageData, pageData);
                        var imagesWithIssues = issueCheck.Count();
                        double percent = ((double)imagesWithIssues / (double)imageCount) * 100.0;

                        var auditIssue = new IssueDto(issue)
                        {
                            NumberOfUrls = imagesWithIssues,
                            PercentOfTotal = percent,
                            Images = issueCheck
                        };

                        auditIssue.PriorityScore = CalculatePriorityScore(auditIssue);

                        return auditIssue;
                    }
                }
            }

            return null;
        }

        public async Task<List<LinkGroupDto>> GetExternalLinks(string filter = "")
        {
            var result = new List<LinkGroupDto>();
            var latestRunId = await GetLatestAuditId();

            var latestAuditData = await GetLatestAuditData(filter);
            var linkData = latestAuditData.SelectMany(x => x.Links).Where(x => x.IsExternal);

            if (linkData != null && linkData.Any())
            {
                var groupedData = linkData.GroupBy(x => x.Url).ToList();
                foreach (var group in groupedData)
                {
                    var linkGroup = new LinkGroupDto()
                    {
                        Url = group.Key,
                        ContentType = group.FirstOrDefault()?.ContentType,
                        StatusCode = group.FirstOrDefault()?.StatusCode,
                        Links = group.ToList()
                    };
                    result.Add(linkGroup);
                }
            }

            return result;
        }

        public async Task<List<LinkGroupDto>> GetInternalLinks(string filter = "")
        {
            var result = new List<LinkGroupDto>();
            var latestRunId = await GetLatestAuditId();

            var latestAuditData = await GetLatestAuditData(filter);
            var linkData = latestAuditData.SelectMany(x => x.Links).Where(x => !x.IsExternal);

            if (linkData != null && linkData.Any())
            {
                var groupedData = linkData.GroupBy(x => x.Url).ToList();
                foreach (var group in groupedData)
                {
                    var linkGroup = new LinkGroupDto()
                    {
                        Url = group.Key,
                        ContentType = group.FirstOrDefault()?.ContentType,
                        StatusCode = group.FirstOrDefault()?.StatusCode,
                        Links = group.ToList()
                    };
                    result.Add(linkGroup);
                }
            }

            return result;
        }

        public async Task<HealthScoreDto> GetHealthScore()
        {
            var result = new HealthScoreDto();
            var data = await GetLatestAuditData();

            if (data != null && data.Any())
            {
                foreach (var page in data)
                {
                    bool pageHasError = false;
                    result.TotalPages++;

                    foreach (IAuditPageIssue issue in _auditIssueCollection.Where(x => x is IAuditPageIssue))
                    {
                        var issueCheck = issue.CheckPages(new List<PageAnalysisDto>() { page });
                        if (issueCheck?.Count() == 1)
                        {
                            pageHasError = true;
                            break;
                        }
                    }

                    if (pageHasError)
                    {
                        result.PagesWithErrors++;
                    }
                }

                result.HealthScore = ((double)(result.TotalPages - result.PagesWithErrors) / result.TotalPages) * 100.0;
            }

            return result;
        }

        private double CalculatePriorityScore(IssueDto issue)
        {
            double typeCoefficient = 10.0;
            double priorityCoefficient = 20.0;
            double percentageCoefficient = 1.0;

            double typeWeight = (int)issue.Type * typeCoefficient;
            double priorityWeight = (int)issue.Priority * priorityCoefficient;
            double percentageWeight = issue.PercentOfTotal * percentageCoefficient;

            if (issue.PercentOfTotal != 0)
                return typeWeight + priorityWeight + percentageWeight;

            return 0;
        }

        private async Task<int?> GetLatestAuditId()
        {
            using var scope = _scopeProvider.CreateScope();

            string sql = $"SELECT [Id] FROM [{OverviewSchema.TableName}] ORDER BY [RunDate] DESC LIMIT 1";

            int? latestId = await scope.Database.ExecuteScalarAsync<int?>(sql);

            scope.Complete();

            return latestId;
        }


        private async Task<PageAnalysisDto> PopulatePageAnalysisData(PageSchema page, int? latestRunId, IScope scope)
        {
            var result = new PageAnalysisDto();
            result.PageData = new PageDto(page);

            result.EntityType = "document";
            result.Unique = result.PageData.Unique;

            // Get SEO data
            string seoSqlQuery = $@"SELECT * FROM [{SeoSchema.TableName}] WHERE RunId = @0 AND Url = @1";
            var seoData = await scope.Database.FetchAsync<SeoSchema>(seoSqlQuery, latestRunId, page.Url);
            if (seoData != null && seoData.Any())
            {
                result.SeoData = new SeoDto(seoData.FirstOrDefault());
            }

            // Get content analysis data
            string contentAnalysisSqlQuery = $@"SELECT * FROM [{ContentAnalysisSchema.TableName}] WHERE RunId = @0 AND Url = @1";
            var contentAnalysisData = await scope.Database.FetchAsync<ContentAnalysisSchema>(contentAnalysisSqlQuery, latestRunId, page.Url);
            if (contentAnalysisData != null && contentAnalysisData.Any())
            {
                result.ContentAnalysis = new ContentAnalysisDto(contentAnalysisData.FirstOrDefault());
            }

            // Get performance data
            string performanceSqlQuery = $@"SELECT * FROM [{PerformanceSchema.TableName}] WHERE RunId = @0 AND Url = @1";
            var performanceData = await scope.Database.FetchAsync<PerformanceSchema>(performanceSqlQuery, latestRunId, page.Url);
            if (performanceData != null && performanceData.Any())
            {
                result.PerformanceData = new PerformanceDto(performanceData.FirstOrDefault());
            }

            // Get accessibility data
            string accessibilitySqlQuery = $@"SELECT * FROM [{AccessibilitySchema.TableName}] WHERE RunId = @0 AND Url = @1";
            var accessibilityData = await scope.Database.FetchAsync<AccessibilitySchema>(accessibilitySqlQuery, latestRunId, page.Url);
            if (accessibilityData != null && accessibilityData.Any())
            {
                result.AccessibilityData = new AccessibilityDto(accessibilityData.FirstOrDefault());
            }

            // Get technical SEO data
            string technicalSeoSqlQuery = $@"SELECT * FROM [{TechnicalSeoSchema.TableName}] WHERE RunId = @0 AND Url = @1";
            var technicalSeoData = await scope.Database.FetchAsync<TechnicalSeoSchema>(technicalSeoSqlQuery, latestRunId, page.Url);
            if (technicalSeoData != null && technicalSeoData.Any())
            {
                result.TechnicalSeoData = new TechnicalSeoDto(technicalSeoData.FirstOrDefault());
            }

            // Get social media data
            string socialMediaSqlQuery = $@"SELECT * FROM [{SocialMediaSchema.TableName}] WHERE RunId = @0 AND Url = @1";
            var socialMediaData = await scope.Database.FetchAsync<SocialMediaSchema>(socialMediaSqlQuery, latestRunId, page.Url);
            if (socialMediaData != null && socialMediaData.Any())
            {
                result.SocialMediaData = new SocialMediaDto(socialMediaData.FirstOrDefault());
            }

            // Get content quality data
            string contentQualitySqlQuery = $@"SELECT * FROM [{ContentQualitySchema.TableName}] WHERE RunId = @0 AND Url = @1";
            var contentQualityData = await scope.Database.FetchAsync<ContentQualitySchema>(contentQualitySqlQuery, latestRunId, page.Url);
            if (contentQualityData != null && contentQualityData.Any())
            {
                result.ContentQualityData = new ContentQualityDto(contentQualityData.FirstOrDefault());
            }

            // Get links
            string linksSqlQuery = $@"SELECT * FROM [{LinkSchema.TableName}] WHERE {nameof(LinkSchema.RunId)} = @0 AND {nameof(LinkSchema.FoundPage)} = @1";
            var linksData = await scope.Database.FetchAsync<LinkSchema>(linksSqlQuery, latestRunId, page.Url);
            if (linksData != null && linksData.Any())
            {
                result.Links = linksData.Select(x => new LinkDto(x)).ToList();
            }

            // Get resources
            string resourcesSqlQuery = $@"SELECT * FROM [{ResourceSchema.TableName}] WHERE {nameof(ResourceSchema.RunId)} = @0 AND {nameof(ResourceSchema.FoundPage)} = @1";
            var resourcesData = await scope.Database.FetchAsync<ResourceSchema>(resourcesSqlQuery, latestRunId, page.Url);
            if (resourcesData != null && resourcesData.Any())
            {
                result.Resources = resourcesData.Select(x => new ResourceDto(x)).ToList();
            }

            // Get images
            string imagesSqlQuery = $@"SELECT * FROM [{ImageSchema.TableName}] WHERE {nameof(ImageSchema.RunId)} = @0 AND {nameof(ImageSchema.FoundPage)} = @1";
            var imagesData = await scope.Database.FetchAsync<ImageSchema>(imagesSqlQuery, latestRunId, page.Url);
            if (imagesData != null && imagesData.Any())
            {
                result.Images = imagesData.Select(x => new ImageDto(x)).ToList();
            }

            return result;
        }
    }
}
