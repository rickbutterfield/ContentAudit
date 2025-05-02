using NPoco;
using System.Text.Json;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class PageSchema
    {
        public const string TableName = "umbContentAuditInternalPages";

        public PageSchema() { }

        public PageSchema(PageDto pageDto, int runId)
        {
            RunId = runId;
            Url = pageDto.Url;
            RedirectUrl = pageDto.RedirectUrl;
            Redirect = pageDto.Redirect;
            Unique = pageDto.Unique;
            StatusCode = pageDto.StatusCode;
        }

        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }

        public int RunId { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? Url { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? RedirectUrl { get; set; }

        public bool IsAsset { get; set; }

        public bool Redirect { get; set; }

        public Guid Unique { get; set; }

        public int StatusCode { get; set; }

        public DateTime CreatedDate => DateTime.Now;
    }
}
