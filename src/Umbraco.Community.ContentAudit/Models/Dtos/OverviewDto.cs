using System.Text.Json.Serialization;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class OverviewDto
    {
        public OverviewDto() { }

        public OverviewDto(OverviewSchema schema)
        {
            RunDate = schema.RunDate;
            Total = schema.Total;
            TotalInternal = schema.TotalInternal;
            TotalExternal = schema.TotalExternal;
            TotalAssets = schema.TotalAssets;
            TotalBlocked = schema.TotalBlocked;
        }

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
    }
}
