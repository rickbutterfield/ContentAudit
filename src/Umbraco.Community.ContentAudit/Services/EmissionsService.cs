using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Emissions;

namespace Umbraco.Community.ContentAudit.Services
{
    public class EmissionsService : IEmissionsService
    {
        public EmissionsService() { }

        /// <summary>
        /// Calculate the operational energy of data transfer for each system segment
        /// </summary>
        /// <param name="bytes">Number of bytes</param>
        /// <returns>Energy per segment</returns>
        public EnergyPerSegment OperationalEnergyPerSegment(double bytes)
        {
            double transferedBytesToGb = bytes / 1_000_000_000;
            double dataCenter = transferedBytesToGb * Constants.Emissions.SWDV4.OPERATIONAL_KWH_PER_GB_DATACENTER;
            double network = transferedBytesToGb * Constants.Emissions.SWDV4.OPERATIONAL_KWH_PER_GB_NETWORK;
            double device = transferedBytesToGb * Constants.Emissions.SWDV4.OPERATIONAL_KWH_PER_GB_DEVICE;

            return new EnergyPerSegment
            {
                DataCenter = dataCenter,
                Network = network,
                Device = device
            };
        }

        /// <summary>
        /// Calculate the operational emissions of data transfer for each system segment
        /// </summary>
        /// <param name="bytes">Number of bytes</param>
        /// <returns>Emissions per segment</returns>
        public EnergyPerSegment OperationalEmissions(double bytes)
        {
            var energyPerSegment = OperationalEnergyPerSegment(bytes);

            double dataCenterGridIntensity = Constants.Emissions.SWDV4.GLOBAL_GRID_INTENSITY;
            double networkGridIntensity = Constants.Emissions.SWDV4.GLOBAL_GRID_INTENSITY;
            double deviceGridIntensity = Constants.Emissions.SWDV4.GLOBAL_GRID_INTENSITY;

            double dataCenterEmissions = energyPerSegment.DataCenter * dataCenterGridIntensity;
            double networkEmissions = energyPerSegment.Network * networkGridIntensity;
            double deviceEmissions = energyPerSegment.Device * deviceGridIntensity;

            return new EnergyPerSegment
            {
                DataCenter = dataCenterEmissions,
                Network = networkEmissions,
                Device = deviceEmissions
            };
        }

        /// <summary>
        /// Calculate the embodied energy of data transfer for each system segment
        /// </summary>
        /// <param name="bytes">Number of bytes</param>
        /// <returns>Energy per segment</returns>
        public EnergyPerSegment EmbodiedEnergyPerSegment(double bytes)
        {
            double transferedBytesToGb = (double)bytes / 1_000_000_000;
            double dataCenter = transferedBytesToGb * Constants.Emissions.SWDV4.EMBODIED_KWH_PER_GB_DATACENTER;
            double network = transferedBytesToGb * Constants.Emissions.SWDV4.EMBODIED_KWH_PER_GB_NETWORK;
            double device = transferedBytesToGb * Constants.Emissions.SWDV4.EMBODIED_KWH_PER_GB_DEVICE;

            return new EnergyPerSegment
            {
                DataCenter = dataCenter,
                Network = network,
                Device = device
            };
        }

        /// <summary>
        /// Calculate the embodied emissions of data transfer for each system segment
        /// </summary>
        /// <param name="bytes">Number of bytes</param>
        /// <returns>Emissions per segment</returns>
        public EnergyPerSegment EmbodiedEmissions(double bytes)
        {
            var energyPerSegment = EmbodiedEnergyPerSegment(bytes);

            // NOTE: Per the guidance in the SWDM v4, the grid intensity values for embodied emissions are fixed to the global grid intensity.
            double dataCenterGridIntensity = Constants.Emissions.SWDV4.GLOBAL_GRID_INTENSITY;
            double networkGridIntensity = Constants.Emissions.SWDV4.GLOBAL_GRID_INTENSITY;
            double deviceGridIntensity = Constants.Emissions.SWDV4.GLOBAL_GRID_INTENSITY;

            double dataCenterEmissions = energyPerSegment.DataCenter * dataCenterGridIntensity;
            double networkEmissions = energyPerSegment.Network * networkGridIntensity;
            double deviceEmissions = energyPerSegment.Device * deviceGridIntensity;

            return new EnergyPerSegment
            {
                DataCenter = dataCenterEmissions,
                Network = networkEmissions,
                Device = deviceEmissions
            };
        }

