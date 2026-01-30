using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace Umbraco.Community.ContentAudit.Schemas
{
    /// <summary>
    /// Database schema for storing page fingerprints to enable incremental crawls
    /// </summary>
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class PageFingerprintSchema
    {
        /// <summary>
        /// Database table name for page fingerprints
        /// </summary>
        public const string TableName = "umbContentAuditPageFingerprint";

        /// <summary>
        /// Gets or sets the auto-incrementing primary key identifier
        /// </summary>
        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the URL of the page
        /// </summary>
        [Index(IndexTypes.NonClustered, Name = "IX_PageFingerprint_Url")]
        [NullSetting(NullSetting = NullSettings.NotNull)]
        [Length(2048)]
        public string Url { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the content hash (SHA256 of page body)
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [Length(64)]
        public string? ContentHash { get; set; }

        /// <summary>
        /// Gets or sets the ETag from the server response
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [Length(256)]
        public string? ETag { get; set; }

        /// <summary>
        /// Gets or sets the Last-Modified header from the server
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        public DateTime? LastModified { get; set; }

        /// <summary>
        /// Gets or sets the Umbraco content update date (if applicable)
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        public DateTime? UmbracoUpdateDate { get; set; }

        /// <summary>
        /// Gets or sets when this fingerprint was last updated
        /// </summary>
        public DateTime LastCrawled { get; set; }

        /// <summary>
        /// Gets or sets the audit key this fingerprint was last used in
        /// </summary>
        public Guid LastAuditKey { get; set; }
    }
}
