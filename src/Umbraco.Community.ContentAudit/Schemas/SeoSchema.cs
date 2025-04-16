using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class SeoSchema
    {
        public const string TableName = "umbContentAuditSeo";

        public SeoSchema() { }

        public SeoSchema(SeoDto dto)
        {
            RunId = dto.RunId;
            Url = dto.Url;
            Title = dto.Title;
            MetaDescription = dto.MetaDescription;
            CanonicalUrl = dto.CanonicalUrl;
            H1 = dto.H1;
            if (dto.H2s != null)
            {
                H2s = string.Join(",", dto.H2s);
            }
            if (dto.H3s != null)
            {
                H3s = string.Join(",", dto.H3s);
            }
            HasNoIndex = dto.HasNoIndex;
            HasNoFollow = dto.HasNoFollow;
            IsOrphaned = dto.IsOrphaned;
            OpenGraphTitle = dto.OpenGraphTitle;
            OpenGraphDescription = dto.OpenGraphDescription;
            OpenGraphImage = dto.OpenGraphImage;
            TwitterCard = dto.TwitterCard;
            TwitterTitle = dto.TwitterTitle;
            TwitterDescription = dto.TwitterDescription;
            TwitterImage = dto.TwitterImage;
        }

        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)] public int Id { get; set; }
        public int RunId { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? Url { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? Title { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? MetaDescription { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? CanonicalUrl { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? H1 { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? H2s { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? H3s { get; set; }

        public bool HasNoIndex { get; set; }
        public bool HasNoFollow { get; set; }
        public bool IsOrphaned { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public string? OpenGraphTitle { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? OpenGraphDescription { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? OpenGraphImage { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? TwitterCard { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? TwitterTitle { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? TwitterDescription { get; set; }
        
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? TwitterImage { get; set; }

        public DateTime CreatedDate => DateTime.UtcNow;
    }
}