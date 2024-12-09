using System.Text.Json.Serialization;

namespace Umbraco.Community.ContentAudit.Models
{
    public class PageResponseDto : PageResourceDto
    {
        public string? PageTitle { get; set; }

        [JsonIgnore]
        public string? PageContent { get; set; }

        public Guid? NodeKey { get; set; }

        public List<PageResourceDto> Resources { get; set; } = new List<PageResourceDto>();
    }
}
