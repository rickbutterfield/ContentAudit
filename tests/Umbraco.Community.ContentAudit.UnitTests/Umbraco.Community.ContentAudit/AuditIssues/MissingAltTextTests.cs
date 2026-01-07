using FluentAssertions;
using Umbraco.Community.ContentAudit.AuditIssues;
using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;
using Xunit;

namespace Umbraco.Community.ContentAudit.UnitTests.Umbraco.Community.ContentAudit.AuditIssues;

public class MissingAltTextTests
{
    private readonly MissingAltText _sut = new();

    [Fact]
    public void CheckImages_WithMissingAltText_ReturnsImagesWithoutAlt()
    {
        // Arrange
        var images = new List<ImageDto>
        {
            new() { AltText = "", IsBackground = false },
            new() { AltText = "Valid description", IsBackground = false },
            new() { AltText = null, IsBackground = false }
        };

        // Act
        var result = _sut.CheckImages(images, Enumerable.Empty<PageAnalysisDto>());

        // Assert
        result.Should().HaveCount(2);
        result.Should().OnlyContain(x => string.IsNullOrEmpty(x.AltText));
    }

    [Fact]
    public void CheckImages_WithBackgroundImages_ExcludesBackgroundImages()
    {
        // Arrange
        var images = new List<ImageDto>
        {
            new() { AltText = "", IsBackground = true },
            new() { AltText = "", IsBackground = false }
        };

        // Act
        var result = _sut.CheckImages(images, Enumerable.Empty<PageAnalysisDto>());

        // Assert
        result.Should().HaveCount(1);
        result.Single().IsBackground.Should().BeFalse();
    }

    [Fact]
    public void CheckImages_WhenAllImagesHaveAltText_ReturnsEmpty()
    {
        // Arrange
        var images = new List<ImageDto>
        {
            new() { AltText = "Description 1", IsBackground = false },
            new() { AltText = "Description 2", IsBackground = false }
        };

        // Act
        var result = _sut.CheckImages(images, Enumerable.Empty<PageAnalysisDto>());

        // Assert
        result.Should().BeEmpty();
    }

    [Fact]
    public void CheckImages_WithEmptyCollection_ReturnsEmpty()
    {
        // Arrange
        var images = Enumerable.Empty<ImageDto>();

        // Act
        var result = _sut.CheckImages(images, Enumerable.Empty<PageAnalysisDto>());

        // Assert
        result.Should().BeEmpty();
    }
}
