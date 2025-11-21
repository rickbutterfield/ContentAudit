using Umbraco.Community.ContentAudit.Models.Emissions;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    /// <summary>
    /// Service for calculating carbon emissions and energy consumption of web pages
    /// </summary>
    public interface IEmissionsService
    {
        /// <summary>
        /// Calculate the operational energy of data transfer for each system segment
        /// </summary>
        /// <param name="bytes">Number of bytes transferred</param>
        /// <returns>Energy consumption per segment</returns>
        EnergyPerSegment OperationalEnergyPerSegment(double bytes);

        /// <summary>
        /// Calculate the operational carbon emissions of data transfer for each system segment
        /// </summary>
        /// <param name="bytes">Number of bytes transferred</param>
        /// <returns>Carbon emissions per segment</returns>
        EnergyPerSegment OperationalEmissions(double bytes);

        /// <summary>
        /// Calculate the embodied energy of data transfer for each system segment
        /// </summary>
        /// <param name="bytes">Number of bytes transferred</param>
        /// <returns>Embodied energy per segment</returns>
        EnergyPerSegment EmbodiedEnergyPerSegment(double bytes);

        /// <summary>
        /// Calculate the embodied carbon emissions of data transfer for each system segment
        /// </summary>
        /// <param name="bytes">Number of bytes transferred</param>
        /// <returns>Embodied emissions per segment</returns>
        EnergyPerSegment EmbodiedEmissions(double bytes);

        /// <summary>
        /// Calculate carbon emissions per byte of data transfer
        /// </summary>
        /// <param name="bytes">Number of bytes transferred</param>
        /// <param name="green">Whether the hosting uses green energy</param>
        /// <param name="segmented">Whether to return segmented results</param>
        /// <param name="ratingResults">Whether to include rating results</param>
        /// <returns>Emission results per byte</returns>
        EmissionResult PerByte(double bytes, bool green = false, bool segmented = false, bool ratingResults = false);

        /// <summary>
        /// Calculate carbon emissions per visit
        /// </summary>
        /// <param name="bytes">Number of bytes transferred</param>
        /// <param name="green">Whether the hosting uses green energy</param>
        /// <param name="segmented">Whether to return segmented results</param>
        /// <param name="ratingResults">Whether to include rating results</param>
        /// <returns>Emission results per visit</returns>
        EmissionResult PerVisit(double bytes, bool green = false, bool segmented = false, bool ratingResults = false);

        /// <summary>
        /// Determines the sustainability rating based on CO2 emissions
        /// </summary>
        /// <param name="co2e">The CO2 emissions in grams</param>
        /// <returns>Sustainability rating from A+ (best) to F (worst)</returns>
        string RatingScale(double co2e);
    }
}
