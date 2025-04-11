using Umbraco.Community.ContentAudit.Models.Emissions;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface IEmissionsService
    {
        EnergyPerSegment OperationalEnergyPerSegment(double bytes);

        EnergyPerSegment OperationalEmissions(double bytes);

        EnergyPerSegment EmbodiedEnergyPerSegment(double bytes);

        EnergyPerSegment EmbodiedEmissions(double bytes);

        EmissionResult PerByte(double bytes, bool green = false, bool segmented = false, bool ratingResults = false);

        EmissionResult PerVisit(double bytes, bool green = false, bool segmented = false, bool ratingResults = false);

        string RatingScale(double co2e);
    }
}
