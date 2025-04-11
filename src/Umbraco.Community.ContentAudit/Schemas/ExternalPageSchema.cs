using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace Umbraco.Community.ContentAudit.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class ExternalPageSchema
    {
        public const string TableName = "umbContentAuditExternalPages";

        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)] public int Id { get; set; }
        public int RunId { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public string? Url { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public Guid? NodeKey { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public string? FoundPage { get; set; }
        public int StatusCode { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public string? ContentType { get; set; }
        public bool IsAsset { get; set; }
    }
}
