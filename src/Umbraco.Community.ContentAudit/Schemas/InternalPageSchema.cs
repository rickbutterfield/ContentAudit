using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class InternalPageSchema
    {
        public const string TableName = "umbContentAuditInternalPages";

        public InternalPageSchema() { }

        public InternalPageSchema(PageDataDto pageContent, int runId)
        {
            RunId = runId;
            Url = pageContent.Url;
            NodeKey = pageContent.NodeKey;
            StatusCode = pageContent.StatusCode;
        }

        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }

        public int RunId { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public string? Url { get; set; }

        public bool IsAsset { get; set; }

        public Guid? NodeKey { get; set; }

        public int StatusCode { get; set; }
    }
}
