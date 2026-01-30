using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace Umbraco.Community.ContentAudit.Schemas
{
    /// <summary>
    /// Database schema for audit overview data containing high-level statistics for each audit run
    /// </summary>
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class OverviewSchema
    {
        /// <summary>
        /// Database table name for audit overview data
        /// </summary>
        public const string TableName = "umbContentAuditOverview";

        /// <summary>
        /// Gets or sets the auto-incrementing primary key identifier
        /// </summary>
        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the unique audit run identifier (GUID) used for external references
        /// </summary>
        public Guid Key { get; set; }

        /// <summary>
        /// Gets or sets the date and time when the audit was run
        /// </summary>
        public DateTime RunDate { get; set; }

        /// <summary>
        /// Gets or sets the total number of pages audited
        /// </summary>
        public int Total { get; set; }

        /// <summary>
        /// Gets or sets the total number of internal pages
        /// </summary>
        public int TotalInternal { get; set; }

        /// <summary>
        /// Gets or sets the total number of external links
        /// </summary>
        public int TotalExternal { get; set; }

        /// <summary>
        /// Gets or sets the total number of assets (images, scripts, stylesheets)
        /// </summary>
        public int TotalAssets { get; set; }

        /// <summary>
        /// Gets or sets the total number of blocked URLs
        /// </summary>
        public int TotalBlocked { get; set; }

        /// <summary>
        /// Gets or sets the overall health score for the audit
        /// </summary>
        public double HealthScore { get; set; }

        /// <summary>
        /// Gets or sets the audit status (0 = InProgress, 1 = Completed, 2 = Failed)
        /// </summary>
        public int Status { get; set; }

        /// <summary>
        /// Gets or sets the base URL being audited
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? BaseUrl { get; set; }

        /// <summary>
        /// Gets the creation date in UTC
        /// </summary>
        public DateTime CreatedDate => DateTime.UtcNow;
    }

    /// <summary>
    /// Audit status values
    /// </summary>
    public enum AuditStatus
    {
        /// <summary>Audit is in progress</summary>
        InProgress = 0,
        /// <summary>Audit completed successfully</summary>
        Completed = 1,
        /// <summary>Audit failed or was cancelled</summary>
        Failed = 2
    }
}
