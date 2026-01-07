using FluentAssertions;
using Umbraco.Community.ContentAudit.AuditIssues;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;
using Xunit;

namespace Umbraco.Community.ContentAudit.UnitTests.Umbraco.Community.ContentAudit.AuditIssues;

public class OrphanedTests
{
    private readonly Orphaned _sut = new();

    [Fact]
    public void CheckPages_WithOrphanedPage_ReturnsPage()
    {
        // Arrange
        var pages = new List<PageAnalysisDto>
        {
            CreatePage(statusCode: 200, isOrphaned: true),
            CreatePage(statusCode: 200, isOrphaned: false)
        };

        // Act
        var result = _sut.CheckPages(pages);

        // Assert
        result.Should().HaveCount(1);
        result.Single().SeoData.IsOrphaned.Should().BeTrue();
    }

    [Fact]
    public void CheckPages_WithNon200StatusCode_ExcludesPage()
    {
        // Arrange
        var pages = new List<PageAnalysisDto>
        {
            CreatePage(statusCode: 404, isOrphaned: true),
            CreatePage(statusCode: 500, isOrphaned: true),
            CreatePage(statusCode: 200, isOrphaned: true)
        };

        // Act
        var result = _sut.CheckPages(pages);

        // Assert
        result.Should().HaveCount(1);
        result.Single().PageData.StatusCode.Should().Be(200);
    }

    [Fact]
    public void CheckPages_WithNoOrphanedPages_ReturnsEmpty()
    {
        // Arrange
        var pages = new List<PageAnalysisDto>
        {
            CreatePage(statusCode: 200, isOrphaned: false),
            CreatePage(statusCode: 200, isOrphaned: false)
        };

        // Act
        var result = _sut.CheckPages(pages);

        // Assert
        result.Should().BeEmpty();
    }

    [Fact]
    public void CheckPages_WithEmptyCollection_ReturnsEmpty()
    {
        // Act
        var result = _sut.CheckPages(Enumerable.Empty<PageAnalysisDto>());

        // Assert
        result.Should().BeEmpty();
    }

    private static PageAnalysisDto CreatePage(int statusCode, bool isOrphaned) => new()
    {
        PageData = new PageDto { StatusCode = statusCode },
        SeoData = new SeoDto { IsOrphaned = isOrphaned }
    };
}
