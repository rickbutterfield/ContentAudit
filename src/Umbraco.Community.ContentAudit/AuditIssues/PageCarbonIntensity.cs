using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Services;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    public class PageCarbonIntensity : IAuditPageIssue
    {
        public Guid Id => new Guid("cf008ee2-570a-4985-b575-09a2d9fed177");

        public string Name => "Carbon Intensity";

        public string Description => "Pages that have a high carbon itensity";

        public string Category => "Content";

        public IssueType Type => IssueType.Issue;

        public IssuePriority Priority => IssuePriority.High;

        public IEnumerable<AuditIssueProperty> ExposedProperties => new List<AuditIssueProperty>()
        {
#if NET9_0
            new() { Name = "Emissions per page view", Alias = "emissionsData.emissionsPerPageView", LabelTemplate = "{=value}g" },
#else
            new() { Name = "Emissions per page view", Alias = "emissionsData.emissionsPerPageView", LabelTemplate = "{{value}}g" },
#endif
            new() { Name = "Carbon rating", Alias = "emissionsData.carbonRating", ElementName = "content-audit-carbon-intensity-label" }
        };

        public IEnumerable<PageAnalysisDto> CheckPages(IEnumerable<PageAnalysisDto> pages)
        {
            var emissionsService = new EmissionsService();

            var results = pages.Where(x => x.PageData.StatusCode == 200 && x.PerformanceData != null && x.PerformanceData?.TotalBytes > 0).ToList();
            var filteredResults = new List<PageAnalysisDto>();

            foreach (var item in results)
            {
                if (item.PerformanceData.TotalBytes.HasValue)
                {
                    item.EmissionsData = new();

                    var score = emissionsService.PerVisit(item.PerformanceData.TotalBytes.Value, false, false, true);
                    if (score.Total.HasValue)
                    {
                        item.EmissionsData.EmissionsPerPageView = Math.Round(score.Total.Value, 2);
                    }
                    item.EmissionsData.CarbonRating = score.Rating;

                    if (item.EmissionsData.EmissionsPerPageView > Constants.Emissions.SWDV4.Ratings.THIRTIETH_PERCENTILE)
                    {
                        filteredResults.Add(item);
                    }
                }
            }

            return filteredResults;
        }
    }
}
