using Umbraco.Cms.Infrastructure.Scoping;
using Umbraco.Community.ContentAudit.Composing;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Services
{
    public class DataService : IDataService
    {
        private readonly IScopeProvider _scopeProvider;
        private readonly AuditIssueCollection _auditIssueCollection;

        public DataService(
            IScopeProvider scopeProvider,
            AuditIssueCollection auditIssueCollection)
        {
            _scopeProvider = scopeProvider;
            _auditIssueCollection = auditIssueCollection;
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
                    var result = await PopulatePageAnalysisData(page, scope);
                    results.Add(result);
                }
            }

            scope.Complete();
            return results;
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
                var result = await PopulatePageAnalysisData(page, scope);
            }

            scope.Complete();
            return null;
        }

        public async Task<List<InternalPageDto>> GetOrphanedPages(string filter = "")
        {
            var results = new List<InternalPageDto>();
            var latestRunId = await GetLatestAuditId();

            using var scope = _scopeProvider.CreateScope();

            string sqlQuery = $@"
                SELECT * 
                FROM [{PageSchema.TableName}] 
                WHERE RunId = @0
                AND IsOrphaned = 1";

            var data = await scope.Database.FetchAsync<PageSchema>(sqlQuery, latestRunId);

            if (data != null && data.Any())
            {
                if (!string.IsNullOrEmpty(filter))
                {
                    data = data.Where(x => x.Url.ToLower().Contains(filter.ToLower())).ToList();
                }

                results.AddRange(data.Select(x => new InternalPageDto(x)));
            }

            scope.Complete();

            return results;
        }

        public async Task<List<ImageDto>> GetAllImages(string filter = "")
        {
            var results = new List<ImageDto>();
            var latestRunId = await GetLatestAuditId();

            using var scope = _scopeProvider.CreateScope();

            string sqlQuery = $@"
                SELECT * 
                FROM [{ImageSchema.TableName}]
                WHERE RunId = @0
                AND IsBackground = 0";

            var data = await scope.Database.FetchAsync<ImageSchema>(sqlQuery, latestRunId);

            if (data != null && data.Any())
            {
                if (!string.IsNullOrEmpty(filter))
                {
                    data = data.Where(x => x.Url.ToLower().Contains(filter.ToLower())).ToList();
                }

                data = data.OrderByDescending(x => string.IsNullOrEmpty(x.AltText)).ToList();

                results.AddRange(data.Select(x => new ImageDto(x)));
            }

            scope.Complete();

            return results;
        }

        public async Task<List<InternalPageGroupDto>> GetDuplicateContentUrls(string filter = "")
        {
            var result = new List<InternalPageGroupDto>();
            var latestRunId = await GetLatestAuditId();

            using var scope = _scopeProvider.CreateScope();

            string sqlQuery = $"SELECT * FROM [{PageSchema.TableName}] WHERE RunId = @0 AND CanonicalUrl IS NOT NULL";
            var data = await scope.Database.FetchAsync<PageSchema>(sqlQuery, latestRunId);

            if (data != null && data.Any())
            {
                if (!string.IsNullOrEmpty(filter))
                {
                    data = data.Where(x => x.Url.ToLower().Contains(filter.ToLower())).ToList();
                }

                var convertedData = data.Select(x => new InternalPageDto(x));

                //var groupedData = convertedData.GroupBy(x => x.CanonicalUrl).Where(x => x.Count() > 1).ToList();

                //var finalGrouping = groupedData.Select(x =>
                //{
                //    return new InternalPageGroupDto()
                //    {
                //        Url = x.Key,
                //        Unique = Guid.Parse(x.FirstOrDefault()?.Unique.ToString()),
                //        InternalPages = x.ToList(),
                //        StatusCode = x.FirstOrDefault()?.StatusCode,
                //        ContentType = x.FirstOrDefault()?.ContentType,
                //    };
                //});

                //result = finalGrouping.ToList();

                result = default;
            }

            scope.Complete();

            return result;
        }

        public async Task<List<InternalPageDto>> GetPagesWithMissingMetadata(string filter = "")
        {
            var result = new List<InternalPageDto>();
            var latestRunId = await GetLatestAuditId();

            using var scope = _scopeProvider.CreateScope();

            string sqlQuery = $@"
                SELECT * 
                FROM [{PageSchema.TableName}] 
                WHERE RunId = @0 
                AND NodeKey IS NOT NULL
                AND NodeKey IS NOT '{Guid.Empty}'
                AND (
                    MetaTitle IS NULL OR MetaTitle = ''
                    OR MetaDescription IS NULL OR MetaDescription = ''
                    OR MetaKeywords IS NULL OR MetaKeywords = ''
                )";

            var data = await scope.Database.FetchAsync<PageSchema>(sqlQuery, latestRunId);

            if (data != null && data.Any())
            {
                if (!string.IsNullOrEmpty(filter))
                {
                    data = data.Where(x => x.Url.ToLower().Contains(filter.ToLower())).ToList();
                }

                result.AddRange(data.Select(x => new InternalPageDto(x)));
            }

            scope.Complete();

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

        public async Task<List<ExternalPageGroupDto>> GetExternalLinks(string filter = "")
        {
            var result = new List<ExternalPageGroupDto>();
            var latestRunId = await GetLatestAuditId();

            using var scope = _scopeProvider.CreateScope();

            string sqlQuery = $@"
                SELECT * 
                FROM [{ExternalPageSchema.TableName}] 
                WHERE RunId = @0";

            var data = await scope.Database.FetchAsync<ExternalPageSchema>(sqlQuery, latestRunId);

            if (data != null && data.Any())
            {
                if (!string.IsNullOrEmpty(filter))
                {
                    data = data.Where(x => x.Url.ToLower().Contains(filter.ToLower())).ToList();
                }

                var convertedData = data.Select(x => new ExternalPageDto(x));

                var groupedData = convertedData.GroupBy(x => x.Url);

                var finalGrouping = groupedData.Select(x => new ExternalPageGroupDto()
                {
                    Url = x.Key,
                    ExternalPages = x.ToList(),
                    StatusCode = x.FirstOrDefault()?.StatusCode,
                    ContentType = x.FirstOrDefault()?.ContentType
                });

                result = finalGrouping.OrderByDescending(x => x.ExternalPages.Count()).ToList();
            }

            scope.Complete();

            return result;
        }

        public async Task<List<InternalPageGroupDto>> GetInternalLinks(string filter = "")
        {
            var result = new List<InternalPageGroupDto>();
            var latestRunId = await GetLatestAuditId();

            using var scope = _scopeProvider.CreateScope();

            string sqlQuery = $"SELECT * FROM [{PageSchema.TableName}] WHERE RunId = @0 AND CanonicalUrl IS NOT NULL";
            var data = await scope.Database.FetchAsync<PageSchema>(sqlQuery, latestRunId);

            if (data != null && data.Any())
            {
                if (!string.IsNullOrEmpty(filter))
                {
                    data = data.Where(x => x.Url.ToLower().Contains(filter.ToLower())).ToList();
                }

                var convertedData = data.Select(x => new InternalPageDto(x));
                var groupedData = convertedData.GroupBy(x => x.Url);

                // var finalGrouping = groupedData.Select(x =>
                // {
                //     var linkedData = convertedData.Where(y => y.InboundLinks.Contains(x.Key!)).ToList();
                //     return new InternalPageGroupDto()
                //     {
                //         Url = x.Key,
                //         InternalPages = linkedData,
                //         StatusCode = x.FirstOrDefault()?.StatusCode,
                //         ContentType = x.FirstOrDefault()?.ContentType,
                //     };
                //});

                //result = finalGrouping.OrderByDescending(x => x.InternalPages.Count()).ToList();

                return null;
            }

            scope.Complete();

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


        private async Task<PageAnalysisDto> PopulatePageAnalysisData(PageSchema page, IScope scope)
        {
            var result = new PageAnalysisDto();
            result.PageData = new PageDto(page);

            result.EntityType = "document";
            result.Unique = result.PageData.NodeKey.GetValueOrDefault();

            // Get SEO data
            string seoSqlQuery = $@"SELECT * FROM [{SeoSchema.TableName}] WHERE Url = @0";
            var seoData = await scope.Database.FetchAsync<SeoSchema>(seoSqlQuery, page.Url);
            if (seoData != null && seoData.Any())
            {
                result.SeoData = new SeoDto(seoData.FirstOrDefault());
            }

            // Get content analysis data
            string contentAnalysisSqlQuery = $@"SELECT * FROM [{ContentAnalysisSchema.TableName}] WHERE Url = @0";
            var contentAnalysisData = await scope.Database.FetchAsync<ContentAnalysisSchema>(contentAnalysisSqlQuery, page.Url);
            if (contentAnalysisData != null && contentAnalysisData.Any())
            {
                result.ContentAnalysis = new ContentAnalysisDto(contentAnalysisData.FirstOrDefault());
            }

            // Get performance data
            string performanceSqlQuery = $@"SELECT * FROM [{PerformanceSchema.TableName}] WHERE Url = @0";
            var performanceData = await scope.Database.FetchAsync<PerformanceSchema>(performanceSqlQuery, page.Url);
            if (performanceData != null && performanceData.Any())
            {
                result.PerformanceData = new PerformanceDto(performanceData.FirstOrDefault());
            }

            // Get accessibility data
            string accessibilitySqlQuery = $@"SELECT * FROM [{AccessibilitySchema.TableName}] WHERE Url = @0";
            var accessibilityData = await scope.Database.FetchAsync<AccessibilitySchema>(accessibilitySqlQuery, page.Url);
            if (accessibilityData != null && accessibilityData.Any())
            {
                result.AccessibilityData = new AccessibilityDto(accessibilityData.FirstOrDefault());
            }

            // Get technical SEO data
            string technicalSeoSqlQuery = $@"SELECT * FROM [{TechnicalSeoSchema.TableName}] WHERE Url = @0";
            var technicalSeoData = await scope.Database.FetchAsync<TechnicalSeoSchema>(technicalSeoSqlQuery, page.Url);
            if (technicalSeoData != null && technicalSeoData.Any())
            {
                result.TechnicalSeoData = new TechnicalSeoDto(technicalSeoData.FirstOrDefault());
            }

            // Get social media data
            string socialMediaSqlQuery = $@"SELECT * FROM [{SocialMediaSchema.TableName}] WHERE Url = @0";
            var socialMediaData = await scope.Database.FetchAsync<SocialMediaSchema>(socialMediaSqlQuery, page.Url);
            if (socialMediaData != null && socialMediaData.Any())
            {
                result.SocialMediaData = new SocialMediaDto(socialMediaData.FirstOrDefault());
            }

            // Get content quality data
            string contentQualitySqlQuery = $@"SELECT * FROM [{ContentQualitySchema.TableName}] WHERE Url = @0";
            var contentQualityData = await scope.Database.FetchAsync<ContentQualitySchema>(contentQualitySqlQuery, page.Url);
            if (contentQualityData != null && contentQualityData.Any())
            {
                result.ContentQualityData = new ContentQualityDto(contentQualityData.FirstOrDefault());
            }

            // Get links
            string linksSqlQuery = $@"SELECT * FROM [{LinkSchema.TableName}] WHERE Url = @0";
            var linksData = await scope.Database.FetchAsync<LinkSchema>(linksSqlQuery, page.Url);
            if (linksData != null && linksData.Any())
            {
                result.Links = linksData.Select(x => new LinkDto
                {
                    Url = x.Url
                }).ToList();
            }

            // Get resources
            string resourcesSqlQuery = $@"SELECT * FROM [{ResourceSchema.TableName}] WHERE Url = @0";
            var resourcesData = await scope.Database.FetchAsync<ResourceSchema>(resourcesSqlQuery, page.Url);
            if (resourcesData != null && resourcesData.Any())
            {
                result.Resources = resourcesData.Select(x => new ResourceDto
                {
                    Url = x.Url,
                    IsExternal = x.IsExternal,
                    Size = x.Size,
                    StatusCode = x.StatusCode,
                    ContentType = x.ContentType,
                    FoundPage = x.FoundPage,
                    NodeKey = x.NodeKey
                }).ToList();
            }

            // Get images
            string imagesSqlQuery = $@"SELECT * FROM [{ImageSchema.TableName}] WHERE Url = @0";
            var imagesData = await scope.Database.FetchAsync<ImageSchema>(imagesSqlQuery, page.Url);
            if (imagesData != null && imagesData.Any())
            {
                result.Images = imagesData.Select(x => new ImageDto(x)).ToList();
            }

            return result;
        }
    }
}
