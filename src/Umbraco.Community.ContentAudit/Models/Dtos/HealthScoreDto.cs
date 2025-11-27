namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    /// <summary>
    /// Data transfer object containing the overall health score and error statistics for an audit.
    /// Provides a summary view of site quality by aggregating error metrics across all audited pages.
    /// </summary>
    public class HealthScoreDto
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="HealthScoreDto"/> class.
        /// </summary>
        public HealthScoreDto() { }

        /// <summary>
        /// Gets or sets the overall health score for the audited site.
        /// Calculated as a percentage (0.0 to 100.0) based on the ratio of pages without errors to total pages audited.
        /// A score of 100.0 indicates all audited pages are error-free; lower scores indicate a higher proportion of pages with audit issues.
        /// </summary>
        public double HealthScore { get; set; }

        /// <summary>
        /// Gets or sets the total number of pages included in the audit.
        /// Represents all unique URLs crawled and analyzed, including those with and without audit issues.
        /// </summary>
        public int TotalPages { get; set; }

        /// <summary>
        /// Gets or sets the number of pages that contain one or more audit errors or warnings.
        /// Used in conjunction with <see cref="TotalPages"/> to calculate the <see cref="HealthScore"/> percentage.
        /// </summary>
        public int PagesWithErrors { get; set; }
    }
}
