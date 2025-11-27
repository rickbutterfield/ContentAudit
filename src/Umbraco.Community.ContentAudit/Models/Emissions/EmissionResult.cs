namespace Umbraco.Community.ContentAudit.Models.Emissions
{
    /// <summary>
    /// Represents the comprehensive carbon emissions data calculated for a web page using the Sustainable Web Design v4 methodology.
    /// </summary>
    /// <remarks>
    /// This model aggregates emissions across different segments (data center, network, consumer device) and energy types (operational and embodied),
    /// providing a complete picture of a page's environmental impact. The calculations follow the Sustainable Web Design v4 methodology
    /// which allocates energy and emissions based on data transfer volume and segment-specific energy intensities.
    /// </remarks>
    public class EmissionResult
    {
        /// <summary>
        /// Gets or sets the carbon dioxide equivalent (gCO2e) from operational energy consumed by the data center when serving this page.
        /// </summary>
        public double? DataCenterOperationalCO2e { get; set; }

        /// <summary>
        /// Gets or sets the carbon dioxide equivalent (gCO2e) from operational energy consumed by the network infrastructure when transferring this page's data.
        /// </summary>
        public double? NetworkOperationalCO2e { get; set; }

        /// <summary>
        /// Gets or sets the carbon dioxide equivalent (gCO2e) from operational energy consumed by the consumer device when rendering and displaying this page.
        /// </summary>
        public double? ConsumerDeviceOperationalCO2e { get; set; }

        /// <summary>
        /// Gets or sets the carbon dioxide equivalent (gCO2e) from embodied energy (manufacturing) allocated to the data center hardware used to serve this page.
        /// </summary>
        public double? DataCenterEmbodiedCO2e { get; set; }

        /// <summary>
        /// Gets or sets the carbon dioxide equivalent (gCO2e) from embodied energy (manufacturing) allocated to the network equipment used to transfer this page's data.
        /// </summary>
        public double? NetworkEmbodiedCO2e { get; set; }

        /// <summary>
        /// Gets or sets the carbon dioxide equivalent (gCO2e) from embodied energy (manufacturing) allocated to the consumer device used to view this page.
        /// </summary>
        public double? ConsumerDeviceEmbodiedCO2e { get; set; }

        /// <summary>
        /// Gets or sets the total embodied carbon dioxide equivalent (gCO2e) across all segments (data center, network, and consumer device).
        /// </summary>
        /// <remarks>
        /// This is the sum of DataCenterEmbodiedCO2e, NetworkEmbodiedCO2e, and ConsumerDeviceEmbodiedCO2e.
        /// </remarks>
        public double? TotalEmbodiedCO2e { get; set; }

        /// <summary>
        /// Gets or sets the total operational carbon dioxide equivalent (gCO2e) across all segments (data center, network, and consumer device).
        /// </summary>
        /// <remarks>
        /// This is the sum of DataCenterOperationalCO2e, NetworkOperationalCO2e, and ConsumerDeviceOperationalCO2e.
        /// </remarks>
        public double? TotalOperationalCO2e { get; set; }

        /// <summary>
        /// Gets or sets the combined carbon dioxide equivalent (gCO2e) for the data center segment, including both operational and embodied emissions.
        /// </summary>
        /// <remarks>
        /// This is the sum of DataCenterOperationalCO2e and DataCenterEmbodiedCO2e.
        /// </remarks>
        public double? DataCenterCO2e { get; set; }

        /// <summary>
        /// Gets or sets the combined carbon dioxide equivalent (gCO2e) for the network segment, including both operational and embodied emissions.
        /// </summary>
        /// <remarks>
        /// This is the sum of NetworkOperationalCO2e and NetworkEmbodiedCO2e.
        /// </remarks>
        public double? NetworkCO2e { get; set; }

        /// <summary>
        /// Gets or sets the combined carbon dioxide equivalent (gCO2e) for the consumer device segment, including both operational and embodied emissions.
        /// </summary>
        /// <remarks>
        /// This is the sum of ConsumerDeviceOperationalCO2e and ConsumerDeviceEmbodiedCO2e.
        /// </remarks>
        public double? ConsumerDeviceCO2e { get; set; }

        /// <summary>
        /// Gets or sets the total carbon dioxide equivalent (gCO2e) for this page across all segments and energy types.
        /// </summary>
        /// <remarks>
        /// This is the sum of all emissions: TotalOperationalCO2e + TotalEmbodiedCO2e.
        /// This value represents the complete environmental impact of loading and using this web page.
        /// </remarks>
        public double? Total { get; set; }

        /// <summary>
        /// Gets or sets the sustainability rating for the page based on its total emissions.
        /// </summary>
        /// <remarks>
        /// The rating uses a percentile-based A-F grading system as defined in the Sustainable Web Design v4 methodology.
        /// Possible values include: "A" (best), "B", "C", "D", "E", "F" (worst).
        /// The rating is determined by comparing the page's total emissions against percentile thresholds.
        /// </remarks>
        public string? Rating { get; set; }

        /// <summary>
        /// Gets or sets the carbon dioxide equivalent (gCO2e) for a first-time visitor accessing this page.
        /// </summary>
        /// <remarks>
        /// A first-time visitor's emissions include data center embodied energy allocation since it counts toward server infrastructure overhead.
        /// </remarks>
        public double? FirstVisitCO2e { get; set; }

        /// <summary>
        /// Gets or sets the carbon dioxide equivalent (gCO2e) for a return visitor accessing this page.
        /// </summary>
        /// <remarks>
        /// A return visitor's emissions may differ from a first-time visitor as it excludes or reduces the allocation of data center embodied energy.
        /// </remarks>
        public double? ReturnVisitCO2e { get; set; }
    }

}
