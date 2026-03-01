using Examine;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core.Services;
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
        private readonly IDocumentUrlService _documentUrlService;
        private readonly ILanguageService _languageService;
        private readonly IOptionsMonitor<ContentAuditSettings> _settings;
        private readonly ILogger<UmbracoContentUrlDiscoveryStrategy> _logger;

        public string Name => "Umbraco Content Index";
        public int Priority => 200;
        public bool ContributesToCrawlQueue => _settings.CurrentValue.UseUmbracoContentIndex;

        public UmbracoContentUrlDiscoveryStrategy(
            IExamineManager examineManager,
            IDocumentUrlService documentUrlService,
            ILanguageService languageService,
            IOptionsMonitor<ContentAuditSettings> settings,
            ILogger<UmbracoContentUrlDiscoveryStrategy> logger)
        {
            _examineManager = examineManager;
            _documentUrlService = documentUrlService;
            _languageService = languageService;
            _settings = settings;
            _logger = logger;
        }

        public async Task<IEnumerable<DiscoveredUrl>> DiscoverUrlsAsync(string baseUrl, CancellationToken cancellationToken = default)
        {
            _logger.LogInformation("Resolving content nodes from Umbraco content index");

            var discoveredUrls = new List<DiscoveredUrl>();

            if (_examineManager.TryGetIndex(UmbracoIndexes.ExternalIndexName, out var contentIndex))
            {
                var searcher = contentIndex.Searcher;
                var query = searcher.CreateQuery("content").NativeQuery("+__IndexType:content -templateID:0");
                var results = query.Execute(new Examine.Search.QueryOptions(0, int.MaxValue));

                var trimmedBaseUrl = baseUrl.TrimEnd('/');
                var defaultCulture = await _languageService.GetDefaultIsoCodeAsync();

                foreach (var result in results)
                {
                    if (result.Values.TryGetValue(UmbracoExamineFieldNames.NodeKeyFieldName, out var keyString) &&
                        Guid.TryParse(keyString, out var key))
                    {
                        var route = _documentUrlService.GetLegacyRouteFormat(key, defaultCulture, isDraft: false);

                        if (string.IsNullOrWhiteSpace(route) || route == "#")
                            continue;

                        // Route is either "/{path}" (no domain) or "{domainContentId}/{path}" (with domain).
                        // Extract the path portion and combine with baseUrl directly.
                        var slashIndex = route.IndexOf('/');
                        var path = slashIndex == 0 ? route : route[slashIndex..];
                        var url = trimmedBaseUrl + path;

                        discoveredUrls.Add(new DiscoveredUrl(url, key));
                    }
                }
            }

            _logger.LogInformation("Discovered {Count} URLs from Umbraco content index", discoveredUrls.Count);

            return discoveredUrls;
        }
    }
}
