namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class PageDataDto
    {
        public string? Url { get; set; }
        public Guid NodeKey { get; set; }
        public int StatusCode { get; set; }
        public List<ResourceDto> Links { get; set; } = new List<ResourceDto>();
        public List<ResourceDto> Resources { get; set; } = new List<ResourceDto>();
        public List<ImageDto> Images { get; set; } = new List<ImageDto>();
    }
}
