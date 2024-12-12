using System.Linq;
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

        public async Task<List<PageDto>> GetLatestAuditData(int skip = 0, int take = 20, string filter = "", int statusCode = 0)
        {
            var result = new List<PageDto>();
            var latestRunId = await GetLatestAuditId();

            using var scope = _scopeProvider.CreateScope();

            string sqlQuery = $@"
                SELECT * 
                FROM [{PageSchema.TableName}] 
                WHERE RunId = @0
                LIMIT @2 OFFSET @1";

            var data = await scope.Database.FetchAsync<PageSchema>(sqlQuery, latestRunId, skip, take);

            if (data != null && data.Any())
            {
                result.AddRange(data.Select(x => new PageDto(x)));
            }

            if (!string.IsNullOrEmpty(filter))
            {
                result = result.Where(x => x.Url.ToLower().Contains(filter.ToLower())).ToList();
            }

            if (statusCode != 0)
            {
                result = result.Where(x => x.StatusCode == statusCode).ToList();
            }


            scope.Complete();

            return result;
        }

        public async Task<List<PageDto>> GetOrphanedPages(int skip = 0, int take = 20, string filter = "")
        {
            var results = new List<PageDto>();
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

                data = data.Skip(skip).Take(take).ToList();

                results.AddRange(data.Select(x => new PageDto(x)));
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

                data = data.Skip(skip).Take(take).ToList();

                results.AddRange(data.Select(x => new ImageDto(x)));
            }

            scope.Complete();

            return results;
        }

        public async Task<Dictionary<string, List<PageDto>>> GetDuplicateContentUrls()
        {
            var result = new Dictionary<string, List<PageDto>>();
            var latestRunId = await GetLatestAuditId();

            using var scope = _scopeProvider.CreateScope();

            // Define the SQL query to fetch only the latest Id
            string sqlQuery = $"SELECT * FROM [{PageSchema.TableName}] WHERE RunId = @0 AND CanonicalUrl IS NOT NULL";
            var data = await scope.Database.FetchAsync<PageSchema>(sqlQuery, latestRunId);

            if (data != null && data.Any())
            {
                // Group pages by CanonicalUrl
                var groupedData = data
                    .GroupBy(page => page.CanonicalUrl)
                    .Where(group => group.Count() > 1)
                    .ToDictionary(
                        group => group.Key,
                        group => group.Select(x => new PageDto(x)).ToList()
                    );

                result = groupedData;
            }

            scope.Complete();

            return result;
        }

        public async Task<List<PageDto>> GetPagesWithMissingMetadata()
        {
            var result = new List<PageDto>();
            var latestRunId = await GetLatestAuditId();

            using var scope = _scopeProvider.CreateScope();

            // Define the SQL query to fetch only the latest Id
            string sqlQuery = $@"
                SELECT * 
                FROM [{PageSchema.TableName}] 
                WHERE RunId = @0 
                  AND NodeKey IS NOT NULL
                AND NodeKey IS NOT '00000000-0000-0000-0000-000000000000'
                  AND (
                        MetaTitle IS NULL OR MetaTitle = ''
                        OR MetaDescription IS NULL OR MetaDescription = ''
                        OR MetaKeywords IS NULL OR MetaKeywords = ''
                      )";

            var data = await scope.Database.FetchAsync<PageSchema>(sqlQuery, latestRunId);

            if (data != null && data.Any())
            {
                result.AddRange(data.Select(x => new PageDto(x)));
            }

            scope.Complete();

            return result;
        }

        public async Task<List<IssueDto>> GetAllIssues()
        {
            var result = new List<IssueDto>();
            var latestRunId = await GetLatestAuditId();

            using var scope = _scopeProvider.CreateScope();
            string sqlQuery = $"SELECT * FROM [{PageSchema.TableName}] WHERE RunId = @0";
            var data = await scope.Database.FetchAsync<PageSchema>(sqlQuery, latestRunId);

            if (data != null && data.Any())
            {
                var transformedData = data.Select(x => new PageDto(x));

                foreach (var issue in _auditIssueCollection)
                {
                    var issueCheck = issue.CheckPages(transformedData);
                    double percent = ((double)issueCheck / (double)transformedData.Count()) * 100.0;

                    var auditIssue = new IssueDto(issue)
                    {
                        NumberOfUrls = issueCheck,
                        PercentOfTotal = percent
                    };

                    auditIssue.PriorityScore = CalculatePriorityScore(auditIssue);

                    result.Add(auditIssue);
                }
            }

            return result;
        }

        public async Task<HealthScoreDto> GetHealthScore()
        {
            var result = new HealthScoreDto();
            var latestRunId = await GetLatestAuditId();

            using var scope = _scopeProvider.CreateScope();
            string sqlQuery = $"SELECT * FROM [{PageSchema.TableName}] WHERE RunId = @0";
            var data = await scope.Database.FetchAsync<PageSchema>(sqlQuery, latestRunId);

            if (data != null && data.Any())
            {
                var transformedData = data.Select(x => new PageDto(x));

                foreach (var page in transformedData)
                {
                    bool pageHasError = false;
                    result.TotalPages++;

                    foreach (var issue in _auditIssueCollection)
                    {
                        var issueCheck = issue.CheckPages(new List<PageDto>() { page });
                        if (issueCheck == 1)
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
    }
}
