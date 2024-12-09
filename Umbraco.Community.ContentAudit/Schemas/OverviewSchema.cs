using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace Umbraco.Community.ContentAudit.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    [ExplicitColumns]
    public class OverviewSchema
    {
        public const string TableName = "umbContentAuditOverview";

        public OverviewSchema() { }

        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        [Column("Id")]
        public int Id { get; set; }

        [Column("RunDate")]
        public DateTime RunDate { get; set; }

        [Column("TotalUrls")]
        public int TotalUrls { get; set; }

        [Column("TotalUrlsCrawled")]
        public int TotalUrlsCrawled { get; set; }

        [Column("TotalBlockedUrls")]
        public int TotalBlockedUrls { get; set; }
    }
}
