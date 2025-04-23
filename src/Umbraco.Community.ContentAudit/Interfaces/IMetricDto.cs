using Umbraco.Community.ContentAudit.Enums;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    /// <summary>
    /// Represents a web performance metric.
    /// </summary>
    public interface IMetricDto
    {
        /// <summary>
        /// The name of the metric (in acronym form).
        /// </summary>
        MetricName Name { get; set; }

        /// <summary>
        /// The current value of the metric.
        /// </summary>
        double Value { get; set; }

        /// <summary>
        /// The rating as to whether the metric value is within the "good",
        /// "needs improvement", or "poor" thresholds of the metric.
        /// </summary>
        MetricRating Rating { get; set; }
    }
}
