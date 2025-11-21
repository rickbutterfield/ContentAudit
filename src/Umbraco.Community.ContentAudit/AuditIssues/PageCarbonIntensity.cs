using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Services;

namespace Umbraco.Community.ContentAudit.AuditIssues
{
    /// <inheritdoc />
    public class PageCarbonIntensity : IAuditPageIssue
    {
        /// <inheritdoc />
        public Guid Id => new Guid("cf008ee2-570a-4985-b575-09a2d9fed177");

        /// <inheritdoc />
        public string Name => "Carbon Intensity";

        /// <inheritdoc />
        public string Description => "Pages that have a high carbon itensity";

        /// <inheritdoc />
        public string Category => "Content";

        /// <inheritdoc />
        public IssueType Type => IssueType.Issue;

        /// <inheritdoc />
        public IssuePriority Priority => IssuePriority.High;

        /// <inheritdoc />
        public IEnumerable<AuditIssueProperty> ExposedProperties => new List<AuditIssueProperty>()
        {
            new() { Name = "Emissions per page view", Alias = "emissionsData.emissionsPerPageView", LabelTemplate = "{=value}g" },
            new() { Name = "Carbon rating", Alias = "emissionsData.carbonRating", ElementName = "content-audit-carbon-intensity-label" }
        };

        /// <inheritdoc />
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
