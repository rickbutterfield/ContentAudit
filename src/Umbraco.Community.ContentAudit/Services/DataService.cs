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
        private readonly IReadOnlyList<IAuditPageIssue> _pageIssues;
        private readonly IReadOnlyList<IAuditImageIssue> _imageIssues;

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
            _pageIssues = _auditIssueCollection.OfType<IAuditPageIssue>().ToList();
            _imageIssues = _auditIssueCollection.OfType<IAuditImageIssue>().ToList();
        }

        /// <inheritdoc/>
        public async Task<OverviewDto> GetAuditOverview(Guid? id = null)
        {
            id ??= await _auditRepository.GetLatestAuditKey();

            if (!id.HasValue)
                return new OverviewDto();

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

        /// <inheritdoc/>
        public async Task<List<PageListItemDto>> GetLatestAuditDataLightweight(string filter = "", int statusCode = 0)
        {
            var results = new List<PageListItemDto>();
            var auditKey = await _auditRepository.GetLatestAuditKey();

            if (!auditKey.HasValue)
                return results;

            var pageData = await GetCachedPages(auditKey.Value);
            if (pageData == null || !pageData.Any())
                return results;

            var filteredData = FilterPages(pageData, filter, statusCode);

            var technicalSeoData = await _auditRepository.GetAllTechnicalSeoDataByAuditKey(auditKey.Value);
            var technicalSeoLookup = technicalSeoData
                .GroupBy(x => x.Url ?? "")
                .ToDictionary(g => g.Key, g => g.First(), StringComparer.OrdinalIgnoreCase);

            foreach (var page in filteredData)
            {
                var item = new PageListItemDto
                {
                    PageData = new PageDto(page),
                    EntityType = "document",
                    Unique = page.Unique
                };

                if (!string.IsNullOrEmpty(page.Url) && technicalSeoLookup.TryGetValue(page.Url, out var techSeo))
                {
                    item.ContentType = techSeo.ContentType;
                }

                results.Add(item);
            }

            return results;
        }

        private async Task<List<PageAnalysisDto>> GetLatestAuditDataInternal(string filter = "", int statusCode = 0, Guid? auditKey = default)
        {
            if (!auditKey.HasValue)
                auditKey = await _auditRepository.GetLatestAuditKey();

            if (!auditKey.HasValue)
                return [];

            var pageData = await GetCachedPages(auditKey.Value);
            if (pageData == null || !pageData.Any())
                return [];

            var filteredData = FilterPages(pageData, filter, statusCode).ToList();
            return await PopulateAllPagesAnalysisData(filteredData, auditKey.Value);
        }

        private async Task<IEnumerable<PageSchema>?> GetCachedPages(Guid auditKey)
        {
            return await _runtimeCache.GetCacheItemAsync(Constants.Cache.Key,
                async () => await _auditRepository.GetPagesByAuditKey(auditKey),
                TimeSpan.FromMinutes(30));
        }

        private static IEnumerable<PageSchema> FilterPages(IEnumerable<PageSchema> pages, string filter, int statusCode)
        {
            var filtered = pages.AsEnumerable();

            if (!string.IsNullOrEmpty(filter))
            {
                filtered = filtered.Where(x => x.Url?.Contains(filter, StringComparison.OrdinalIgnoreCase) == true);
            }

            if (statusCode != 0)
            {
                filtered = filtered.Where(x => x.StatusCode == statusCode);
            }

            return filtered;
        }

        private async Task<List<PageAnalysisDto>> PopulateAllPagesAnalysisData(List<PageSchema> pages, Guid auditKey)
        {
            var seoData = await _auditRepository.GetAllSeoDataByAuditKey(auditKey);
            var contentAnalysisData = await _auditRepository.GetAllContentAnalysisDataByAuditKey(auditKey);
            var performanceData = await _auditRepository.GetAllPerformanceDataByAuditKey(auditKey);
            var accessibilityData = await _auditRepository.GetAllAccessibilityDataByAuditKey(auditKey);
            var technicalSeoData = await _auditRepository.GetAllTechnicalSeoDataByAuditKey(auditKey);
            var socialMediaData = await _auditRepository.GetAllSocialMediaDataByAuditKey(auditKey);
            var contentQualityData = await _auditRepository.GetAllContentQualityDataByAuditKey(auditKey);
            var linksData = await _auditRepository.GetAllLinkDataByAuditKey(auditKey);
            var resourcesData = await _auditRepository.GetAllResourceDataByAuditKey(auditKey);
            var imagesData = await _auditRepository.GetAllImageDataByAuditKey(auditKey);

            var seoLookup = seoData.GroupBy(x => x.Url ?? "").ToDictionary(g => g.Key, g => g.First(), StringComparer.OrdinalIgnoreCase);
            var contentAnalysisLookup = contentAnalysisData.GroupBy(x => x.Url ?? "").ToDictionary(g => g.Key, g => g.First(), StringComparer.OrdinalIgnoreCase);
            var performanceLookup = performanceData.GroupBy(x => x.Url ?? "").ToDictionary(g => g.Key, g => g.First(), StringComparer.OrdinalIgnoreCase);
            var accessibilityLookup = accessibilityData.GroupBy(x => x.Url ?? "").ToDictionary(g => g.Key, g => g.First(), StringComparer.OrdinalIgnoreCase);
            var technicalSeoLookup = technicalSeoData.GroupBy(x => x.Url ?? "").ToDictionary(g => g.Key, g => g.First(), StringComparer.OrdinalIgnoreCase);
            var socialMediaLookup = socialMediaData.GroupBy(x => x.Url ?? "").ToDictionary(g => g.Key, g => g.First(), StringComparer.OrdinalIgnoreCase);
            var contentQualityLookup = contentQualityData.GroupBy(x => x.Url ?? "").ToDictionary(g => g.Key, g => g.First(), StringComparer.OrdinalIgnoreCase);
            var linksLookup = linksData.GroupBy(x => x.FoundPage ?? "").ToDictionary(g => g.Key, g => g.ToList(), StringComparer.OrdinalIgnoreCase);
            var resourcesLookup = resourcesData.GroupBy(x => x.FoundPage ?? "").ToDictionary(g => g.Key, g => g.ToList(), StringComparer.OrdinalIgnoreCase);
            var imagesLookup = imagesData.GroupBy(x => x.FoundPage ?? "").ToDictionary(g => g.Key, g => g.ToList(), StringComparer.OrdinalIgnoreCase);

            var results = new List<PageAnalysisDto>(pages.Count);

            foreach (var page in pages)
            {
                var result = new PageAnalysisDto
                {
                    PageData = new PageDto(page),
                    EntityType = "document"
                };
                result.Unique = result.PageData.Unique;

                var url = page.Url ?? "";

                if (!string.IsNullOrEmpty(url))
                {
                    if (seoLookup.TryGetValue(url, out var seo))
                        result.SeoData = new SeoDto(seo);

                    if (contentAnalysisLookup.TryGetValue(url, out var ca))
                        result.ContentAnalysis = new ContentAnalysisDto(ca);

                    if (performanceLookup.TryGetValue(url, out var perf))
                    {
                        result.PerformanceData = new PerformanceDto(perf);

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

                    if (accessibilityLookup.TryGetValue(url, out var acc))
                        result.AccessibilityData = new AccessibilityDto(acc);

                    if (technicalSeoLookup.TryGetValue(url, out var techSeo))
                        result.TechnicalSeoData = new TechnicalSeoDto(techSeo);

                    if (socialMediaLookup.TryGetValue(url, out var sm))
                        result.SocialMediaData = new SocialMediaDto(sm);

                    if (contentQualityLookup.TryGetValue(url, out var cq))
                        result.ContentQualityData = new ContentQualityDto(cq);

                    if (linksLookup.TryGetValue(url, out var links))
                        result.Links = links.Select(x => new LinkDto(x)).ToList();

                    if (resourcesLookup.TryGetValue(url, out var resources))
                        result.Resources = resources.Select(x => new ResourceDto(x)).ToList();

                    if (imagesLookup.TryGetValue(url, out var images))
                        result.Images = images.Select(x => new ImageDto(x)).ToList();
                }

                results.Add(result);
            }

            return results;
        }

        /// <inheritdoc/>
        public async Task<PageAnalysisDto> GetLatestPageAuditData(Guid unique)
        {
            var context = await ResolvePageContext(unique);
            if (context == null)
                return new PageAnalysisDto();

            var (auditKey, url, pageSchema) = context.Value;
            var result = await PopulateSinglePageDetailData(auditKey, url, pageSchema);

            int totalIssues = _pageIssues.Count;
            result.Issues = new();

            var singleAnalysisList = new List<PageAnalysisDto>(1) { result };
            foreach (var issue in _pageIssues)
            {
                var issueCheck = issue.CheckPages(singleAnalysisList);

                if (issueCheck != null && issueCheck.Any())
                {
                    var auditIssue = new IssueDto(issue);
                    auditIssue.PriorityScore = CalculatePriorityScore(auditIssue);
                    result.Issues.Add(auditIssue);
                }
            }

            result.HealthScore = new()
            {
                HealthScore = ((double)(totalIssues - result.Issues.Count) / totalIssues) * 100.0,
            };

            return result;
        }

        /// <inheritdoc/>
        public async Task<List<LinkDto>> GetPageLinks(Guid unique)
        {
            var context = await ResolvePageContext(unique);
            if (context == null)
                return [];

            var (auditKey, url, _) = context.Value;
            var linkData = await _auditRepository.GetLinkData(auditKey, url);
            return linkData.Select(x => new LinkDto(x)).ToList();
        }

        /// <inheritdoc/>
        public async Task<List<ImageDto>> GetPageImages(Guid unique)
        {
            var context = await ResolvePageContext(unique);
            if (context == null)
                return [];

            var (auditKey, url, _) = context.Value;
            var imageData = await _auditRepository.GetImageData(auditKey, url);
            return imageData.Select(x => new ImageDto(x)).ToList();
        }

        /// <inheritdoc/>
        public async Task<List<ResourceDto>> GetPageResources(Guid unique)
        {
            var context = await ResolvePageContext(unique);
            if (context == null)
                return [];

            var (auditKey, url, _) = context.Value;
            var resourceData = await _auditRepository.GetResourceData(auditKey, url);
            return resourceData.Select(x => new ResourceDto(x)).ToList();
        }

        /// <inheritdoc/>
        public async Task<List<IssueDto>> GetPageIssues(Guid unique)
        {
            var context = await ResolvePageContext(unique);
            if (context == null)
                return [];

            var (auditKey, url, pageSchema) = context.Value;
            var page = await PopulateSinglePageDetailData(auditKey, url, pageSchema);

            var results = new List<IssueDto>();
            var singleAnalysisList = new List<PageAnalysisDto>(1) { page };
            foreach (var issue in _pageIssues)
            {
                var issueCheck = issue.CheckPages(singleAnalysisList);

                if (issueCheck != null && issueCheck.Any())
                {
                    var auditIssue = new IssueDto(issue);
                    auditIssue.PriorityScore = CalculatePriorityScore(auditIssue);
                    results.Add(auditIssue);
                }
            }

            return results;
        }

        /// <inheritdoc/>
        public async Task<List<PageDto>> GetOrphanedPages(string filter = "")
        {
            var auditKey = await _auditRepository.GetLatestAuditKey();
            if (!auditKey.HasValue)
                return [];

            var pageData = await GetCachedPages(auditKey.Value);
            if (pageData == null || !pageData.Any())
                return [];

            var seoData = await _auditRepository.GetAllSeoDataByAuditKey(auditKey.Value);
            var orphanedUrls = seoData.Where(x => x.IsOrphaned).Select(x => x.Url).ToHashSet(StringComparer.OrdinalIgnoreCase);

            return pageData
                .Where(x => !string.IsNullOrEmpty(x.Url) && orphanedUrls.Contains(x.Url))
                .Select(x => new PageDto(x))
                .ToList();
        }

        /// <inheritdoc/>
        public async Task<List<ImageDto>> GetAllImages(string filter = "")
        {
            var auditKey = await _auditRepository.GetLatestAuditKey();
            if (!auditKey.HasValue)
                return [];

            var imageData = await _auditRepository.GetAllImageDataByAuditKey(auditKey.Value);
            return imageData
                .Where(x => !x.IsBackground)
                .Select(x => new ImageDto(x))
                .ToList();
        }

        /// <inheritdoc/>
        public async Task<List<PageDto>> GetDuplicateContentUrls(string filter = "")
        {
            throw new NotImplementedException();
        }

        /// <inheritdoc/>
        public async Task<List<MetadataListItemDto>> GetMetadataListItems(string filter = "")
        {
            var auditKey = await _auditRepository.GetLatestAuditKey();
            if (!auditKey.HasValue)
                return [];

            var pageData = await GetCachedPages(auditKey.Value);
            if (pageData == null || !pageData.Any())
                return [];

            var filteredData = FilterPages(pageData, filter, 0);

            var seoData = await _auditRepository.GetAllSeoDataByAuditKey(auditKey.Value);
            var seoLookup = seoData
                .GroupBy(x => x.Url ?? "")
                .ToDictionary(g => g.Key, g => g.First(), StringComparer.OrdinalIgnoreCase);

            var results = new List<MetadataListItemDto>();
            foreach (var page in filteredData)
            {
                var item = new MetadataListItemDto
                {
                    PageData = new PageDto(page),
                    EntityType = "document",
                    Unique = page.Unique
                };

                if (!string.IsNullOrEmpty(page.Url) && seoLookup.TryGetValue(page.Url, out var seo))
                    item.SeoData = new SeoDto(seo);

                results.Add(item);
            }

            return results;
        }

        /// <inheritdoc/>
        public async Task<List<CarbonRatingListItemDto>> GetCarbonRatingListItems(string filter = "")
        {
            var auditKey = await _auditRepository.GetLatestAuditKey();
            if (!auditKey.HasValue)
                return [];

            var pageData = await GetCachedPages(auditKey.Value);
            if (pageData == null || !pageData.Any())
                return [];

            var filteredData = FilterPages(pageData, filter, 0);

            var performanceData = await _auditRepository.GetAllPerformanceDataByAuditKey(auditKey.Value);
            var performanceLookup = performanceData
                .GroupBy(x => x.Url ?? "")
                .ToDictionary(g => g.Key, g => g.First(), StringComparer.OrdinalIgnoreCase);

            var technicalSeoData = await _auditRepository.GetAllTechnicalSeoDataByAuditKey(auditKey.Value);
            var technicalSeoLookup = technicalSeoData
                .GroupBy(x => x.Url ?? "")
                .ToDictionary(g => g.Key, g => g.First(), StringComparer.OrdinalIgnoreCase);

            var results = new List<CarbonRatingListItemDto>();
            foreach (var page in filteredData)
            {
                var item = new CarbonRatingListItemDto
                {
                    PageData = new PageDto(page),
                    EntityType = "document",
                    Unique = page.Unique
                };

                var url = page.Url ?? "";

                if (!string.IsNullOrEmpty(url))
                {
                    if (technicalSeoLookup.TryGetValue(url, out var techSeo))
                        item.ContentType = techSeo.ContentType;

                    if (performanceLookup.TryGetValue(url, out var perf))
                    {
                        item.TotalBytes = perf.TotalBytes;

                        if (perf.TotalBytes.HasValue)
                        {
                            var score = _emissionsService.PerVisit(perf.TotalBytes.Value, false, false, true);
                            if (score.Total.HasValue)
                                item.EmissionsData.EmissionsPerPageView = Math.Round(score.Total.Value, 2);
                            item.EmissionsData.CarbonRating = score.Rating;
                        }
                    }
                }

                results.Add(item);
            }

            return results;
        }

        /// <inheritdoc/>
        public async Task<List<CoreWebVitalsListItemDto>> GetCoreWebVitalsListItems(string filter = "")
        {
            var auditKey = await _auditRepository.GetLatestAuditKey();
            if (!auditKey.HasValue)
                return [];

            var pageData = await GetCachedPages(auditKey.Value);
            if (pageData == null || !pageData.Any())
                return [];

            var filteredData = FilterPages(pageData, filter, 0);

            var performanceData = await _auditRepository.GetAllPerformanceDataByAuditKey(auditKey.Value);
            var performanceLookup = performanceData
                .GroupBy(x => x.Url ?? "")
                .ToDictionary(g => g.Key, g => g.First(), StringComparer.OrdinalIgnoreCase);

            var results = new List<CoreWebVitalsListItemDto>();
            foreach (var page in filteredData)
            {
                var item = new CoreWebVitalsListItemDto
                {
                    PageData = new PageDto(page),
                    EntityType = "document",
                    Unique = page.Unique
                };

                if (!string.IsNullOrEmpty(page.Url) && performanceLookup.TryGetValue(page.Url, out var perf))
                    item.PerformanceData = new PerformanceDto(perf);

                results.Add(item);
            }

            return results;
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

                foreach (var issue in _pageIssues)
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
                        };

                        auditIssue.PriorityScore = CalculatePriorityScore(auditIssue);
                        result.Add(auditIssue);
                    }
                }

                if (imageData != null && imageData.Any())
                {
                    var imageCount = imageData.Count();

                    foreach (var issue in _imageIssues)
                    {
                        var issueCheck = issue.CheckImages(imageData, pageData);
                        var imagesWithIssues = issueCheck?.DistinctBy(x => x.FoundPage).Count() ?? 0;

                        double percent = ((double)imagesWithIssues / (double)imageCount) * 100.0;

                        var auditIssue = new IssueDto(issue)
                        {
                            NumberOfUrls = imagesWithIssues,
                            PercentOfTotal = percent,
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
                        Pages = issueCheck?.Select(StripHeavyPageData)
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
            return await GetLinkGroups(isExternal: true);
        }

        /// <inheritdoc/>
        public async Task<List<LinkGroupDto>> GetInternalLinks(string filter = "")
        {
            return await GetLinkGroups(isExternal: false);
        }

        private async Task<List<LinkGroupDto>> GetLinkGroups(bool isExternal)
        {
            var auditKey = await _auditRepository.GetLatestAuditKey();
            if (!auditKey.HasValue)
                return [];

            var allLinks = await _auditRepository.GetAllLinkDataByAuditKey(auditKey.Value);
            var linkData = allLinks
                .Where(x => x.IsExternal == isExternal)
                .Select(x => new LinkDto(x));

            var results = new List<LinkGroupDto>();
            var groupedData = linkData.GroupBy(x => x.Url).ToList();

            foreach (var group in groupedData.Where(g => g.Key != null))
            {
                results.Add(new LinkGroupDto
                {
                    Url = group.Key,
                    ContentType = group.FirstOrDefault()?.ContentType,
                    StatusCode = group.FirstOrDefault()?.StatusCode,
                    LinkCount = group.Count()
                });
            }

            return results.OrderByDescending(x => x.LinkCount).ToList();
        }

        /// <inheritdoc/>
        public async Task<HealthScoreDto> GetHealthScore()
        {
            var result = new HealthScoreDto();
            var data = await GetLatestAuditData();

            if (data != null && data.Any())
            {
                result.TotalPages = data.Count;

                var pagesWithErrors = new HashSet<Guid>();
                foreach (var issue in _pageIssues)
                {
                    var pagesWithIssue = issue.CheckPages(data);
                    if (pagesWithIssue != null)
                    {
                        foreach (var page in pagesWithIssue)
                        {
                            pagesWithErrors.Add(page.PageData.Unique);
                        }
                    }
                }

                result.PagesWithErrors = pagesWithErrors.Count;
                result.HealthScore = ((double)(result.TotalPages - result.PagesWithErrors) / result.TotalPages) * 100.0;
            }

            return result;
        }

        private async Task<(Guid AuditKey, string Url, PageSchema Page)?> ResolvePageContext(Guid unique)
        {
            var auditKey = await _auditRepository.GetLatestAuditKey();
            if (!auditKey.HasValue)
                return null;

            var pageData = await GetCachedPages(auditKey.Value);
            if (pageData == null || !pageData.Any())
                return null;

            var pageSchema = pageData.FirstOrDefault(x => x.Unique == unique);
            if (pageSchema == null || string.IsNullOrEmpty(pageSchema.Url))
                return null;

            return (auditKey.Value, pageSchema.Url, pageSchema);
        }

        private async Task<PageAnalysisDto> PopulateSinglePageDetailData(Guid auditKey, string url, PageSchema pageSchema)
        {
            var result = new PageAnalysisDto
            {
                PageData = new PageDto(pageSchema),
                EntityType = "document"
            };
            result.Unique = result.PageData.Unique;

            var seoData = (await _auditRepository.GetSeoData(auditKey, url)).FirstOrDefault();
            if (seoData != null)
                result.SeoData = new SeoDto(seoData);

            var contentAnalysis = (await _auditRepository.GetContentAnalysisData(auditKey, url)).FirstOrDefault();
            if (contentAnalysis != null)
                result.ContentAnalysis = new ContentAnalysisDto(contentAnalysis);

            var perfData = (await _auditRepository.GetPerformanceData(auditKey, url)).FirstOrDefault();
            if (perfData != null)
            {
                result.PerformanceData = new PerformanceDto(perfData);

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

            var accessibilityData = (await _auditRepository.GetAccessibilityData(auditKey, url)).FirstOrDefault();
            if (accessibilityData != null)
                result.AccessibilityData = new AccessibilityDto(accessibilityData);

            var technicalSeoData = (await _auditRepository.GetTechnicalSeoData(auditKey, url)).FirstOrDefault();
            if (technicalSeoData != null)
                result.TechnicalSeoData = new TechnicalSeoDto(technicalSeoData);

            var socialMediaData = (await _auditRepository.GetSocialMediaData(auditKey, url)).FirstOrDefault();
            if (socialMediaData != null)
                result.SocialMediaData = new SocialMediaDto(socialMediaData);

            var contentQualityData = (await _auditRepository.GetContentQualityData(auditKey, url)).FirstOrDefault();
            if (contentQualityData != null)
                result.ContentQualityData = new ContentQualityDto(contentQualityData);

            return result;
        }

        private double CalculatePriorityScore(IssueDto issue)
        {
            ArgumentNullException.ThrowIfNull(issue);

            const double PRIORITY_WEIGHT = 0.50;
            const double TYPE_WEIGHT = 0.30;
            const double PERCENTAGE_WEIGHT = 0.20;

            double percentValue = issue.PercentOfTotal.GetValueOrDefault(0.0);
            double validPercentage = Math.Min(Math.Max(percentValue, 0.0), 100.0);

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

        private static PageAnalysisDto StripHeavyPageData(PageAnalysisDto page) => new()
        {
            Unique = page.Unique,
            EntityType = page.EntityType,
            PageData = page.PageData,
            SeoData = page.SeoData,
            ContentAnalysis = page.ContentAnalysis,
            PerformanceData = page.PerformanceData,
            AccessibilityData = page.AccessibilityData,
            TechnicalSeoData = page.TechnicalSeoData,
            SocialMediaData = page.SocialMediaData,
            ContentQualityData = page.ContentQualityData,
            EmissionsData = page.EmissionsData
        };
    }
}
