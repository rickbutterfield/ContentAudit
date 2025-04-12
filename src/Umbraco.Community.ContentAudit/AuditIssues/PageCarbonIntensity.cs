using Umbraco.Community.ContentAudit.Common.Enums;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;
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
            new() { Name = "Emissions per page view", Alias = "emissionsPerPageView", LabelTemplate = "{umbValue: value}g" },
            new() { Name = "Carbon rating", Alias = "carbonRating", ElementName = "content-audit-carbon-intensity-label" }
        };

        public IEnumerable<InternalPageDto> CheckPages(IEnumerable<InternalPageDto> pages)
        {
            var emissionsService = new EmissionsService();

            //var results = pages.Where(x => !x.IsAsset && x.StatusCode == 200 && x.Size > 0).ToList();
            var filteredResults = new List<InternalPageDto>();

            //foreach (var item in results)
            //{
            //    if (item.Size.HasValue)
            //    {
            //        var score = emissionsService.PerVisit(item.Size.Value, false, false, true);
            //        if (score.Total.HasValue)
            //        {
            //            item.EmissionsPerPageView = Math.Round(score.Total.Value, 2);
            //        }
            //        item.CarbonRating = score.Rating;

            //        if (item.EmissionsPerPageView > Constants.Emissions.SWDV4.Ratings.THIRTIETH_PERCENTILE)
            //        {
            //            filteredResults.Add(item);
            //        }
            //    }
            //}

            return filteredResults;
        }
    }
}
