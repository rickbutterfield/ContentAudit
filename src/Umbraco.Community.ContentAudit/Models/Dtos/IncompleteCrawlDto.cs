using System.Text.Json.Serialization;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class IncompleteCrawlDto
    {
        [JsonPropertyName("key")]
        public Guid Key { get; set; }

        [JsonPropertyName("runDate")]
        public DateTime RunDate { get; set; }

        [JsonPropertyName("total")]
        public int Total { get; set; }

        [JsonPropertyName("totalInternal")]
        public int TotalInternal { get; set; }
    }
}
