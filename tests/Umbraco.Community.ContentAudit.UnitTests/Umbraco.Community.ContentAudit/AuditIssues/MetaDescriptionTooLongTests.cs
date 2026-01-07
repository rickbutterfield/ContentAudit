using FluentAssertions;
using Umbraco.Community.ContentAudit.AuditIssues;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;
using Xunit;

namespace Umbraco.Community.ContentAudit.UnitTests.Umbraco.Community.ContentAudit.AuditIssues;

public class MetaDescriptionTooLongTests
{
    private readonly MetaDescription _sut = new();

    [Fact]
    public void CheckPages_WithDescriptionOver160Chars_ReturnsPage()
    {
        // Arrange
        var longDescription = new string('a', 161);
        var pages = new List<PageAnalysisDto>
        {
            CreatePage(statusCode: 200, metaDescription: longDescription),
            CreatePage(statusCode: 200, metaDescription: "Short description")
        };

        // Act
        var result = _sut.CheckPages(pages);

        // Assert
        result.Should().HaveCount(1);
        result.Single().SeoData!.MetaDescription!.Length.Should().BeGreaterThan(160);
    }

    [Fact]
    public void CheckPages_WithDescriptionExactly160Chars_DoesNotReturn()
    {
        // Arrange
        var exactDescription = new string('a', 160);
        var pages = new List<PageAnalysisDto>
        {
            CreatePage(statusCode: 200, metaDescription: exactDescription)
        };

        // Act
        var result = _sut.CheckPages(pages);

        // Assert
        result.Should().BeEmpty();
    }

    [Fact]
    public void CheckPages_WithNon200StatusCode_ExcludesPage()
    {
        // Arrange
        var longDescription = new string('a', 200);
        var pages = new List<PageAnalysisDto>
        {
            CreatePage(statusCode: 404, metaDescription: longDescription),
            CreatePage(statusCode: 200, metaDescription: longDescription)
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
        var longDescription = new string('a', 200);
        var pages = new List<PageAnalysisDto>
        {
            new()
            {
                PageData = new PageDto { StatusCode = 200 },
                SeoData = null!
            },
            CreatePage(statusCode: 200, metaDescription: longDescription)
        };

        // Act
        var result = _sut.CheckPages(pages);

        // Assert
        result.Should().HaveCount(1);
    }

    [Fact]
    public void CheckPages_WithNullMetaDescription_ExcludesPage()
    {
        // Arrange
        var pages = new List<PageAnalysisDto>
        {
            CreatePage(statusCode: 200, metaDescription: null)
        };

        // Act
        var result = _sut.CheckPages(pages);

        // Assert
        result.Should().BeEmpty();
    }

    [Theory]
    [InlineData(159)]
    [InlineData(160)]
    [InlineData(100)]
    [InlineData(1)]
    public void CheckPages_WithDescriptionAtOrUnder160Chars_DoesNotReturn(int length)
    {
        // Arrange
        var description = new string('a', length);
        var pages = new List<PageAnalysisDto>
        {
            CreatePage(statusCode: 200, metaDescription: description)
        };

        // Act
        var result = _sut.CheckPages(pages);

        // Assert
        result.Should().BeEmpty();
    }

    [Theory]
    [InlineData(161)]
    [InlineData(200)]
    [InlineData(500)]
    public void CheckPages_WithDescriptionOver160Chars_Returns(int length)
    {
        // Arrange
        var description = new string('a', length);
        var pages = new List<PageAnalysisDto>
        {
            CreatePage(statusCode: 200, metaDescription: description)
        };

        // Act
        var result = _sut.CheckPages(pages);

        // Assert
        result.Should().HaveCount(1);
    }

    private static PageAnalysisDto CreatePage(int statusCode, string? metaDescription) => new()
    {
        PageData = new PageDto { StatusCode = statusCode },
        SeoData = new SeoDto { MetaDescription = metaDescription }
    };
}
