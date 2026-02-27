using Examine;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Examine;
using Umbraco.Community.ContentAudit.Configuration;
using Umbraco.Community.ContentAudit.Interfaces;
using static Umbraco.Cms.Core.Constants;

namespace Umbraco.Community.ContentAudit.Services.Discovery
{
    /// <summary>
    /// Discovers URLs from Umbraco's content index
    /// </summary>
    public class UmbracoContentUrlDiscoveryStrategy : IUrlDiscoveryStrategy
    {
        private readonly IExamineManager _examineManager;
        private readonly IPublishedUrlProvider _urlProvider;
        private readonly IUmbracoContextFactory _umbracoContextFactory;
        private readonly IOptionsMonitor<ContentAuditSettings> _settings;
        private readonly ILogger<UmbracoContentUrlDiscoveryStrategy> _logger;

        public string Name => "Umbraco Content Index";
        public int Priority => 200;
        public bool ContributesToCrawlQueue => _settings.CurrentValue.UseUmbracoContentIndex;

        public UmbracoContentUrlDiscoveryStrategy(
            IExamineManager examineManager,
            IPublishedUrlProvider urlProvider,
            IUmbracoContextFactory umbracoContextFactory,
            IOptionsMonitor<ContentAuditSettings> settings,
            ILogger<UmbracoContentUrlDiscoveryStrategy> logger)
        {
            _examineManager = examineManager;
            _urlProvider = urlProvider;
            _umbracoContextFactory = umbracoContextFactory;
            _settings = settings;
            _logger = logger;
        }

        public Task<IEnumerable<DiscoveredUrl>> DiscoverUrlsAsync(string baseUrl, CancellationToken cancellationToken = default)
        {
            _logger.LogInformation("Resolving content nodes from Umbraco content index");

            var discoveredUrls = new List<DiscoveredUrl>();

            // EnsureUmbracoContext creates a context when running outside an HTTP request
            // (e.g. background Task.Run), which IPublishedUrlProvider.GetUrl requires.
            using var contextReference = _umbracoContextFactory.EnsureUmbracoContext();

            if (_examineManager.TryGetIndex(UmbracoIndexes.InternalIndexName, out var contentIndex))
            {
                var searcher = contentIndex.Searcher;
                var query = searcher.CreateQuery("content").NativeQuery("+__IndexType:content");
                var results = query.Execute(new Examine.Search.QueryOptions(0, int.MaxValue));

                foreach (var result in results)
                {
                    if (result.Values.TryGetValue(UmbracoExamineFieldNames.NodeKeyFieldName, out var keyString) &&
                        Guid.TryParse(keyString, out var key) &&
                        result.Values.TryGetValue(UmbracoExamineFieldNames.ItemIdFieldName, out var idString) &&
                        int.TryParse(idString, out var nodeId))
                    {
                        var url = _urlProvider.GetUrl(nodeId, UrlMode.Absolute);

                        if (!string.IsNullOrEmpty(url))
                        {
                            discoveredUrls.Add(new DiscoveredUrl(url, key));
                        }
                    }
                }
            }

            _logger.LogInformation("Discovered {Count} URLs from Umbraco content index", discoveredUrls.Count);

            return Task.FromResult<IEnumerable<DiscoveredUrl>>(discoveredUrls);
        }
    }
}
