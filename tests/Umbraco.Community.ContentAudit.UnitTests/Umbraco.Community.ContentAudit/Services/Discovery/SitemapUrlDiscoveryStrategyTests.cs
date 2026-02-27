using FluentAssertions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using Umbraco.Community.ContentAudit.Configuration;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Services.Discovery;
using Xunit;

namespace Umbraco.Community.ContentAudit.UnitTests.Umbraco.Community.ContentAudit.Services.Discovery;

public class SitemapUrlDiscoveryStrategyTests
{
    private readonly Mock<ISitemapService> _sitemapService = new();
    private readonly Mock<IOptionsMonitor<ContentAuditSettings>> _settings = new();
    private readonly Mock<ILogger<SitemapUrlDiscoveryStrategy>> _logger = new();

    private SitemapUrlDiscoveryStrategy CreateSut(bool useSitemapXml = true)
    {
        _settings.Setup(s => s.CurrentValue).Returns(new ContentAuditSettings
        {
            UseSitemapXml = useSitemapXml
        });

        return new SitemapUrlDiscoveryStrategy(
            _sitemapService.Object,
            _settings.Object,
            _logger.Object);
    }

    [Fact]
    public void ContributesToCrawlQueue_ReturnsTrue()
    {
        IUrlDiscoveryStrategy sut = CreateSut();

        sut.ContributesToCrawlQueue.Should().BeTrue();
    }

    [Fact]
    public async Task DiscoverUrlsAsync_ReturnsUrlsWithoutContentIds()
    {
        _sitemapService.Setup(s => s.GetSitemapUrlAsync("https://example.com/"))
            .ReturnsAsync(new List<string> { "https://example.com/about/", "https://example.com/contact/" });

        var sut = CreateSut();

        var result = (await sut.DiscoverUrlsAsync("https://example.com/")).ToList();

        result.Should().HaveCount(2);
        result.Should().AllSatisfy(url => url.ContentId.Should().BeNull());
    }

    [Fact]
    public async Task DiscoverUrlsAsync_WhenDisabled_ReturnsEmpty()
    {
        var sut = CreateSut(useSitemapXml: false);

        var result = await sut.DiscoverUrlsAsync("https://example.com/");

        result.Should().BeEmpty();
    }
}
