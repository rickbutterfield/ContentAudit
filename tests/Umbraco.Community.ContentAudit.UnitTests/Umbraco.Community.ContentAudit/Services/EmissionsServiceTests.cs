using FluentAssertions;
using Umbraco.Community.ContentAudit.Services;
using Xunit;

namespace Umbraco.Community.ContentAudit.UnitTests.Umbraco.Community.ContentAudit.Services;

public class EmissionsServiceTests
{
    private readonly EmissionsService _sut = new();

    #region RatingScale Tests

    [Theory]
    [InlineData(0.05, "A+")]
    [InlineData(0.095, "A+")]
    [InlineData(0.096, "A")]
    [InlineData(0.186, "A")]
    [InlineData(0.187, "B")]
    [InlineData(0.341, "B")]
    [InlineData(0.342, "C")]
    [InlineData(0.493, "C")]
    [InlineData(0.494, "D")]
    [InlineData(0.656, "D")]
    [InlineData(0.657, "E")]
    [InlineData(0.846, "E")]
    [InlineData(0.847, "F")]
    [InlineData(1.0, "F")]
    [InlineData(10.0, "F")]
    public void RatingScale_ReturnsCorrectRating(double co2e, string expectedRating)
    {
        // Act
        var result = _sut.RatingScale(co2e);

        // Assert
        result.Should().Be(expectedRating);
    }

    [Fact]
    public void RatingScale_WithZero_ReturnsAPlus()
    {
        // Act
        var result = _sut.RatingScale(0);

        // Assert
        result.Should().Be("A+");
    }

    #endregion

    #region PerByte Tests

    [Fact]
    public void PerByte_WithZeroBytes_ReturnsNullResult()
    {
        // Act
        var result = _sut.PerByte(0);

        // Assert
        result.Total.Should().BeNull();
    }

    [Fact]
    public void PerByte_WithNegativeBytes_ReturnsNullResult()
    {
        // Act
        var result = _sut.PerByte(-100);

        // Assert
        result.Total.Should().BeNull();
    }

    [Fact]
    public void PerByte_WithValidBytes_ReturnsPositiveEmissions()
    {
        // Arrange
        double bytes = 1_000_000; // 1MB

        // Act
        var result = _sut.PerByte(bytes);

        // Assert
        result.Total.Should().NotBeNull();
        result.Total!.Value.Should().BeGreaterThan(0);
    }

    [Fact]
    public void PerByte_WithRatingResults_IncludesRating()
    {
        // Arrange
        double bytes = 1_000_000;

        // Act
        var result = _sut.PerByte(bytes, ratingResults: true);

        // Assert
        result.Rating.Should().NotBeNullOrEmpty();
    }

    [Fact]
    public void PerByte_WithoutRatingResults_RatingIsNull()
    {
        // Arrange
        double bytes = 1_000_000;

        // Act
        var result = _sut.PerByte(bytes, ratingResults: false);

        // Assert
        result.Rating.Should().BeNull();
    }

    [Fact]
    public void PerByte_LargerPageSize_HigherEmissions()
    {
        // Arrange
        double smallPage = 100_000;  // 100KB
        double largePage = 5_000_000; // 5MB

        // Act
        var smallResult = _sut.PerByte(smallPage);
        var largeResult = _sut.PerByte(largePage);

        // Assert
        largeResult.Total.Should().NotBeNull();
        smallResult.Total.Should().NotBeNull();
        largeResult.Total!.Value.Should().BeGreaterThan(smallResult.Total!.Value);
    }

    [Fact]
    public void PerByte_WithGreenHosting_ReducesEmissions()
    {
        // Arrange
        double bytes = 1_000_000;

        // Act
        var standardResult = _sut.PerByte(bytes, green: false);
        var greenResult = _sut.PerByte(bytes, green: true);

        // Assert
        greenResult.Total.Should().NotBeNull();
        standardResult.Total.Should().NotBeNull();
        greenResult.Total!.Value.Should().BeLessThan(standardResult.Total!.Value);
    }

