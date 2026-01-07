using FluentAssertions;
using Umbraco.Community.ContentAudit.AuditIssues;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;
using Xunit;

namespace Umbraco.Community.ContentAudit.UnitTests.Umbraco.Community.ContentAudit.AuditIssues;

public class MissingH1Tests
{
    private readonly MissingH1 _sut = new();

    [Fact]
    public void CheckPages_WithMissingH1_ReturnsPage()
    {
        // Arrange
        var pages = new List<PageAnalysisDto>
        {
            CreatePage(statusCode: 200, h1: ""),
            CreatePage(statusCode: 200, h1: "Valid H1"),
            CreatePage(statusCode: 200, h1: null)
        };

        // Act
        var result = _sut.CheckPages(pages);

        // Assert
        result.Should().HaveCount(2);
    }

    [Fact]
    public void CheckPages_WithNon200StatusCode_ExcludesPage()
    {
        // Arrange
        var pages = new List<PageAnalysisDto>
        {
            CreatePage(statusCode: 404, h1: ""),
            CreatePage(statusCode: 500, h1: ""),
            CreatePage(statusCode: 200, h1: "")
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
            CreatePage(statusCode: 200, h1: "")
        };

        // Act
        var result = _sut.CheckPages(pages);

        // Assert
        result.Should().HaveCount(1);
    }

    [Fact]
    public void CheckPages_WhenAllPagesHaveH1_ReturnsEmpty()
    {
        // Arrange
        var pages = new List<PageAnalysisDto>
        {
            CreatePage(statusCode: 200, h1: "Welcome to our site"),
            CreatePage(statusCode: 200, h1: "About Us")
        };

        // Act
        var result = _sut.CheckPages(pages);

        // Assert
        result.Should().BeEmpty();
    }

    [Fact]
    public void CheckPages_WithWhitespaceH1_TreatsAsValid()
    {
        // Arrange - whitespace is not empty, so it's technically present
        var pages = new List<PageAnalysisDto>
        {
            CreatePage(statusCode: 200, h1: "   ")
        };

        // Act
        var result = _sut.CheckPages(pages);

        // Assert
        result.Should().BeEmpty();
    }

    private static PageAnalysisDto CreatePage(int statusCode, string? h1) => new()
    {
        PageData = new PageDto { StatusCode = statusCode },
        SeoData = new SeoDto { H1 = h1 }
    };
}
