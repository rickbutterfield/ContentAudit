using System.Text.Json.Serialization;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models
{
    public class OverviewDto
    {
        public OverviewDto() { }

        public OverviewDto(OverviewSchema schema)
        {
            RunDate = schema.RunDate;
            TotalUrls = schema.TotalUrls;
            TotalPagesCrawled = schema.TotalPagesCrawled;
            TotalAssetsCrawled = schema.TotalAssetsCrawled;
            TotalPagesBlocked = schema.TotalBlockedUrls;
        }

        [JsonPropertyName("runDate")]
        public DateTime? RunDate { get; set; }
        
        [JsonPropertyName("totalUrls")]
        public int? TotalUrls { get; set; }
        
        [JsonPropertyName("totalPagesCrawled")]
        public int? TotalPagesCrawled { get; set; }

        [JsonPropertyName("totalAssetsCrawled")]
        public int? TotalAssetsCrawled { get; set; }

        [JsonPropertyName("totalPagesBlocked")]
        public int? TotalPagesBlocked { get; set; }
    }
}
