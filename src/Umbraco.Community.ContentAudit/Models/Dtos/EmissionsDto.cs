namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    /// <summary>
    /// Data transfer object containing carbon emissions metrics for a page.
    /// Uses the Sustainable Web Design (SWD) v4 methodology to calculate environmental impact,
    /// including operational and embodied carbon emissions across datacenter, network, and user device layers.
    /// </summary>
    public class EmissionsDto
    {
        /// <summary>
        /// Gets or sets the estimated carbon emissions in grams of CO2e per page view.
        /// Calculated using the Sustainable Web Design v4 methodology:
        /// - Operational emissions: energy consumed by datacenter, network, and user device multiplied by grid carbon intensity
        /// - Embodied emissions: manufacturing carbon footprint of hardware distributed across page views
        /// The result represents the total carbon footprint of serving a single page to one user.
        /// </summary>
        public double EmissionsPerPageView { get; set; }

        /// <summary>
        /// Gets or sets the carbon rating for the page's emissions performance.
        /// Ratings are assigned using percentile breakpoints (A through F scale):
        /// - A: Top 10% least carbon-intensive pages
        /// - B: 10-25% percentile
        /// - C: 25-50% percentile
        /// - D: 50-75% percentile
        /// - E: 75-90% percentile
        /// - F: Bottom 10% most carbon-intensive pages
        /// Based on comparison against historical emissions data from the SWD v4 methodology.
        /// </summary>
        public string? CarbonRating { get; set; }
    }
}
