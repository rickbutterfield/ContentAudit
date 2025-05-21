using Umbraco.Cms.Core.Cache;
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
        private readonly IAuditRepository _auditRepository;
        private readonly AuditIssueCollection _auditIssueCollection;
        private readonly IAppPolicyCache _runtimeCache;
        private readonly IEmissionsService _emissionsService;

        public DataService(
            IAuditRepository auditRepository,
            AuditIssueCollection auditIssueCollection,
            AppCaches appCaches,
            IEmissionsService emissionsService)
        {
            _auditRepository = auditRepository;
            _auditIssueCollection = auditIssueCollection;
            _runtimeCache = appCaches.RuntimeCache;
            _emissionsService = emissionsService;
        }

        public async Task<OverviewDto> GetLatestAuditOverview()
        {
            var auditOverview = new OverviewDto();
            var latestRunId = await _auditRepository.GetLatestAuditId();

            if (latestRunId.HasValue)
            {
                var latestAudit = await _auditRepository.GetLatestAuditOverview(latestRunId.Value);
                var firstAudit = latestAudit?.FirstOrDefault();
                if (firstAudit != null)
                {
                    auditOverview = new OverviewDto(firstAudit);
                }
            }

            return auditOverview;
        }

        public async Task<List<PageAnalysisDto>> GetLatestAuditData(string filter = "", int statusCode = 0)
        {
            return await GetLatestAuditDataInternal(filter, statusCode);
        }

        private async Task<List<PageAnalysisDto>> GetLatestAuditDataInternal(string filter = "", int statusCode = 0)
        {
            var results = new List<PageAnalysisDto>();
            var latestRunId = await _auditRepository.GetLatestAuditId();

            if (!latestRunId.HasValue)
                return results;

#if NET9_0
            var pageData = await _runtimeCache.GetCacheItemAsync(Constants.Cache.Key,
#else
            var pageData = await _runtimeCache.GetCacheItem(Constants.Cache.Key,
#endif
                async () =>
                {
                    return await _auditRepository.GetPagesByRunId(latestRunId.Value);
                }, TimeSpan.FromMinutes(30));

            if (pageData != null && pageData.Any())
            {
                var filteredData = pageData.AsEnumerable();

                if (!string.IsNullOrEmpty(filter))
                {
                    filteredData = filteredData.Where(x => x.Url?.ToLower().Contains(filter.ToLower()) == true);
                }

                if (statusCode != 0)
                {
                    filteredData = filteredData.Where(x => x.StatusCode == statusCode);
                }

                foreach (var page in filteredData)
                {
                    var result = await PopulatePageAnalysisData(page, latestRunId.Value);
                    results.Add(result);
                }
            }

            return results;
        }

        private async Task<PageAnalysisDto> PopulatePageAnalysisData(PageSchema page, int latestRunId)
        {
            var result = new PageAnalysisDto();
            result.PageData = new PageDto(page);

            result.EntityType = "document";
            result.Unique = result.PageData.Unique;

            // Get SEO data
            if (!string.IsNullOrEmpty(page.Url))
            {
                var seoData = await _auditRepository.GetSeoData(latestRunId, page.Url);
                var firstSeoData = seoData?.FirstOrDefault();
                if (firstSeoData != null)
                {
                    result.SeoData = new SeoDto(firstSeoData);
                }

                // Get content analysis data
                var contentAnalysisData = await _auditRepository.GetContentAnalysisData(latestRunId, page.Url);
                var firstContentAnalysis = contentAnalysisData?.FirstOrDefault();
                if (firstContentAnalysis != null)
                {
                    result.ContentAnalysis = new ContentAnalysisDto(firstContentAnalysis);
                }

                // Get performance data
                var performanceData = await _auditRepository.GetPerformanceData(latestRunId, page.Url);
                var firstPerformanceData = performanceData?.FirstOrDefault();
                if (firstPerformanceData != null)
                {
                    result.PerformanceData = new PerformanceDto(firstPerformanceData);

                    if (result.PerformanceData.TotalBytes.HasValue)
                    {
                        result.EmissionsData = new();

                        var score = _emissionsService.PerVisit(result.PerformanceData.TotalBytes.Value, false, false, true);
                        if (score.Total.HasValue)
                        {
                            result.EmissionsData.EmissionsPerPageView = Math.Round(score.Total.Value, 2);
                        }
                        result.EmissionsData.CarbonRating = score.Rating;
                    }
                }

                // Get accessibility data
                var accessibilityData = await _auditRepository.GetAccessibilityData(latestRunId, page.Url);
                var firstAccessibilityData = accessibilityData?.FirstOrDefault();
                if (firstAccessibilityData != null)
                {
                    result.AccessibilityData = new AccessibilityDto(firstAccessibilityData);
                }

                // Get technical SEO data
                var technicalSeoData = await _auditRepository.GetTechnicalSeoData(latestRunId, page.Url);
                var firstTechnicalSeoData = technicalSeoData?.FirstOrDefault();
                if (firstTechnicalSeoData != null)
                {
                    result.TechnicalSeoData = new TechnicalSeoDto(firstTechnicalSeoData);
                }

                // Get social media data
                var socialMediaData = await _auditRepository.GetSocialMediaData(latestRunId, page.Url);
                var firstSocialMediaData = socialMediaData?.FirstOrDefault();
                if (firstSocialMediaData != null)
                {
                    result.SocialMediaData = new SocialMediaDto(firstSocialMediaData);
                }

                // Get content quality data
                var contentQualityData = await _auditRepository.GetContentQualityData(latestRunId, page.Url);
                var firstContentQualityData = contentQualityData?.FirstOrDefault();
                if (firstContentQualityData != null)
                {
                    result.ContentQualityData = new ContentQualityDto(firstContentQualityData);
                }

                // Get links
                var linksData = await _auditRepository.GetLinkData(latestRunId, page.Url);
                if (linksData != null)
                {
                    result.Links = linksData.Select(x => new LinkDto(x)).ToList();
                }

                // Get resources
                var resourcesData = await _auditRepository.GetResourceData(latestRunId, page.Url);
                if (resourcesData != null)
                {
                    result.Resources = resourcesData.Select(x => new ResourceDto(x)).ToList();
                }

                // Get images
                var imagesData = await _auditRepository.GetImageData(latestRunId, page.Url);
                if (imagesData != null)
                {
                    result.Images = imagesData.Select(x => new ImageDto(x)).ToList();
                }
            }

            return result;
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
                    var pageIssues = _auditIssueCollection.Where(x => x is IAuditPageIssue);
                    int totalIssues = pageIssues.Count();

                    result = page;
                    result.Issues = new();

                    foreach (IAuditPageIssue issue in pageIssues)
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

                    result.HealthScore = new()
                    {
                        HealthScore = ((double)(totalIssues - result.Issues.Count) / totalIssues) * 100.0,
                    };
                }
            }

            return result;
        }

        public async Task<List<PageDto>> GetOrphanedPages(string filter = "")
        {
            var result = new List<PageDto>();
            var pageData = await GetLatestAuditData();

            if (pageData != null && pageData.Any())
            {
                var filtered = pageData.Where(x => x.SeoData?.IsOrphaned == true);
                result.AddRange(filtered.Select(x => x.PageData));
            }

            return result;
        }

        public async Task<List<ImageDto>> GetAllImages(string filter = "")
        {
            var latestAuditData = await GetLatestAuditData(filter);
            var images = latestAuditData.SelectMany(x => x.Images ?? Enumerable.Empty<ImageDto>())
                .Where(x => x?.IsBackground == false);

            return images.ToList();
        }

        public async Task<List<PageDto>> GetDuplicateContentUrls(string filter = "")
        {
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
            var imageData = pageData.SelectMany(x => x.Images ?? Enumerable.Empty<ImageDto>());

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
                        var imagesWithIssues = issueCheck?.DistinctBy(x => x.FoundPage).Count() ?? 0;

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
            var pageData = await GetLatestAuditData();
            var imageData = pageData.SelectMany(x => x.Images ?? Enumerable.Empty<ImageDto>());

            if (pageData != null && pageData.Any())
            {
                var pageCount = pageData.Count;
                var issue = _auditIssueCollection.FirstOrDefault(x => x.Id == issueGuid);

                if (issue is IAuditPageIssue pageIssue)
                {
                    var issueCheck = pageIssue.CheckPages(pageData);
                    var pagesWithIssue = issueCheck?.Count() ?? 0;
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
                else if (issue is IAuditImageIssue imageIssue && imageData != null && imageData.Any())
                {
                    var imageCount = imageData.Count();
                    var issueCheck = imageIssue.CheckImages(imageData, pageData);
                    var imagesWithIssues = issueCheck?.Count() ?? 0;
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

            return null;
        }

        public async Task<List<LinkGroupDto>> GetExternalLinks(string filter = "")
        {
            var results = new List<LinkGroupDto>();
            var latestAuditData = await GetLatestAuditData(filter);
            var linkData = latestAuditData.SelectMany(x => x.Links ?? Enumerable.Empty<LinkDto>())
                .Where(x => x?.IsExternal == true);

            if (linkData.Any())
            {
                var groupedData = linkData.GroupBy(x => x.Url).ToList();
                foreach (var group in groupedData.Where(g => g.Key != null))
                {
                    var linkGroup = new LinkGroupDto()
                    {
                        Url = group.Key,
                        ContentType = group.FirstOrDefault()?.ContentType,
                        StatusCode = group.FirstOrDefault()?.StatusCode,
                        Links = group.ToList()
                    };
                    results.Add(linkGroup);
                }

                results = results.OrderByDescending(x => x.Links?.Count).ToList();
            }

            return results;
        }

        public async Task<List<LinkGroupDto>> GetInternalLinks(string filter = "")
        {
            var results = new List<LinkGroupDto>();
            var latestAuditData = await GetLatestAuditData(filter);
            var linkData = latestAuditData.SelectMany(x => x.Links ?? Enumerable.Empty<LinkDto>())
                .Where(x => x?.IsExternal == false);

            if (linkData.Any())
            {
                var groupedData = linkData.GroupBy(x => x.Url).ToList();
                foreach (var group in groupedData.Where(g => g.Key != null))
                {
                    var linkGroup = new LinkGroupDto()
                    {
                        Url = group.Key,
                        ContentType = group.FirstOrDefault()?.ContentType,
                        StatusCode = group.FirstOrDefault()?.StatusCode,
                        Links = group.ToList()
                    };
                    results.Add(linkGroup);
                }

                results = results.OrderByDescending(x => x.Links?.Count).ToList();
            }

            return results;
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

        public async Task<List<PageAnalysisDto>> GetExportData()
        {
            return await GetLatestAuditData();
        }
    }
}