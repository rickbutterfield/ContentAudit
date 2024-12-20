using Umbraco.Cms.Infrastructure.Scoping;
using Umbraco.Community.ContentAudit.Composing;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Services
{
    public class AuditService : IAuditService
    {
        private readonly IScopeProvider _scopeProvider;
        private readonly AuditIssueCollection _auditIssueCollection;

        public AuditService(
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

        public async Task<List<InternalPageDto>> GetLatestAuditData(int skip = 0, int take = 20, string filter = "", int statusCode = 0)
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

                data = data.Skip(skip).Take(take).ToList();

                result.AddRange(data.Select(x => new InternalPageDto(x)));
            }

            scope.Complete();

            return result;
        }

        public async Task<List<InternalPageDto>> GetOrphanedPages(int skip = 0, int take = 20, string filter = "")
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

                data = data.Skip(skip).Take(take).ToList();

                results.AddRange(data.Select(x => new InternalPageDto(x)));
            }

            scope.Complete();

            return results;
        }

        public async Task<List<ImageDto>> GetAllImages(int skip = 0, int take = 20, string filter = "")
        {
            var results = new List<ImageDto>();
            var latestRunId = await GetLatestAuditId();

            using var scope = _scopeProvider.CreateScope();

            string sqlQuery = $@"
                SELECT * 
                FROM [{ImageSchema.TableName}]
                WHERE RunId = @0";

            var data = await scope.Database.FetchAsync<ImageSchema>(sqlQuery, latestRunId);

            if (data != null && data.Any())
            {
                if (!string.IsNullOrEmpty(filter))
                {
                    data = data.Where(x => x.Url.ToLower().Contains(filter.ToLower())).ToList();
                }

                data = data.OrderByDescending(x => string.IsNullOrEmpty(x.AltText)).Skip(skip).Take(take).ToList();

                results.AddRange(data.Select(x => new ImageDto(x)));
            }

            scope.Complete();

            return results;
        }

        public async Task<Dictionary<string, List<InternalPageDto>>> GetDuplicateContentUrls()
        {
            var result = new Dictionary<string, List<InternalPageDto>>();
            var latestRunId = await GetLatestAuditId();

            using var scope = _scopeProvider.CreateScope();

            // Define the SQL query to fetch only the latest Id
            string sqlQuery = $"SELECT * FROM [{InternalPageSchema.TableName}] WHERE RunId = @0 AND CanonicalUrl IS NOT NULL";
            var data = await scope.Database.FetchAsync<InternalPageSchema>(sqlQuery, latestRunId);

            if (data != null && data.Any())
            {
                // Group pages by CanonicalUrl
                var groupedData = data
                    .GroupBy(page => page.CanonicalUrl)
                    .Where(group => group.Count() > 1)
                    .ToDictionary(
                        group => group.Key,
                        group => group.Select(x => new InternalPageDto(x)).ToList()
                    );

                result = groupedData;
            }

            scope.Complete();

            return result;
        }

        public async Task<List<InternalPageDto>> GetPagesWithMissingMetadata(int skip = 0, int take = 20, string filter = "")
        {
            var result = new List<InternalPageDto>();
            var latestRunId = await GetLatestAuditId();

            using var scope = _scopeProvider.CreateScope();

            string sqlQuery = $@"
                SELECT * 
                FROM [{InternalPageSchema.TableName}] 
                WHERE RunId = @0 
                AND NodeKey IS NOT NULL
                AND NodeKey IS NOT '00000000-0000-0000-0000-000000000000'
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

                data = data.Skip(skip).Take(take).ToList();

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
                    var pagesWithIssues = issueCheck.Count();
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

            // Define the SQL query to fetch only the latest Id
            string sql = $"SELECT [Id] FROM [{OverviewSchema.TableName}] ORDER BY [RunDate] DESC LIMIT 1";

            // Execute the scalar query to retrieve the latest Id
            int? latestId = await scope.Database.ExecuteScalarAsync<int?>(sql);

            scope.Complete();

            return latestId;
        }

        public async Task<List<ExternalPageGroupDto>> GetExternalLinks(int skip = 0, int take = 20, string filter = "")
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
                    ContentType = x.FirstOrDefault()?.ContentType,
                });

                result = finalGrouping.Skip(skip).Take(take).ToList();
            }

            scope.Complete();

            return result;
        }
    }
}
