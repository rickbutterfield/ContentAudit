using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace Umbraco.Community.ContentAudit.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class OrphanedPageSchema
    {
        public const string TableName = "umbContentAuditOrphanedPages";

        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }

        public int RunId { get; set; }
        public string? Url { get; set; }
        public Guid? NodeKey { get; set; }

        public DateTime CreatedDate => DateTime.UtcNow;
    }
}
