using NPoco;
using System.Text.Json;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class SocialMediaSchema
    {
        public const string TableName = "umbContentAuditSocialMedia";

        public SocialMediaSchema() { }

        public SocialMediaSchema(SocialMediaDto dto)
        {
            Id = dto.Id;
            RunId = dto.RunId;
            Url = dto.Url;
            SocialShareButtons = JsonSerializer.Serialize(dto.SocialShareButtons);
            HasFacebookPixel = dto.HasFacebookPixel;
            HasTwitterPixel = dto.HasTwitterPixel;
            HasLinkedInPixel = dto.HasLinkedInPixel;
            SocialMediaLinks = JsonSerializer.Serialize(dto.SocialMediaLinks);
        }

        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }

        public int RunId { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public string? Url { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public string? SocialShareButtons { get; set; }

        public bool HasFacebookPixel { get; set; }
        public bool HasTwitterPixel { get; set; }
        public bool HasLinkedInPixel { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public string? SocialMediaLinks { get; set; }

        public DateTime CreatedDate => DateTime.UtcNow;
    }
} 