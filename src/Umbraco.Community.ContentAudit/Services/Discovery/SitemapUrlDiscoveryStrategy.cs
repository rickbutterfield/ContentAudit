using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Umbraco.Community.ContentAudit.Configuration;
using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Services.Discovery
{
    /// <summary>
    /// Discovers URLs from sitemap.xml files
    /// </summary>
    public class SitemapUrlDiscoveryStrategy : IUrlDiscoveryStrategy
    {
        private readonly ISitemapService _sitemapService;
        private readonly IOptionsMonitor<ContentAuditSettings> _settings;
        private readonly ILogger<SitemapUrlDiscoveryStrategy> _logger;

        public string Name => "Sitemap";
        public int Priority => 100;

        public SitemapUrlDiscoveryStrategy(
            ISitemapService sitemapService,
            IOptionsMonitor<ContentAuditSettings> settings,
            ILogger<SitemapUrlDiscoveryStrategy> logger)
        {
            _sitemapService = sitemapService;
            _settings = settings;
            _logger = logger;
        }

        public async Task<IEnumerable<DiscoveredUrl>> DiscoverUrlsAsync(string baseUrl, CancellationToken cancellationToken = default)
        {
            if (!_settings.CurrentValue.UseSitemapXml)
            {
                _logger.LogInformation("Sitemap URL discovery is disabled");
                return [];
            }

            _logger.LogInformation("Discovering URLs from sitemap.xml");

            var sitemapUrls = await _sitemapService.GetSitemapUrlAsync(baseUrl);

            _logger.LogInformation("Discovered {Count} URLs from sitemap.xml", sitemapUrls.Count);

            return sitemapUrls.Select(url => new DiscoveredUrl(url));
        }
    }
}
