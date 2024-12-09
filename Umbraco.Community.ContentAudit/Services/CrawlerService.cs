using Examine;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Builder;
using System.Collections.Concurrent;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Infrastructure.Examine;
using Umbraco.Cms.Infrastructure.Scoping;
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

        private readonly HashSet<string> _visitedUrls = new HashSet<string>();
        private readonly HashSet<string> _disallowedUrls = new HashSet<string>();
        private readonly ConcurrentQueue<string> _urlQueue = new ConcurrentQueue<string>();
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

        public CrawlerService(
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
        }

        public async IAsyncEnumerable<PageResponseDto> StartCrawl(string baseUrl)
        {
            _baseUrl = baseUrl;
            var baseUri = new Uri(_baseUrl);

            var robotsDisallowedUrls = await _robotsService.GetDisallowedPathsAsync(baseUrl);
            if (robotsDisallowedUrls != null && robotsDisallowedUrls?.Any() == true)
                robotsDisallowedUrls.ForEach(x => _robotsDisallowedPaths.Add(x));

            var sitemapUrls = await _sitemapService.GetSitemapUrlsAsync(baseUrl);
            if (sitemapUrls != null && sitemapUrls?.Any() == true)
            {
                sitemapUrls.ForEach(x => _urlQueue.Enqueue(x));
            }
            else _urlQueue.Enqueue(_baseUrl);

            var umbracoContentData = LoadUmbracoContentUrls();
            if (umbracoContentData.Any())
                umbracoContentData.ForEach(x => _umbracoContent.Add(x));

            while (_urlQueue.TryDequeue(out string? url))
            {
                var currentUri = new Uri(url);
                if (_visitedUrls.Contains(url)) continue;

                if (IsDisallowed(url))
                {
                    _disallowedUrls.Add(url);
                    continue;
                }

                _visitedUrls.Add(url);

                bool isInternal = currentUri.Host.Equals(baseUri.Host, StringComparison.OrdinalIgnoreCase);
                if (isInternal)
                {
                    _internalUrls.Add(url);
                }
                else _externalUrls.Add(url);

                var matchingUmbracoNode = _umbracoContent.FirstOrDefault(x => x.Value == url);
                var pageResponse = await _resourceService.GetPageWithAssetsAsync(url, matchingUmbracoNode.Key);
                if (pageResponse == null) continue;

                var dto = new PageSchema(pageResponse, 0);
                _data.Add(dto);
                yield return pageResponse;

                if (sitemapUrls == null || sitemapUrls?.Any() == false)
                {
                    IEnumerable<string> links = ExtractLinks(pageResponse.PageContent, url);
                    foreach (var link in links)
                    {
                        if (!_visitedUrls.Contains(link) && !IsDisallowed(link))
                        {
                            _urlQueue.Enqueue(link);
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

        private IEnumerable<string> ExtractLinks(string htmlContent, string baseUrl)
        {
            var doc = new HtmlDocument();
            doc.LoadHtml(htmlContent);

            var nodes = doc.DocumentNode.SelectNodes("//a[@href]");
            if (nodes == null) return Enumerable.Empty<string>();

            return nodes
                .Select(node => node.GetAttributeValue("href", string.Empty))
                .Select(href => ResolveUrl(baseUrl, href))
                .Where(link => IsValidUrl(link));
        }

        private string ResolveUrl(string baseUrl, string href)
        {
            if (Uri.TryCreate(href, UriKind.Absolute, out var absoluteUri))
            {
                return absoluteUri.ToString();
            }
            if (Uri.TryCreate(new Uri(baseUrl), href, out var relativeUri))
            {
                return relativeUri.ToString();
            }
            return null;
        }

        private bool IsValidUrl(string url)
        {
            return Uri.TryCreate(url, UriKind.Absolute, out var uri) &&
                   uri.Scheme.StartsWith("http") &&
                   uri.Host == new Uri(_baseUrl).Host;
        }
    }
}
