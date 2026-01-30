using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace Umbraco.Community.ContentAudit.Schemas
{
    /// <summary>
    /// Database schema for storing crawl state to enable resume functionality
    /// </summary>
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class CrawlStateSchema
    {
        /// <summary>
        /// Database table name for crawl state
        /// </summary>
        public const string TableName = "umbContentAuditCrawlState";

        /// <summary>
        /// Gets or sets the auto-incrementing primary key identifier
        /// </summary>
        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the audit key this state belongs to
        /// </summary>
        public Guid AuditKey { get; set; }

        /// <summary>
        /// Gets or sets the JSON-serialized list of visited URLs
        /// </summary>
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? VisitedUrlsJson { get; set; }

        /// <summary>
        /// Gets or sets the JSON-serialized queue of pending URLs
        /// </summary>
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? PendingUrlsJson { get; set; }

        /// <summary>
        /// Gets or sets the JSON-serialized robots.txt disallowed paths
        /// </summary>
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? DisallowedPathsJson { get; set; }

        /// <summary>
        /// Gets or sets the last update time
        /// </summary>
        public DateTime LastUpdated { get; set; }
    }
}
