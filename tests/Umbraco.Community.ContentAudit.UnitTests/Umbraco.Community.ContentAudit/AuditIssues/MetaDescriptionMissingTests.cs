using FluentAssertions;
using Umbraco.Community.ContentAudit.AuditIssues;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;
using Xunit;

namespace Umbraco.Community.ContentAudit.UnitTests.Umbraco.Community.ContentAudit.AuditIssues;

public class MetaDescriptionMissingTests
{
    private readonly MetaDescriptionMissing _sut = new();

    [Fact]
    public void CheckPages_WithMissingMetaDescription_ReturnsPages()
    {
        // Arrange
        var pages = new List<PageAnalysisDto>
        {
            CreatePage(statusCode: 200, metaDescription: ""),
            CreatePage(statusCode: 200, metaDescription: "Valid description"),
            CreatePage(statusCode: 200, metaDescription: null)
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
            CreatePage(statusCode: 404, metaDescription: ""),
            CreatePage(statusCode: 500, metaDescription: ""),
            CreatePage(statusCode: 200, metaDescription: "")
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
            CreatePage(statusCode: 200, metaDescription: "")
        };

        // Act
        var result = _sut.CheckPages(pages);

        // Assert
        result.Should().HaveCount(1);
    }

    [Fact]
    public void CheckPages_WhenAllPagesHaveMetaDescription_ReturnsEmpty()
    {
        // Arrange
        var pages = new List<PageAnalysisDto>
        {
            CreatePage(statusCode: 200, metaDescription: "Description 1"),
            CreatePage(statusCode: 200, metaDescription: "Description 2")
        };

        // Act
        var result = _sut.CheckPages(pages);

        // Assert
        result.Should().BeEmpty();
    }

    [Fact]
    public void CheckPages_WithEmptyCollection_ReturnsEmpty()
    {
        // Arrange
        var pages = Enumerable.Empty<PageAnalysisDto>();

        // Act
        var result = _sut.CheckPages(pages);

        // Assert
        result.Should().BeEmpty();
    }

    private static PageAnalysisDto CreatePage(int statusCode, string? metaDescription)
    {
        return new PageAnalysisDto
        {
            PageData = new PageDto { StatusCode = statusCode },
            SeoData = new SeoDto { MetaDescription = metaDescription }
        };
    }
}
