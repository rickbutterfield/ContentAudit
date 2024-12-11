using Examine;
using Microsoft.Extensions.Options;
using System.Collections.Concurrent;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Infrastructure.Examine;
using Umbraco.Cms.Infrastructure.Scoping;
using Umbraco.Community.ContentAudit.Common.Configuration;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Schemas;
using Umbraco.Extensions;
using static Umbraco.Cms.Core.Constants;

namespace Umbraco.Community.ContentAudit.Services
{
    public class CrawlerService : ICrawlerService
    {
        private string? _baseUrl;

        private readonly ConcurrentQueue<string> _urlQueue = new ConcurrentQueue<string>();
        private readonly HashSet<string> _visitedUrls = new HashSet<string>();
        private readonly HashSet<string> _disallowedUrls = new HashSet<string>();
        private readonly HashSet<string> _robotsDisallowedPaths = new HashSet<string>();
        private readonly HashSet<string> _internalUrls = new HashSet<string>();
        private readonly HashSet<string> _externalUrls = new HashSet<string>();
        private readonly HashSet<PageSchema> _data = new HashSet<PageSchema>();
        private readonly HashSet<KeyValuePair<Guid, string>> _umbracoContent = new HashSet<KeyValuePair<Guid, string>>();

        private readonly IScopeProvider _scopeProvider;
        private readonly IExamineManager _examineManager;
        private readonly IPublishedUrlProvider _urlProvider;
        private readonly IResourceService _resourceService;
        private readonly ISitemapService _sitemapService;
        private readonly IRobotsService _robotsService;

        public ContentAuditSettings _contentAuditSettings { get; private set; }
        public RequestHandlerSettings _requestHandlerSettings { get; private set; }

        public CrawlerService(
            IOptionsMonitor<ContentAuditSettings> contentAuditSettings,
            IOptionsMonitor<RequestHandlerSettings> requestHandlerSettings,
            IScopeProvider scopeProvider,
            IExamineManager examineManager,
            IPublishedUrlProvider urlProvider,
            IResourceService resourceService,
            ISitemapService sitemapService,
            IRobotsService robotsService)
        {
            _scopeProvider = scopeProvider;
            _examineManager = examineManager;
            _urlProvider = urlProvider;
            _resourceService = resourceService;
            _sitemapService = sitemapService;
            _robotsService = robotsService;

            _contentAuditSettings = contentAuditSettings.CurrentValue;

            contentAuditSettings.OnChange(options =>
            {
                _contentAuditSettings = options;
            });

            _requestHandlerSettings = requestHandlerSettings.CurrentValue;
        }

