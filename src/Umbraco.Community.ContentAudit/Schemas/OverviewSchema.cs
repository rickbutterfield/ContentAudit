using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace Umbraco.Community.ContentAudit.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class OverviewSchema
    {
        public const string TableName = "umbContentAuditOverview";

        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }

        public DateTime RunDate { get; set; }
        public int Total { get; set; }
        public int TotalInternal { get; set; }
        public int TotalExternal { get; set; }
        public int TotalAssets { get; set; }
        public int TotalBlocked { get; set; }
    }
}
