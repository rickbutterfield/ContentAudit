using Umbraco.Cms.Core.Cache;
using Umbraco.Community.ContentAudit.Composing;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;
using Umbraco.Community.ContentAudit.Schemas;
using Umbraco.Extensions;

namespace Umbraco.Community.ContentAudit.Services
{
    /// <inheritdoc/>
    public class DataService : IDataService
    {
        private readonly IAuditRepository _auditRepository;
        private readonly AuditIssueCollection _auditIssueCollection;
        private readonly IAppPolicyCache _runtimeCache;
        private readonly IEmissionsService _emissionsService;

        /// <summary>
        /// Initializes a new instance of the <see cref="DataService"/> class
        /// </summary>
        /// <param name="auditRepository">The audit repository for data access</param>
        /// <param name="auditIssueCollection">The collection of audit issues to check against</param>
        /// <param name="appCaches">The application caches for performance optimization</param>
        /// <param name="emissionsService">The emissions service for calculating carbon footprint</param>
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

        /// <inheritdoc/>
        public async Task<OverviewDto> GetAuditOverview(Guid? id = null)
        {
            if (!id.HasValue)
                id = await _auditRepository.GetLatestAuditKey();

            var overview = await _auditRepository.GetAuditOverview(id.Value);
            if (overview == null)
                return new OverviewDto();

            return new OverviewDto(overview);
        }

        /// <inheritdoc/>
        public async Task<PageAnalysisDto> GetAuditPageAnalysisByKey(Guid auditKey)
        {
            var data = await GetLatestAuditDataInternal("", 0, auditKey);
            return data.FirstOrDefault() ?? new PageAnalysisDto();
        }

        /// <inheritdoc/>
        public async Task<List<PageAnalysisDto>> GetLatestAuditData(string filter = "", int statusCode = 0)
        {
            return await GetLatestAuditDataInternal(filter, statusCode);
        }

        /// <summary>
        /// Internal method to retrieve and process latest audit data with optional filtering.
        /// </summary>
        /// <param name="filter">Optional filter string to search URLs.</param>
        /// <param name="statusCode">Optional HTTP status code filter.</param>
        /// <param name="auditKey">Optional audit key to query a specific audit run.</param>
        /// <returns>A list of <see cref="PageAnalysisDto"/> containing page analysis data.</returns>
        private async Task<List<PageAnalysisDto>> GetLatestAuditDataInternal(string filter = "", int statusCode = 0, Guid? auditKey = default)
        {
            var results = new List<PageAnalysisDto>();
            if (!auditKey.HasValue)
                auditKey = await _auditRepository.GetLatestAuditKey();

            if (!auditKey.HasValue)
                return results;

            var pageData = await _runtimeCache.GetCacheItemAsync(Constants.Cache.Key,
                async () =>
                {
                    return await _auditRepository.GetPagesByAuditKey(auditKey.Value);
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
                    var result = await PopulatePageAnalysisData(page, auditKey.Value);
                    results.Add(result);
                }
            }

            return results;
        }

        /// <summary>
        /// Populates comprehensive analysis data for a single page.
        /// </summary>
        /// <param name="page">The page schema to populate data for.</param>
        /// <param name="auditKey">The Guid key of the audit run.</param>
        /// <returns>A <see cref="PageAnalysisDto"/> containing comprehensive page analysis data.</returns>
        private async Task<PageAnalysisDto> PopulatePageAnalysisData(PageSchema page, Guid auditKey)
        {
            var result = new PageAnalysisDto();
            result.PageData = new PageDto(page);

            result.EntityType = "document";
            result.Unique = result.PageData.Unique;

            // Get SEO data
            if (!string.IsNullOrEmpty(page.Url))
            {
                var seoData = await _auditRepository.GetSeoData(auditKey, page.Url);
                var firstSeoData = seoData?.FirstOrDefault();
                if (firstSeoData != null)
                {
                    result.SeoData = new SeoDto(firstSeoData);
                }

                // Get content analysis data
                var contentAnalysisData = await _auditRepository.GetContentAnalysisData(auditKey, page.Url);
                var firstContentAnalysis = contentAnalysisData?.FirstOrDefault();
                if (firstContentAnalysis != null)
                {
                    result.ContentAnalysis = new ContentAnalysisDto(firstContentAnalysis);
                }

                // Get performance data
                var performanceData = await _auditRepository.GetPerformanceData(auditKey, page.Url);
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
                var accessibilityData = await _auditRepository.GetAccessibilityData(auditKey, page.Url);
                var firstAccessibilityData = accessibilityData?.FirstOrDefault();
                if (firstAccessibilityData != null)
                {
                    result.AccessibilityData = new AccessibilityDto(firstAccessibilityData);
                }

                // Get technical SEO data
                var technicalSeoData = await _auditRepository.GetTechnicalSeoData(auditKey, page.Url);
                var firstTechnicalSeoData = technicalSeoData?.FirstOrDefault();
                if (firstTechnicalSeoData != null)
                {
                    result.TechnicalSeoData = new TechnicalSeoDto(firstTechnicalSeoData);
                }

                // Get social media data
                var socialMediaData = await _auditRepository.GetSocialMediaData(auditKey, page.Url);
                var firstSocialMediaData = socialMediaData?.FirstOrDefault();
                if (firstSocialMediaData != null)
                {
                    result.SocialMediaData = new SocialMediaDto(firstSocialMediaData);
                }

                // Get content quality data
                var contentQualityData = await _auditRepository.GetContentQualityData(auditKey, page.Url);
                var firstContentQualityData = contentQualityData?.FirstOrDefault();
                if (firstContentQualityData != null)
                {
                    result.ContentQualityData = new ContentQualityDto(firstContentQualityData);
                }

                // Get links
                var linksData = await _auditRepository.GetLinkData(auditKey, page.Url);
                if (linksData != null)
                {
                    result.Links = linksData.Select(x => new LinkDto(x)).ToList();
                }

                // Get resources
                var resourcesData = await _auditRepository.GetResourceData(auditKey, page.Url);
                if (resourcesData != null)
                {
                    result.Resources = resourcesData.Select(x => new ResourceDto(x)).ToList();
                }

                // Get images
                var imagesData = await _auditRepository.GetImageData(auditKey, page.Url);
                if (imagesData != null)
                {
                    result.Images = imagesData.Select(x => new ImageDto(x)).ToList();
                }
            }

            return result;
        }