        public async IAsyncEnumerable<PageResponseDto> StartCrawl(string baseUrl)
        {
            if (_requestHandlerSettings.AddTrailingSlash)
            {
                baseUrl = baseUrl.EnsureEndsWith('/');
            }

            _baseUrl = baseUrl;
            var baseUri = new Uri(_baseUrl);
            bool useSitemap = false;

            if (_contentAuditSettings.RespectRobotsTxt)
            {
                var robotsDisallowedUrls = await _robotsService.GetDisallowedPathsAsync(baseUrl);
                if (robotsDisallowedUrls != null && robotsDisallowedUrls?.Any() == true)
                    robotsDisallowedUrls.ForEach(x => _robotsDisallowedPaths.Add(x));
            }

            if (_contentAuditSettings.UseSitemapXml)
            {
                var sitemapUrls = await _sitemapService.GetSitemapUrlsAsync(baseUrl);
                if (sitemapUrls != null && sitemapUrls?.Any() == true)
                {
                    useSitemap = true;
                    sitemapUrls.ForEach(x => _urlQueue.Enqueue(x));
                }
                else _urlQueue.Enqueue(_baseUrl);
            }
            else _urlQueue.Enqueue(_baseUrl);

            var umbracoContentData = LoadUmbracoContentUrls();
            if (umbracoContentData.Any())
                umbracoContentData.ForEach(x => _umbracoContent.Add(x));

            while (_urlQueue.TryDequeue(out string? url))
            {
                // Turn the URL into a C# Uri
                var currentUri = new Uri(url);
                
                // Skip if this page has already been visited
                if (_visitedUrls.Contains(url)) continue;

                // Check if robots.txt is saying we shouldn't visit
                if (IsDisallowed(url))
                {
                    _disallowedUrls.Add(url);
                    continue;
                }

                // Check if it's an internal or external link
                bool isInternal = currentUri.Host.Equals(baseUri.Host, StringComparison.OrdinalIgnoreCase);
                if (isInternal)
                {
                    _internalUrls.Add(url);
                }
                else _externalUrls.Add(url);

                // Now let's get the actual URL and associated data
                // - Find the matching internal Umbraco node (might be useful in the future)
                // - Visit the page and get the assets
                // - Add it to our visited list
                var matchingUmbracoNode = _umbracoContent.FirstOrDefault(x => x.Value == url.EnsureEndsWith('/'));
                var pageResponse = await _resourceService.GetPageWithAssetsAsync(url, matchingUmbracoNode.Key);
                if (pageResponse == null) continue;
                _visitedUrls.Add(url);

                // If we're not using the sitemap, we want to crawl the found URLs on the page
                if (!useSitemap)
                {
                    foreach (var link in pageResponse.Links)
                    {
                        if (Uri.TryCreate(baseUri, link, out Uri? absoluteUri))
                        {
                            string absoluteUrl = absoluteUri.AbsoluteUri;
                            if (!_visitedUrls.Contains(absoluteUrl) && !IsDisallowed(absoluteUrl))
                            {
                                _urlQueue.Enqueue(absoluteUrl);
                            }
                        }
                    }
                }

                foreach (var resource in pageResponse.Resources)
                {
                    if (!_visitedUrls.Contains(resource.Url) && !IsDisallowed(resource.Url))
                    {
                        _urlQueue.Enqueue(resource.Url);
                    }
                }

                var dto = new PageSchema(pageResponse, 0);
                _data.Add(dto);
                yield return pageResponse;

                if (_urlQueue.IsEmpty)
                    break;
            }

            var totalUrls = _visitedUrls.Count + _disallowedUrls.Count;

            using var scope = _scopeProvider.CreateScope();

            var overview = await scope.Database.InsertAsync(new OverviewSchema()
            {
                RunDate = DateTime.Now,
                TotalUrls = totalUrls,
                TotalUrlsCrawled = _visitedUrls.Count,
                TotalBlockedUrls = _disallowedUrls.Count
            });

            int.TryParse(overview.ToString(), out int runId);

            foreach (var data in _data)
            {
                try
                {
                    data.RunId = runId;
                    await scope.Database.InsertAsync(data);
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.ToString(), ex);
                }
            }

            scope.Complete();
        }

        private List<KeyValuePair<Guid, string>> LoadUmbracoContentUrls()
        {
            List<KeyValuePair<Guid,string>> contentData = new List<KeyValuePair<Guid,string>>();

            if (_examineManager.TryGetIndex(UmbracoIndexes.InternalIndexName, out var contentIndex))
            {
                var searcher = contentIndex.Searcher;

                // Query for all nodes in the index
                var query = searcher.CreateQuery("content").NativeQuery("+__IndexType:content");
                var results = query.Execute();

                foreach (var result in results)
                {
                    // Retrieve the key (GUID) and URL for each node
                    if (result.Values.TryGetValue(UmbracoExamineFieldNames.NodeKeyFieldName, out var keyString) &&
                        Guid.TryParse(keyString, out var key) &&
                        result.Values.TryGetValue(UmbracoExamineFieldNames.ItemIdFieldName, out var idString) &&
                        int.TryParse(idString, out var nodeId))
                    {
                        var url = _urlProvider.GetUrl(nodeId, UrlMode.Absolute);
                        if (!string.IsNullOrEmpty(url))
                        {
                            contentData.Add(new KeyValuePair<Guid, string>(key, url));
                        }
                    }
                }
            }

            return contentData;
        }

        private bool IsDisallowed(string url)
        {
            return _robotsDisallowedPaths.Any(disallowed => url.StartsWith(disallowed, StringComparison.OrdinalIgnoreCase)) || !url.StartsWith(_baseUrl);
        }
    }
}
