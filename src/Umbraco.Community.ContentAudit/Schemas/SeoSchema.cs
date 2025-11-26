using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Schemas
{
    /// <summary>
    /// Database schema for SEO audit data
    /// </summary>
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class SeoSchema
    {
        /// <summary>
        /// Database table name for SEO data
        /// </summary>
        public const string TableName = "umbContentAuditSeo";

        /// <summary>
        /// Initializes a new instance of the SeoSchema
        /// </summary>
        public SeoSchema() { }

        /// <summary>
        /// Initializes a new instance of the SeoSchema from a DTO
        /// </summary>
        /// <param name="dto">The data transfer object containing SEO data</param>
        public SeoSchema(SeoDto dto)
        {
            AuditKey = dto.AuditKey;
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

        /// <summary>
        /// Gets or sets the unique identifier
        /// </summary>
        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)] public int Id { get; set; }

        /// <summary>
        /// Gets or sets the audit run identifier (GUID)
        /// </summary>
        public Guid AuditKey { get; set; }

        /// <summary>
        /// Gets or sets the audit run identifier (legacy - kept for migration safety)
        /// </summary>
        public int RunId { get; set; }
        
        /// <summary>
        /// Gets or sets the page URL
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? Url { get; set; }
        
        /// <summary>
        /// Gets or sets the page title
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? Title { get; set; }
        
        /// <summary>
        /// Gets or sets the meta description
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? MetaDescription { get; set; }
        
        /// <summary>
        /// Gets or sets the canonical URL
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? CanonicalUrl { get; set; }
        
        /// <summary>
        /// Gets or sets the H1 heading
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? H1 { get; set; }
        
        /// <summary>
        /// Gets or sets the H2 headings as comma-separated values
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? H2s { get; set; }
        
        /// <summary>
        /// Gets or sets the H3 headings as comma-separated values
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? H3s { get; set; }

        /// <summary>
        /// Gets or sets whether the page has noindex directive
        /// </summary>
        public bool HasNoIndex { get; set; }
        
        /// <summary>
        /// Gets or sets whether the page has nofollow directive
        /// </summary>
        public bool HasNoFollow { get; set; }
        
        /// <summary>
        /// Gets or sets whether the page is orphaned (no internal links)
        /// </summary>
        public bool IsOrphaned { get; set; }

        /// <summary>
        /// Gets or sets the Open Graph title
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? OpenGraphTitle { get; set; }
        
        /// <summary>
        /// Gets or sets the Open Graph description
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? OpenGraphDescription { get; set; }
        
        /// <summary>
        /// Gets or sets the Open Graph image URL
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? OpenGraphImage { get; set; }
        
        /// <summary>
        /// Gets or sets the Twitter card type
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? TwitterCard { get; set; }
        
        /// <summary>
        /// Gets or sets the Twitter card title
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? TwitterTitle { get; set; }
        
        /// <summary>
        /// Gets or sets the Twitter card description
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? TwitterDescription { get; set; }
        
        /// <summary>
        /// Gets or sets the Twitter card image URL
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? TwitterImage { get; set; }

        /// <summary>
        /// Gets the creation date in UTC
        /// </summary>
        public DateTime CreatedDate => DateTime.UtcNow;
    }
}