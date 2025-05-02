using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class PageDto : BaseContentAuditDto
    {
        public PageDto() { }

        public PageDto(PageSchema schema)
        {
            Id = schema.Id;
            RunId = schema.RunId;
            Url = schema.Url;
            RedirectUrl = schema.RedirectUrl;   
            Redirect = schema.Redirect;
            Unique = schema.Unique;
            StatusCode = schema.StatusCode;
        }

        public int Id { get; set; }
        public int RunId { get; set; }
        public string? Url { get; set; }
        public bool Redirect { get; set; }
        public string? RedirectUrl { get; set; }
        public Guid Unique { get; set; }
        public int StatusCode { get; set; }
    }
}
