using System.Text.Json.Serialization;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models
{
    public class AuditOverviewDto
    {
        public AuditOverviewDto() { }

        public AuditOverviewDto(OverviewSchema schema)
        {
            RunDate = schema.RunDate;
            TotalPages = schema.TotalUrls;
            TotalPagesCrawled = schema.TotalUrlsCrawled;
            TotalPagesBlocked = schema.TotalBlockedUrls;
        }

        [JsonPropertyName("runDate")]
        public DateTime? RunDate { get; set; }
        
        [JsonPropertyName("totalPages")]
        public int? TotalPages { get; set; }
        
        [JsonPropertyName("totalPagesCrawled")]
        public int? TotalPagesCrawled { get; set; }
        
        [JsonPropertyName("totalPagesBlocked")]
        public int? TotalPagesBlocked { get; set; }
    }
}