    #endregion

    #region PerVisit Tests

    [Fact]
    public void PerVisit_WithZeroBytes_ReturnsNullResult()
    {
        // Act
        var result = _sut.PerVisit(0);

        // Assert
        result.Total.Should().BeNull();
    }

    [Fact]
    public void PerVisit_WithValidBytes_ReturnsPositiveEmissions()
    {
        // Arrange
        double bytes = 1_000_000;

        // Act
        var result = _sut.PerVisit(bytes);

        // Assert
        result.Total.Should().NotBeNull();
        result.Total!.Value.Should().BeGreaterThan(0);
    }

    [Fact]
    public void PerVisit_WithSegmented_IncludesVisitBreakdown()
    {
        // Arrange
        double bytes = 1_000_000;

        // Act
        var result = _sut.PerVisit(bytes, segmented: true);

        // Assert
        result.FirstVisitCO2e.Should().NotBeNull();
        result.FirstVisitCO2e!.Value.Should().BeGreaterThan(0);
    }

    #endregion

    #region OperationalEnergyPerSegment Tests

    [Fact]
    public void OperationalEnergyPerSegment_ReturnsAllSegments()
    {
        // Arrange
        double bytes = 1_000_000_000; // 1GB

        // Act
        var result = _sut.OperationalEnergyPerSegment(bytes);

        // Assert
        result.DataCenter.Should().BeGreaterThan(0);
        result.Network.Should().BeGreaterThan(0);
        result.Device.Should().BeGreaterThan(0);
    }

    [Fact]
    public void OperationalEnergyPerSegment_ScalesLinearly()
    {
        // Arrange
        double bytes1 = 1_000_000_000;
        double bytes2 = 2_000_000_000;

        // Act
        var result1 = _sut.OperationalEnergyPerSegment(bytes1);
        var result2 = _sut.OperationalEnergyPerSegment(bytes2);

        // Assert
        result2.DataCenter.Should().BeApproximately(result1.DataCenter * 2, 0.0001);
        result2.Network.Should().BeApproximately(result1.Network * 2, 0.0001);
        result2.Device.Should().BeApproximately(result1.Device * 2, 0.0001);
    }

    #endregion

    #region EmbodiedEnergyPerSegment Tests

    [Fact]
    public void EmbodiedEnergyPerSegment_ReturnsAllSegments()
    {
        // Arrange
        double bytes = 1_000_000_000; // 1GB

        // Act
        var result = _sut.EmbodiedEnergyPerSegment(bytes);

        // Assert
        result.DataCenter.Should().BeGreaterThan(0);
        result.Network.Should().BeGreaterThan(0);
        result.Device.Should().BeGreaterThan(0);
    }

    #endregion

    #region Integration / Real-World Scenarios

    [Fact]
    public void PerByte_TypicalWebPage_ReturnsReasonableEmissions()
    {
        // Arrange - typical web page is around 2-3MB
        double typicalPageBytes = 2_500_000;

        // Act
        var result = _sut.PerByte(typicalPageBytes, ratingResults: true);

        // Assert
        result.Total.Should().NotBeNull();
        result.Total!.Value.Should().BeGreaterThan(0);
        result.Rating.Should().NotBeNullOrEmpty();
    }

    [Fact]
    public void PerByte_LightweightPage_GetsGoodRating()
    {
        // Arrange - very lightweight page ~50KB
        double lightweightPageBytes = 50_000;

        // Act
        var result = _sut.PerByte(lightweightPageBytes, ratingResults: true);

        // Assert
        result.Rating.Should().BeOneOf("A+", "A", "B");
    }

    [Fact]
    public void PerByte_HeavyPage_GetsPoorRating()
    {
        // Arrange - heavy page ~10MB
        double heavyPageBytes = 10_000_000;

        // Act
        var result = _sut.PerByte(heavyPageBytes, ratingResults: true);

        // Assert
        result.Rating.Should().BeOneOf("D", "E", "F");
    }

    #endregion
}
