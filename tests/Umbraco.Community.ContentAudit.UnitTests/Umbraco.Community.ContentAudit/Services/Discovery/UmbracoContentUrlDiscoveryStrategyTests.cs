using Examine;
using Examine.Search;
using FluentAssertions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Infrastructure.Examine;
using Umbraco.Community.ContentAudit.Configuration;
using Umbraco.Community.ContentAudit.Services.Discovery;
using Xunit;
using static Umbraco.Cms.Core.Constants;

namespace Umbraco.Community.ContentAudit.UnitTests.Umbraco.Community.ContentAudit.Services.Discovery;

public class UmbracoContentUrlDiscoveryStrategyTests
{
    private readonly Mock<IExamineManager> _examineManager = new();
    private readonly Mock<IDocumentUrlService> _documentUrlService = new();
    private readonly Mock<ILanguageService> _languageService = new();
    private readonly Mock<IOptionsMonitor<ContentAuditSettings>> _settings = new();
    private readonly Mock<ILogger<UmbracoContentUrlDiscoveryStrategy>> _logger = new();

    private UmbracoContentUrlDiscoveryStrategy CreateSut(bool useUmbracoContentIndex = false)
    {
        _settings.Setup(s => s.CurrentValue).Returns(new ContentAuditSettings
        {
            UseUmbracoContentIndex = useUmbracoContentIndex
        });

        _languageService.Setup(l => l.GetDefaultIsoCodeAsync())
            .ReturnsAsync("en-US");

        return new UmbracoContentUrlDiscoveryStrategy(
            _examineManager.Object,
            _documentUrlService.Object,
            _languageService.Object,
            _settings.Object,
            _logger.Object);
    }

    private Mock<IQuery> SetupExamineIndex(params (Guid key, string route)[] items)
    {
        var searchResults = new List<ISearchResult>();

        foreach (var (key, route) in items)
        {
            var result = new Mock<ISearchResult>();
            result.Setup(r => r.Values).Returns(new Dictionary<string, string>
            {
                { UmbracoExamineFieldNames.NodeKeyFieldName, key.ToString() },
                { UmbracoExamineFieldNames.ItemIdFieldName, "1001" }
            });
            searchResults.Add(result.Object);

            _documentUrlService.Setup(d => d.GetLegacyRouteFormat(key, "en-US", false))
                .Returns(route);
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
            .Setup(m => m.TryGetIndex(UmbracoIndexes.ExternalIndexName, out It.Ref<IIndex>.IsAny))
            .Callback(new TryGetIndexCallback((string name, out IIndex idx) => idx = index.Object))
            .Returns(true);

        return query;
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
        SetupExamineIndex((key, "/about"));
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
            (key1, "/about"),
            (key2, "/contact"));

        var sut = CreateSut();

        var result = (await sut.DiscoverUrlsAsync("https://example.com")).ToList();

        result.Should().HaveCount(2);
        result.Should().AllSatisfy(url => url.ContentId.Should().NotBeNull());
    }

    [Fact]
    public async Task DiscoverUrlsAsync_CombinesBaseUrlWithPath()
    {
        var key = Guid.NewGuid();
        SetupExamineIndex((key, "/about"));
        var sut = CreateSut();

        var result = (await sut.DiscoverUrlsAsync("https://example.com")).ToList();

        result.Should().HaveCount(1);
        result.First().Url.Should().Be("https://example.com/about");
    }

    [Fact]
    public async Task DiscoverUrlsAsync_HandlesRouteWithDomainContentId()
    {
        var key = Guid.NewGuid();
        SetupExamineIndex((key, "1234/child/grandchild"));
        var sut = CreateSut();

        var result = (await sut.DiscoverUrlsAsync("https://example.com")).ToList();

        result.Should().HaveCount(1);
        result.First().Url.Should().Be("https://example.com/child/grandchild");
    }

    [Fact]
    public async Task DiscoverUrlsAsync_TrimsTrailingSlashFromBaseUrl()
    {
        var key = Guid.NewGuid();
        SetupExamineIndex((key, "/about"));
        var sut = CreateSut();

        var result = (await sut.DiscoverUrlsAsync("https://example.com/")).ToList();

        result.Should().HaveCount(1);
        result.First().Url.Should().Be("https://example.com/about");
    }

    [Fact]
    public async Task DiscoverUrlsAsync_WhenNoIndex_ReturnsEmpty()
    {
        _examineManager
            .Setup(m => m.TryGetIndex(UmbracoIndexes.ExternalIndexName, out It.Ref<IIndex>.IsAny))
            .Returns(false);

        var sut = CreateSut();

        var result = await sut.DiscoverUrlsAsync("https://example.com/");

        result.Should().BeEmpty();
    }

    [Fact]
    public async Task DiscoverUrlsAsync_SkipsResultsWithHashRoute()
    {
        var key = Guid.NewGuid();
        SetupExamineIndex((key, "#"));

        var sut = CreateSut();

        var result = await sut.DiscoverUrlsAsync("https://example.com/");

        result.Should().BeEmpty();
    }

    [Fact]
    public async Task DiscoverUrlsAsync_HandlesRootRoute()
    {
        var key = Guid.NewGuid();
        SetupExamineIndex((key, "/"));
        var sut = CreateSut();

        var result = (await sut.DiscoverUrlsAsync("https://example.com")).ToList();

        result.Should().HaveCount(1);
        result.First().Url.Should().Be("https://example.com/");
    }

    [Fact]
    public async Task DiscoverUrlsAsync_ExcludesContentWithNoTemplate()
    {
        var key = Guid.NewGuid();
        var query = SetupExamineIndex((key, "/about"));
        var sut = CreateSut();

        await sut.DiscoverUrlsAsync("https://example.com");

        query.Verify(q => q.NativeQuery(It.Is<string>(s => s.Contains("-templateID:0"))), Times.Once);
    }
}
