using Umbraco.Cms.Infrastructure.Scoping;
using Umbraco.Community.ContentAudit.Composing;
using Umbraco.Community.ContentAudit.Interfaces;
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
                auditOverview = new OverviewDto(latestAudit.First());

            scope.Complete();

            return auditOverview;
        }

        public async Task<List<InternalPageDto>> GetLatestAuditData(string filter = "", int statusCode = 0)
        {
            var result = new List<InternalPageDto>();
            var latestRunId = await GetLatestAuditId();

            using var scope = _scopeProvider.CreateScope();

            string sqlQuery = $@"
                SELECT * 
                FROM [{InternalPageSchema.TableName}] 
                WHERE RunId = @0";

            var data = await scope.Database.FetchAsync<InternalPageSchema>(sqlQuery, latestRunId);

            if (data != null && data.Any())
            {
                if (!string.IsNullOrEmpty(filter))
                {
                    data = data.Where(x => x.Url.ToLower().Contains(filter.ToLower())).ToList();
                }

                if (statusCode != 0)
                {
                    data = data.Where(x => x.StatusCode == statusCode).ToList();
                }

                result.AddRange(data.Select(x => new InternalPageDto(x)));
            }

            scope.Complete();

            return result;
        }

        public async Task<List<InternalPageDto>> GetOrphanedPages(string filter = "")
        {
            var results = new List<InternalPageDto>();
            var latestRunId = await GetLatestAuditId();

            using var scope = _scopeProvider.CreateScope();

            string sqlQuery = $@"
                SELECT * 
                FROM [{InternalPageSchema.TableName}] 
                WHERE RunId = @0
                AND IsOrphaned = 1";

            var data = await scope.Database.FetchAsync<InternalPageSchema>(sqlQuery, latestRunId);

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

            string sqlQuery = $"SELECT * FROM [{InternalPageSchema.TableName}] WHERE RunId = @0 AND CanonicalUrl IS NOT NULL";
            var data = await scope.Database.FetchAsync<InternalPageSchema>(sqlQuery, latestRunId);

            if (data != null && data.Any())
            {
                if (!string.IsNullOrEmpty(filter))
                {
                    data = data.Where(x => x.Url.ToLower().Contains(filter.ToLower())).ToList();
                }

                var convertedData = data.Select(x => new InternalPageDto(x));

                var groupedData = convertedData.GroupBy(x => x.CanonicalUrl).Where(x => x.Count() > 1).ToList();

                var finalGrouping = groupedData.Select(x =>
                {
                    return new InternalPageGroupDto()
                    {
                        Url = x.Key,
                        Unique = Guid.Parse(x.FirstOrDefault()?.Unique.ToString()),
                        InternalPages = x.ToList(),
                        StatusCode = x.FirstOrDefault()?.StatusCode,
                        ContentType = x.FirstOrDefault()?.ContentType,
                    };
                });

                result = finalGrouping.ToList();
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
                FROM [{InternalPageSchema.TableName}] 
                WHERE RunId = @0 
                AND NodeKey IS NOT NULL
                AND NodeKey IS NOT '{Guid.Empty}'
                AND (
                    MetaTitle IS NULL OR MetaTitle = ''
                    OR MetaDescription IS NULL OR MetaDescription = ''
                    OR MetaKeywords IS NULL OR MetaKeywords = ''
                )";

            var data = await scope.Database.FetchAsync<InternalPageSchema>(sqlQuery, latestRunId);

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
            var latestRunId = await GetLatestAuditId();

            using var scope = _scopeProvider.CreateScope();
            string pageSqlQuery = $"SELECT * FROM [{InternalPageSchema.TableName}] WHERE RunId = @0";
            var pageData = await scope.Database.FetchAsync<InternalPageSchema>(pageSqlQuery, latestRunId);

            if (pageData != null && pageData.Any())
            {
                var transformedPageData = pageData.Select(x => new InternalPageDto(x));

                foreach (IAuditPageIssue issue in _auditIssueCollection.Where(x => x is IAuditPageIssue))
                {
                    var issueCheck = issue.CheckPages(transformedPageData);
                    var pagesWithIssues = issueCheck?.Count();

                    if (pagesWithIssues != null)
                    {
                        double percent = ((double)pagesWithIssues / (double)transformedPageData.Count()) * 100.0;

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

                string imageSqlQuery = $"SELECT * FROM [{ImageSchema.TableName}] WHERE RunId = @0";
                var imageData = await scope.Database.FetchAsync<ImageSchema>(imageSqlQuery, latestRunId);

                if (imageData != null && imageData.Any())
                {
                    var transformedImageData = imageData.Select(x => new ImageDto(x));

                    foreach (IAuditImageIssue issue in _auditIssueCollection.Where(x => x is IAuditImageIssue))
                    {
                        var issueCheck = issue.CheckImages(transformedImageData, transformedPageData);
                        var imagesWithIssues = issueCheck.DistinctBy(x => x.FoundPage).Count();

                        double percent = ((double)imagesWithIssues / (double)transformedPageData.Count()) * 100.0;

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
            var latestRunId = await GetLatestAuditId();

            using var scope = _scopeProvider.CreateScope();

            string pageSqlQuery = $"SELECT * FROM [{InternalPageSchema.TableName}] WHERE RunId = @0";
            var pageData = await scope.Database.FetchAsync<InternalPageSchema>(pageSqlQuery, latestRunId);

            if (pageData != null && pageData.Any())
            {
                var transformedPageData = pageData.Select(x => new InternalPageDto(x));

                var issue = _auditIssueCollection.FirstOrDefault(x => x.Id == issueGuid);
                if (issue is IAuditPageIssue pageIssue)
                {
                    var issueCheck = pageIssue.CheckPages(transformedPageData);
                    var pagesWithIssue = issueCheck.Count();
                    double percent = ((double)pagesWithIssue / (double)transformedPageData.Count()) * 100.0;

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
                    string imageSqlQuery = $"SELECT * FROM [{ImageSchema.TableName}] WHERE RunId = @0";
                    var imageData = await scope.Database.FetchAsync<ImageSchema>(imageSqlQuery, latestRunId);

                    if (imageData != null && imageData.Any())
                    {
                        var transformedImageData = imageData.Select(x => new ImageDto(x));

                        var issueCheck = imageIssue.CheckImages(transformedImageData, transformedPageData);
                        var imagesWithIssues = issueCheck.Count();
                        double percent = ((double)imagesWithIssues / (double)transformedImageData.Count()) * 100.0;

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

            string sqlQuery = $"SELECT * FROM [{InternalPageSchema.TableName}] WHERE RunId = @0 AND CanonicalUrl IS NOT NULL";
            var data = await scope.Database.FetchAsync<InternalPageSchema>(sqlQuery, latestRunId);

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
            var latestRunId = await GetLatestAuditId();

            using var scope = _scopeProvider.CreateScope();
            string sqlQuery = $"SELECT * FROM [{InternalPageSchema.TableName}] WHERE RunId = @0";
            var data = await scope.Database.FetchAsync<InternalPageSchema>(sqlQuery, latestRunId);

            if (data != null && data.Any())
            {
                var transformedData = data.Select(x => new InternalPageDto(x));

                foreach (var page in transformedData)
                {
                    bool pageHasError = false;
                    result.TotalPages++;

                    foreach (IAuditPageIssue issue in _auditIssueCollection.Where(x => x is IAuditPageIssue))
                    {
                        var issueCheck = issue.CheckPages(new List<InternalPageDto>() { page });
                        if (issueCheck.Count() == 1)
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
    }
}
