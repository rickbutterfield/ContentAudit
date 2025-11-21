using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class OverviewDto
    {
        public OverviewDto() { }

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

        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("key")]
        public Guid Key { get; set; }

        /// <summary>
        /// Gets the unique ID for the field type (with the field name required for front-end rendering).
        /// </summary>
        [DataMember(Name = "unique")]
        public Guid Unique => Key;

        /// <summary>
        /// Gets the field type entity type (required for front-end rendering).
        /// </summary>
        [DataMember(Name = "entityType")]
        public string EntityType => "audit";

        [JsonPropertyName("runDate")]
        public DateTime? RunDate { get; set; }
        
        [JsonPropertyName("total")]
        public int? Total { get; set; }
        
        [JsonPropertyName("totalInternal")]
        public int? TotalInternal { get; set; }

        [JsonPropertyName("totalExternal")]
        public int? TotalExternal { get; set; }

        [JsonPropertyName("totalAssets")]
        public int? TotalAssets { get; set; }

        [JsonPropertyName("totalBlocked")]
        public int? TotalBlocked { get; set; }

        [JsonPropertyName("healthScore")]
        public double HealthScore { get; set; }
    }
}
