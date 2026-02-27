using Examine;
using Examine.Search;
using FluentAssertions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Examine;
using Umbraco.Community.ContentAudit.Configuration;
using Umbraco.Community.ContentAudit.Services.Discovery;
using Xunit;
using static Umbraco.Cms.Core.Constants;

namespace Umbraco.Community.ContentAudit.UnitTests.Umbraco.Community.ContentAudit.Services.Discovery;

public class UmbracoContentUrlDiscoveryStrategyTests
{
    private readonly Mock<IExamineManager> _examineManager = new();
    private readonly Mock<IPublishedUrlProvider> _urlProvider = new();
    private readonly Mock<IUmbracoContextFactory> _umbracoContextFactory = new();
    private readonly Mock<IOptionsMonitor<ContentAuditSettings>> _settings = new();
    private readonly Mock<ILogger<UmbracoContentUrlDiscoveryStrategy>> _logger = new();

    private UmbracoContentUrlDiscoveryStrategy CreateSut(bool useUmbracoContentIndex = false)
    {
        _settings.Setup(s => s.CurrentValue).Returns(new ContentAuditSettings
        {
            UseUmbracoContentIndex = useUmbracoContentIndex
        });

        return new UmbracoContentUrlDiscoveryStrategy(
            _examineManager.Object,
            _urlProvider.Object,
            _umbracoContextFactory.Object,
            _settings.Object,
            _logger.Object);
    }

    private void SetupExamineIndex(params (Guid key, int nodeId, string url)[] items)
    {
        var searchResults = new List<ISearchResult>();

        foreach (var (key, nodeId, url) in items)
        {
            var result = new Mock<ISearchResult>();
            result.Setup(r => r.Values).Returns(new Dictionary<string, string>
            {
                { UmbracoExamineFieldNames.NodeKeyFieldName, key.ToString() },
                { UmbracoExamineFieldNames.ItemIdFieldName, nodeId.ToString() }
            });
            searchResults.Add(result.Object);

            _urlProvider.Setup(p => p.GetUrl(nodeId, UrlMode.Absolute))
                .Returns(url);
        }

        var results = new Mock<ISearchResults>();
        results.Setup(r => r.GetEnumerator()).Returns(searchResults.GetEnumerator());

        var booleanOperation = new Mock<IBooleanOperation>();
        booleanOperation.Setup(o => o.Execute(It.IsAny<QueryOptions>())).Returns(results.Object);

        var query = new Mock<IQuery>();
        query.Setup(q => q.NativeQuery(It.IsAny<string>())).Returns(booleanOperation.Object);

        var searcher = new Mock<ISearcher>();
        searcher.Setup(s => s.CreateQuery(It.IsAny<string>(), It.IsAny<BooleanOperation>()))
            .Returns(query.Object);

        var index = new Mock<IIndex>();
        index.Setup(i => i.Searcher).Returns(searcher.Object);

        _examineManager
            .Setup(m => m.TryGetIndex(UmbracoIndexes.InternalIndexName, out It.Ref<IIndex>.IsAny))
            .Callback(new TryGetIndexCallback((string name, out IIndex idx) => idx = index.Object))
            .Returns(true);
    }

    private delegate void TryGetIndexCallback(string name, out IIndex index);

    [Fact]
    public void ContributesToCrawlQueue_WhenUseUmbracoContentIndexFalse_ReturnsFalse()
    {
        var sut = CreateSut(useUmbracoContentIndex: false);

        sut.ContributesToCrawlQueue.Should().BeFalse();
    }

    [Fact]
    public void ContributesToCrawlQueue_WhenUseUmbracoContentIndexTrue_ReturnsTrue()
    {
        var sut = CreateSut(useUmbracoContentIndex: true);

        sut.ContributesToCrawlQueue.Should().BeTrue();
    }

    [Fact]
    public async Task DiscoverUrlsAsync_WhenUseUmbracoContentIndexFalse_StillReturnsUrls()
    {
        var key = Guid.NewGuid();
        SetupExamineIndex((key, 1001, "https://example.com/about/"));
        var sut = CreateSut(useUmbracoContentIndex: false);

        var result = await sut.DiscoverUrlsAsync("https://example.com/");

        result.Should().HaveCount(1);
        result.First().ContentId.Should().Be(key);
    }

    [Fact]
    public async Task DiscoverUrlsAsync_ReturnsUrlsWithContentIds()
    {
        var key1 = Guid.NewGuid();
        var key2 = Guid.NewGuid();
        SetupExamineIndex(
            (key1, 1001, "https://example.com/about/"),
            (key2, 1002, "https://example.com/contact/"));

        var sut = CreateSut();

        var result = (await sut.DiscoverUrlsAsync("https://example.com/")).ToList();

        result.Should().HaveCount(2);
        result.Should().AllSatisfy(url => url.ContentId.Should().NotBeNull());
    }

    [Fact]
    public async Task DiscoverUrlsAsync_WhenNoIndex_ReturnsEmpty()
    {
        _examineManager
            .Setup(m => m.TryGetIndex(UmbracoIndexes.InternalIndexName, out It.Ref<IIndex>.IsAny))
            .Returns(false);

        var sut = CreateSut();

        var result = await sut.DiscoverUrlsAsync("https://example.com/");

        result.Should().BeEmpty();
    }

    [Fact]
    public async Task DiscoverUrlsAsync_SkipsResultsWithEmptyUrl()
    {
        var key = Guid.NewGuid();
        SetupExamineIndex((key, 1001, ""));

        var sut = CreateSut();

        var result = await sut.DiscoverUrlsAsync("https://example.com/");

        result.Should().BeEmpty();
    }
}
