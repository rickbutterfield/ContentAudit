using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace Umbraco.Community.ContentAudit.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class SocialMediaSchema
    {
        public const string TableName = "umbContentAuditSocialMedia";

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

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
} 