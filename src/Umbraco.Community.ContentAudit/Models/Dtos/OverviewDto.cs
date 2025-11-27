using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    /// <summary>
    /// Data transfer object representing an overview of a completed content audit run.
    /// </summary>
    public class OverviewDto
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="OverviewDto"/> class.
        /// </summary>
        public OverviewDto() { }

        /// <summary>
        /// Initializes a new instance of the <see cref="OverviewDto"/> class from an <see cref="OverviewSchema"/>.
        /// </summary>
        /// <param name="schema">The overview schema containing the source data.</param>
        public OverviewDto(OverviewSchema schema)
        {
            Id = schema.Id;
            Key = schema.Key;
            RunDate = schema.RunDate;
            Total = schema.Total;
            TotalInternal = schema.TotalInternal;
            TotalExternal = schema.TotalExternal;
            TotalAssets = schema.TotalAssets;
            TotalBlocked = schema.TotalBlocked;
            HealthScore = schema.HealthScore;
        }

        /// <summary>
        /// Gets or sets the internal database identifier for the audit run.
        /// </summary>
        [JsonPropertyName("id")]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the unique key that identifies the audit run.
        /// </summary>
        [JsonPropertyName("key")]
        public Guid Key { get; set; }

        /// <summary>
        /// Gets the unique ID for the field type (required for front-end rendering).
        /// </summary>
        [DataMember(Name = "unique")]
        public Guid Unique => Key;

        /// <summary>
        /// Gets the field type entity type (required for front-end rendering).
        /// </summary>
        [DataMember(Name = "entityType")]
        public string EntityType => "audit";

        /// <summary>
        /// Gets or sets the date and time when the audit run was executed.
        /// </summary>
        [JsonPropertyName("runDate")]
        public DateTime? RunDate { get; set; }

        /// <summary>
        /// Gets or sets the total number of pages discovered during the audit run.
        /// </summary>
        [JsonPropertyName("total")]
        public int? Total { get; set; }

        /// <summary>
        /// Gets or sets the number of internal pages (same domain) discovered during the audit run.
        /// </summary>
        [JsonPropertyName("totalInternal")]
        public int? TotalInternal { get; set; }

        /// <summary>
        /// Gets or sets the number of external pages (different domain) discovered during the audit run.
        /// </summary>
        [JsonPropertyName("totalExternal")]
        public int? TotalExternal { get; set; }

        /// <summary>
        /// Gets or sets the number of assets (images, scripts, stylesheets, etc.) discovered during the audit run.
        /// </summary>
        [JsonPropertyName("totalAssets")]
        public int? TotalAssets { get; set; }

        /// <summary>
        /// Gets or sets the number of pages blocked by robots.txt rules during the audit run.
        /// </summary>
        [JsonPropertyName("totalBlocked")]
        public int? TotalBlocked { get; set; }

        /// <summary>
        /// Gets or sets the overall health score of the site based on audit results (0-100).
        /// </summary>
        [JsonPropertyName("healthScore")]
        public double HealthScore { get; set; }
    }
}
