using System.Text.Json;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class SocialMediaDto
    {
        public SocialMediaDto() { }

        public SocialMediaDto(SocialMediaSchema schema)
        {
            Id = schema.Id;
            RunId = schema.RunId;
            Url = schema.Url;
            SocialShareButtons = JsonSerializer.Deserialize<List<string>>(schema.SocialShareButtons);
            HasFacebookPixel = schema.HasFacebookPixel;
            HasTwitterPixel = schema.HasTwitterPixel;
            HasLinkedInPixel = schema.HasLinkedInPixel;
            SocialMediaLinks = JsonSerializer.Deserialize<List<string>>(schema.SocialMediaLinks);
            CreatedDate = schema.CreatedDate;
        }

        public int Id { get; set; }
        public int RunId { get; set; }
        public string? Url { get; set; }
        public List<string>? SocialShareButtons { get; set; }
        public bool HasFacebookPixel { get; set; }
        public bool HasTwitterPixel { get; set; }
        public bool HasLinkedInPixel { get; set; }
        public List<string>? SocialMediaLinks { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
