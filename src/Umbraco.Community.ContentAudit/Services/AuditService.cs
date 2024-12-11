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
        
        public async Task<AuditOverviewDto> GetLatestAuditOverview()
        {
            var auditOverview = new AuditOverviewDto();

            using var scope = _scopeProvider.CreateScope();

            var latestAudit = await scope.Database.FetchAsync<OverviewSchema>(
                $"SELECT * FROM [{OverviewSchema.TableName}] ORDER BY [RunDate] DESC LIMIT 1");

            if (latestAudit != null && latestAudit?.Any() == true)
                auditOverview = new AuditOverviewDto(latestAudit.First());

            scope.Complete();

            return auditOverview;
        }

        public async Task<List<PageResponseDto>> GetLatestAuditData(int skip = 0, int take = 20)
        {
            var result = new List<PageResponseDto>();
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
                result.AddRange(data.Select(x => new PageResponseDto(x)));
            }

            scope.Complete();

            return result;
        }

        public async Task<Dictionary<string, List<PageResponseDto>>> GetDuplicateContentUrls()
        {
            var result = new Dictionary<string, List<PageResponseDto>>();
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
                        group => group.Select(x => new PageResponseDto(x)).ToList()
                    );

                result = groupedData;
            }

            scope.Complete();

            return result;
        }

        public async Task<List<PageResponseDto>> GetPagesWithMissingMetadata()
        {
            var result = new List<PageResponseDto>();
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
                result.AddRange(data.Select(x => new PageResponseDto(x)));
            }

            scope.Complete();

            return result;
        }

        public async Task<List<AuditIssueDto>> GetAllIssues()
        {
            var result = new List<AuditIssueDto>();
            var latestRunId = await GetLatestAuditId();

            using var scope = _scopeProvider.CreateScope();
            string sqlQuery = $"SELECT * FROM [{PageSchema.TableName}] WHERE RunId = @0";
            var data = await scope.Database.FetchAsync<PageSchema>(sqlQuery, latestRunId);

            if (data != null && data.Any())
            {
                var transformedData = data.Select(x => new PageResponseDto(x));

                foreach (var issue in _auditIssueCollection)
                {
                    var issueCheck = issue.CheckPages(transformedData);
                    double percent = ((double)issueCheck / (double)transformedData.Count()) * 100.0;

                    var auditIssue = new AuditIssueDto(issue)
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
                var transformedData = data.Select(x => new PageResponseDto(x));

                foreach (var page in transformedData)
                {
                    bool pageHasError = false;
                    result.TotalPages++;

                    foreach (var issue in _auditIssueCollection)
                    {
                        var issueCheck = issue.CheckPages(new List<PageResponseDto>() { page });
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

        private double CalculatePriorityScore(AuditIssueDto issue)
        {
            double typeCoefficient = 10.0;
            double priorityCoefficient = 20.0;
            double percentageCoefficient = 1.0;

            double typeWeight = (int)issue.Type * typeCoefficient;
            double priorityWeight = (int)issue.Priority * priorityCoefficient;
            double percentageWeight = issue.PercentOfTotal * percentageCoefficient;

            return typeWeight + priorityWeight + percentageWeight;
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