        /// <summary>
        /// Determine the green hosting factor
        /// </summary>
        /// <param name="green">Whether green hosting is used</param>
        /// <returns>Green hosting factor</returns>
        private double GetGreenHostingFactor(bool green)
        {
            if (green)
            {
                return 1.0;
            }
            return 0;
        }

        /// <summary>
        /// Output the CO2e emissions for each system segment
        /// </summary>
        /// <param name="operationalEmissions">Operational emissions</param>
        /// <param name="embodiedEmissions">Embodied emissions</param>
        /// <returns>Detailed emissions result</returns>
        private EmissionResult OutputSegments(EnergyPerSegment operationalEmissions, EnergyPerSegment embodiedEmissions)
        {
            double totalOperationalCO2e =
                operationalEmissions.DataCenter +
                operationalEmissions.Network +
                operationalEmissions.Device;

            double totalEmbodiedCO2e =
                embodiedEmissions.DataCenter +
                embodiedEmissions.Network +
                embodiedEmissions.Device;

            double dataCenterCO2e =
                operationalEmissions.DataCenter + embodiedEmissions.DataCenter;
            double networkCO2e = operationalEmissions.Network + embodiedEmissions.Network;
            double consumerDeviceCO2e =
                operationalEmissions.Device + embodiedEmissions.Device;

            return new EmissionResult
            {
                DataCenterOperationalCO2e = operationalEmissions.DataCenter,
                NetworkOperationalCO2e = operationalEmissions.Network,
                ConsumerDeviceOperationalCO2e = operationalEmissions.Device,
                DataCenterEmbodiedCO2e = embodiedEmissions.DataCenter,
                NetworkEmbodiedCO2e = embodiedEmissions.Network,
                ConsumerDeviceEmbodiedCO2e = embodiedEmissions.Device,
                TotalEmbodiedCO2e = totalEmbodiedCO2e,
                TotalOperationalCO2e = totalOperationalCO2e,
                DataCenterCO2e = dataCenterCO2e,
                NetworkCO2e = networkCO2e,
                ConsumerDeviceCO2e = consumerDeviceCO2e
            };
        }

        /// <summary>
        /// Calculate CO2e emissions per byte
        /// </summary>
        /// <param name="bytes">Number of bytes</param>
        /// <param name="green">Whether green hosting is used</param>
        /// <param name="segmented">Whether to return detailed segment information</param>
        /// <param name="ratingResults">Whether to include rating information</param>
        /// <returns>Emissions result</returns>
        public EmissionResult PerByte(
            double bytes,
            bool green = false,
            bool segmented = false,
            bool ratingResults = false)
        {
            if (bytes < 1)
                return new();

            var operationalEmissions = OperationalEmissions(bytes);
            var embodiedEmissions = EmbodiedEmissions(bytes);
            double greenHostingFactor = GetGreenHostingFactor(green);

            var totalEmissions = new EnergyPerSegment
            {
                DataCenter = operationalEmissions.DataCenter * (1 - greenHostingFactor) + embodiedEmissions.DataCenter,
                Network = operationalEmissions.Network + embodiedEmissions.Network,
                Device = operationalEmissions.Device + embodiedEmissions.Device
            };

            double total =
                totalEmissions.DataCenter +
                totalEmissions.Network +
                totalEmissions.Device;

            string? rating = null;
            if (ratingResults)
                rating = RatingScale(total);

            if (segmented)
            {
                var segments = OutputSegments(operationalEmissions, embodiedEmissions);
                segments.Total = total;

                if (ratingResults)
                {
                    segments.Rating = rating;
                    return segments;
                }
                return segments;
            }

            return new EmissionResult
            {
                DataCenterOperationalCO2e = operationalEmissions.DataCenter,
                NetworkOperationalCO2e = operationalEmissions.Network,
                ConsumerDeviceOperationalCO2e = operationalEmissions.Device,
                DataCenterEmbodiedCO2e = embodiedEmissions.DataCenter,
                NetworkEmbodiedCO2e = embodiedEmissions.Network,
                ConsumerDeviceEmbodiedCO2e = embodiedEmissions.Device,
                TotalOperationalCO2e = totalEmissions.DataCenter + totalEmissions.Network + totalEmissions.Device,
                TotalEmbodiedCO2e = embodiedEmissions.DataCenter + embodiedEmissions.Network + embodiedEmissions.Device,
                Total = total,
                Rating = rating
            };
        }

