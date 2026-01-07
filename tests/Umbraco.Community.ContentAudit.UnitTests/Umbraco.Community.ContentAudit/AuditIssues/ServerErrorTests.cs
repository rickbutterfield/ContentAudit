using FluentAssertions;
using Umbraco.Community.ContentAudit.AuditIssues;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;
using Xunit;

namespace Umbraco.Community.ContentAudit.UnitTests.Umbraco.Community.ContentAudit.AuditIssues;

public class ServerErrorTests
{
    private readonly ServerError _sut = new();

    [Fact]
    public void CheckPages_With500StatusCode_ReturnsPage()
    {
        // Arrange
        var pages = new List<PageAnalysisDto>
        {
            CreatePage(500),
            CreatePage(200),
            CreatePage(404)
        };

        // Act
        var result = _sut.CheckPages(pages);

        // Assert
        result.Should().HaveCount(1);
        result.Single().PageData.StatusCode.Should().Be(500);
    }

    [Fact]
    public void CheckPages_WithNo500Errors_ReturnsEmpty()
    {
        // Arrange
        var pages = new List<PageAnalysisDto>
        {
            CreatePage(200),
            CreatePage(301),
            CreatePage(404)
        };

        // Act
        var result = _sut.CheckPages(pages);

        // Assert
        result.Should().BeEmpty();
    }

    [Fact]
    public void CheckPages_WithMultiple500Errors_ReturnsAll()
    {
        // Arrange
        var pages = new List<PageAnalysisDto>
        {
            CreatePage(500),
            CreatePage(500),
            CreatePage(500)
        };

        // Act
        var result = _sut.CheckPages(pages);

        // Assert
        result.Should().HaveCount(3);
    }

    [Theory]
    [InlineData(501)]
    [InlineData(502)]
    [InlineData(503)]
    public void CheckPages_WithOther5xxErrors_DoesNotReturn(int statusCode)
    {
        // Arrange
        var pages = new List<PageAnalysisDto> { CreatePage(statusCode) };

        // Act
        var result = _sut.CheckPages(pages);

        // Assert
        result.Should().BeEmpty();
    }

    private static PageAnalysisDto CreatePage(int statusCode) => new()
    {
        PageData = new PageDto { StatusCode = statusCode },
        SeoData = new SeoDto()
    };
}
