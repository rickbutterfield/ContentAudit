namespace Umbraco.Community.ContentAudit.Models.Emissions
{
    /// <summary>
    /// Represents energy consumption broken down by segment within the carbon emissions calculation process.
    /// </summary>
    /// <remarks>
    /// This model is used in the Sustainable Web Design v4 methodology to allocate and track energy consumption
    /// across the three main segments that contribute to a web page's environmental impact: data center infrastructure,
    /// network transmission, and consumer devices. Energy values are typically measured in kilowatt-hours (kWh).
    /// </remarks>
    public class EnergyPerSegment
    {
        /// <summary>
        /// Gets or sets the energy consumption (in kWh) attributed to the data center infrastructure serving the page.
        /// </summary>
        /// <remarks>
        /// This includes the operational energy consumed by servers and cooling systems at the hosting facility.
        /// The allocation is based on the data transfer volume and data center-specific energy intensity metrics.
        /// </remarks>
        public double DataCenter { get; set; }

        /// <summary>
        /// Gets or sets the energy consumption (in kWh) attributed to network infrastructure transmitting the page's data.
        /// </summary>
        /// <remarks>
        /// This includes the operational energy consumed by routers, switches, and other network equipment
        /// required to transfer the page data across the internet. The allocation is based on data transfer volume
        /// and network-specific energy intensity metrics.
        /// </remarks>
        public double Network { get; set; }

        /// <summary>
        /// Gets or sets the energy consumption (in kWh) attributed to the consumer device rendering and displaying the page.
        /// </summary>
        /// <remarks>
        /// This includes the operational energy consumed by the user's device (computer, mobile phone, tablet, etc.)
        /// while loading, rendering, and displaying the web page. The allocation is based on the device's processing
        /// and display requirements during page interaction.
        /// </remarks>
        public double Device { get; set; }
    }
}
