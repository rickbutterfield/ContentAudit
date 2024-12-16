using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace Umbraco.Community.ContentAudit.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    [ExplicitColumns]
    public class OrphanedPageSchema
    {
        public const string TableName = "umbContentAuditOrphanedPages";

        public OrphanedPageSchema() { }

        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        [Column("Id")]
        public int Id { get; set; }

        [Column("RunId")]
        public int RunId { get; set; }

        [Column("Url")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? Url { get; set; }

        [Column("NodeKey")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public Guid? NodeKey { get; set; }
    }
}
