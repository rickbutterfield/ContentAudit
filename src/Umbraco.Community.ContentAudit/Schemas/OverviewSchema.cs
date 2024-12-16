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

        [Column("Total")]
        public int Total { get; set; }

        [Column("TotalInternal")]
        public int TotalInternal { get; set; }

        [Column("TotalExternal")]
        public int TotalExternal { get; set; }

        [Column("TotalAssets")]
        public int TotalAssets { get; set; }

        [Column("TotalBlocked")]
        public int TotalBlocked { get; set; }
    }
}
