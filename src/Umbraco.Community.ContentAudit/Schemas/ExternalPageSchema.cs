using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace Umbraco.Community.ContentAudit.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    [ExplicitColumns]
    public class ExternalPageSchema
    {
        public const string TableName = "umbContentAuditExternalPages";

        public ExternalPageSchema() { }

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

        [Column("FoundPage")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? FoundPage { get; set; }

        [Column("StatusCode")]
        public int StatusCode { get; set; }

        [Column("ContentType")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? ContentType { get; set; }

        [Column("IsAsset")]
        public bool IsAsset { get; set; }
    }
}
