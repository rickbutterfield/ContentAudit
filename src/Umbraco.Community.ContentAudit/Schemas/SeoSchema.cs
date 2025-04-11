using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace Umbraco.Community.ContentAudit.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class SeoSchema
    {
        public const string TableName = "umbContentAuditSeo";

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
        
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}