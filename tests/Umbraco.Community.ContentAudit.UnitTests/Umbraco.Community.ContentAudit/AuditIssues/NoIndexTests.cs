using FluentAssertions;
using Umbraco.Community.ContentAudit.AuditIssues;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;
using Xunit;

namespace Umbraco.Community.ContentAudit.UnitTests.Umbraco.Community.ContentAudit.AuditIssues;

public class NoIndexTests
{
    private readonly NoIndex _sut = new();

    [Fact]
    public void CheckPages_WithNoIndex_ReturnsPage()
    {
        // Arrange
        var pages = new List<PageAnalysisDto>
        {
            CreatePage(statusCode: 200, hasNoIndex: true),
            CreatePage(statusCode: 200, hasNoIndex: false)
        };

        // Act
        var result = _sut.CheckPages(pages);

        // Assert
        result.Should().HaveCount(1);
        result.Single().SeoData!.HasNoIndex.Should().BeTrue();
    }

    [Fact]
    public void CheckPages_WithNon200StatusCode_ExcludesPage()
    {
        // Arrange
        var pages = new List<PageAnalysisDto>
        {
            CreatePage(statusCode: 404, hasNoIndex: true),
            CreatePage(statusCode: 200, hasNoIndex: true)
        };

        // Act
        var result = _sut.CheckPages(pages);

        // Assert
        result.Should().HaveCount(1);
        result.Single().PageData.StatusCode.Should().Be(200);
    }

    [Fact]
    public void CheckPages_WithNullSeoData_ExcludesPage()
    {
        // Arrange
        var pages = new List<PageAnalysisDto>
        {
            new()
            {
                PageData = new PageDto { StatusCode = 200 },
                SeoData = null!
            },
            CreatePage(statusCode: 200, hasNoIndex: true)
        };

        // Act
        var result = _sut.CheckPages(pages);

        // Assert
        result.Should().HaveCount(1);
    }

    [Fact]
    public void CheckPages_WithNoNoIndexPages_ReturnsEmpty()
    {
        // Arrange
        var pages = new List<PageAnalysisDto>
        {
            CreatePage(statusCode: 200, hasNoIndex: false),
            CreatePage(statusCode: 200, hasNoIndex: false)
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

    private static PageAnalysisDto CreatePage(int statusCode, bool hasNoIndex) => new()
    {
        PageData = new PageDto { StatusCode = statusCode },
        SeoData = new SeoDto { HasNoIndex = hasNoIndex }
    };
}
