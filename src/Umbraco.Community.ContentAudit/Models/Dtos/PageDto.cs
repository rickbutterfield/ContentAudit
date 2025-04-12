using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class PageDto
    {
        public PageDto() { }

        public PageDto(PageSchema schema)
        {
            Id = schema.Id;
            RunId = schema.RunId;
            Url = schema.Url;
            NodeKey = schema.NodeKey;
            StatusCode = schema.StatusCode;
        }

        public int Id { get; set; }
        public int RunId { get; set; }
        public string? Url { get; set; }
        public Guid? NodeKey { get; set; }
        public int StatusCode { get; set; }
    }
}