        /// <summary>
        /// Calculate CO2e emissions per visit
        /// </summary>
        /// <param name="bytes">Number of bytes</param>
        /// <param name="green">Whether green hosting is used</param>
        /// <param name="segmented">Whether to return detailed segment information</param>
        /// <param name="ratingResults">Whether to include rating information</param>
        /// <returns>Emissions result</returns>
        public EmissionResult PerVisit(
            double bytes,
            bool green = false,
            bool segmented = false,
            bool ratingResults = false)
        {
            double firstViewRatio = 1;
            double returnViewRatio = 0;
            double dataReloadRatio = 0;
            double greenHostingFactor = GetGreenHostingFactor(green);
            var operationalEmissions = OperationalEmissions(bytes);
            var embodiedEmissions = EmbodiedEmissions(bytes);

            if (bytes < 1)
                return new();

            // NOTE: First visit emissions are calculated as the sum of all three segments without any caching.
            double firstVisitEmissions =
                operationalEmissions.DataCenter * (1 - greenHostingFactor) +
                embodiedEmissions.DataCenter +
                operationalEmissions.Network +
                embodiedEmissions.Network +
                operationalEmissions.Device +
                embodiedEmissions.Device;

            // NOTE: Return visit emissions are calculated as the sum of all three segments with caching applied.
            double returnVisitEmissions =
                (operationalEmissions.DataCenter * (1 - greenHostingFactor) +
                embodiedEmissions.DataCenter +
                operationalEmissions.Network +
                embodiedEmissions.Network +
                operationalEmissions.Device +
                embodiedEmissions.Device) *
                (1 - dataReloadRatio);

            // NOTE: The total emissions account for the percentage of first and return visits.
            double total =
                firstVisitEmissions * firstViewRatio +
                returnVisitEmissions * returnViewRatio;

            string? rating = null;
            if (ratingResults)
                rating = RatingScale(total);

            if (segmented)
            {
                var segments = OutputSegments(operationalEmissions, embodiedEmissions);
                segments.FirstVisitCO2e = firstVisitEmissions;
                segments.ReturnVisitCO2e = returnVisitEmissions;
                segments.Total = total;

                if (ratingResults)
                {
                    segments.Rating = rating;
                    return segments;
                }

                return segments;
            }

            return new EmissionResult
            {
                DataCenterOperationalCO2e = operationalEmissions.DataCenter,
                NetworkOperationalCO2e = operationalEmissions.Network,
                ConsumerDeviceOperationalCO2e = operationalEmissions.Device,
                DataCenterEmbodiedCO2e = embodiedEmissions.DataCenter,
                NetworkEmbodiedCO2e = embodiedEmissions.Network,
                ConsumerDeviceEmbodiedCO2e = embodiedEmissions.Device,
                TotalEmbodiedCO2e = embodiedEmissions.DataCenter + embodiedEmissions.Network + embodiedEmissions.Device,
                Total = total,
                Rating = rating
            };
        }

        /// <summary>
        /// Determines the rating of a website's sustainability based on its CO2 emissions.
        /// </summary>
        /// <param name="co2e">The CO2 emissions of the website in grams.</param>
        /// <returns>The sustainability rating, ranging from "A+" (best) to "F" (worst).</returns>
        public string RatingScale(double co2e) => OutputRating(co2e);

        /// <summary>
        /// Helper method to determine the rating based on CO2e and version
        /// </summary>
        /// <param name="co2e">CO2 emissions</param>
        /// <param name="version">SWDM version</param>
        /// <returns>Rating from A+ to F</returns>
        private string OutputRating(double co2e)
        {
            if (co2e <= Constants.Emissions.SWDV4.Ratings.FIFTH_PERCENTILE)
                return "A+";
            if (co2e <= Constants.Emissions.SWDV4.Ratings.TENTH_PERCENTILE)
                return "A";
            if (co2e <= Constants.Emissions.SWDV4.Ratings.TWENTIETH_PERCENTILE)
                return "B";
            if (co2e <= Constants.Emissions.SWDV4.Ratings.THIRTIETH_PERCENTILE)
                return "C";
            if (co2e <= Constants.Emissions.SWDV4.Ratings.FORTIETH_PERCENTILE)
                return "D";
            if (co2e <= Constants.Emissions.SWDV4.Ratings.FIFTIETH_PERCENTILE)
                return "E";
            return "F";
        }
    }
}
