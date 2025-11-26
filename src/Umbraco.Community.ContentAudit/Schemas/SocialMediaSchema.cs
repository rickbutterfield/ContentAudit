using NPoco;
using System.Text.Json;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Schemas
{
    /// <summary>
    /// Database schema for social media audit data
    /// </summary>
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class SocialMediaSchema
    {
        /// <summary>
        /// Database table name for social media data
        /// </summary>
        public const string TableName = "umbContentAuditSocialMedia";

        /// <summary>
        /// Initializes a new instance of the SocialMediaSchema
        /// </summary>
        public SocialMediaSchema() { }

        /// <summary>
        /// Initializes a new instance of the SocialMediaSchema from a DTO
        /// </summary>
        /// <param name="dto">The data transfer object containing social media data</param>
        public SocialMediaSchema(SocialMediaDto dto)
        {
            Id = dto.Id;
            AuditKey = dto.AuditKey;
            Url = dto.Url;
            SocialShareButtons = JsonSerializer.Serialize(dto.SocialShareButtons);
            HasFacebookPixel = dto.HasFacebookPixel;
            HasTwitterPixel = dto.HasTwitterPixel;
            HasLinkedInPixel = dto.HasLinkedInPixel;
            SocialMediaLinks = JsonSerializer.Serialize(dto.SocialMediaLinks);
        }

        /// <summary>
        /// Gets or sets the unique identifier
        /// </summary>
        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }

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
        /// Gets or sets the social share buttons as JSON
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? SocialShareButtons { get; set; }

        /// <summary>
        /// Gets or sets whether Facebook pixel is present
        /// </summary>
        public bool HasFacebookPixel { get; set; }
        
        /// <summary>
        /// Gets or sets whether Twitter pixel is present
        /// </summary>
        public bool HasTwitterPixel { get; set; }
        
        /// <summary>
        /// Gets or sets whether LinkedIn pixel is present
        /// </summary>
        public bool HasLinkedInPixel { get; set; }

        /// <summary>
        /// Gets or sets the social media links as JSON
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? SocialMediaLinks { get; set; }

        /// <summary>
        /// Gets the creation date in UTC
        /// </summary>
        public DateTime CreatedDate => DateTime.UtcNow;
    }
} 