        /// <inheritdoc/>
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

        /// <inheritdoc/>
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

        /// <inheritdoc/>
        public async Task<List<ImageDto>> GetAllImages(string filter = "")
        {
            var latestAuditData = await GetLatestAuditData(filter);
            var images = latestAuditData.SelectMany(x => x.Images ?? Enumerable.Empty<ImageDto>())
                .Where(x => x?.IsBackground == false);

            return images.ToList();
        }

        /// <inheritdoc/>
        public async Task<List<PageDto>> GetDuplicateContentUrls(string filter = "")
        {
            throw new NotImplementedException();
        }

        /// <inheritdoc/>
        public async Task<List<PageAnalysisDto>> GetPagesWithMissingMetadata(string filter = "")
        {
            var result = new List<PageAnalysisDto>();
            var pageData = await GetLatestAuditData();
            result.AddRange(pageData);
            return result;
        }

        /// <inheritdoc/>
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

        /// <inheritdoc/>
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

        /// <inheritdoc/>
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

        /// <inheritdoc/>
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

        /// <inheritdoc/>
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

        /// <summary>
        /// Calculates a normalized priority score (0-10) for an issue based on type, priority, and prevalence.
        /// </summary>
        /// <param name="issue">The issue to calculate the priority score for.</param>
        /// <returns>A priority score between 0.0 and 10.0, where higher indicates higher priority.</returns>
        private double CalculatePriorityScore(IssueDto issue)
        {
            ArgumentNullException.ThrowIfNull(issue);

            const double PRIORITY_WEIGHT = 0.50;
            const double TYPE_WEIGHT = 0.30;
            const double PERCENTAGE_WEIGHT = 0.20;

            // Safely handle nullable percentage and clamp without relying on generic Math.Clamp overload
            double percentValue = issue.PercentOfTotal.GetValueOrDefault(0.0);
            double validPercentage = Math.Min(Math.Max(percentValue, 0.0), 100.0);

            // Safely handle nullable enums/values for Priority and Type - default to 1 if null
            int priorityValue = issue.Priority is null ? 1 : (int)issue.Priority;
            int typeValue = issue.Type is null ? 1 : (int)issue.Type;

            double normalizedPriority = (priorityValue - 1) / 2.0;
            double normalizedType = (typeValue - 1) / 2.0;
            double normalizedPercentage = validPercentage / 100.0;

            double score = (normalizedPriority * PRIORITY_WEIGHT +
                            normalizedType * TYPE_WEIGHT +
                            normalizedPercentage * PERCENTAGE_WEIGHT) * 10.0;

            return Math.Round(score, 2);
        }

        /// <inheritdoc/>
        public async Task<List<PageAnalysisDto>> GetExportData(Guid? id = default)
        {
            if (id.HasValue)
            {
                return await GetLatestAuditDataInternal("", 0, id.Value);
            }

            return await GetLatestAuditData();
        }

        /// <inheritdoc/>
        public async Task<List<OverviewDto>> GetAuditOverviews()
        {
            var results = new List<OverviewDto>();
            var audits = await _auditRepository.GetAuditOverviews();
            if (audits != null && audits.Any())
            {
                results.AddRange(audits.Select(x => new OverviewDto(x)));
            }
            return results;
        }

        /// <inheritdoc/>
        public async Task<bool> DeleteAudit(Guid auditKey)
        {
            var result = await _auditRepository.DeleteAuditByKey(auditKey);
            if (result)
            {
                _runtimeCache.Clear(Constants.Cache.Key);
            }
            return result;
        }
    }
}
