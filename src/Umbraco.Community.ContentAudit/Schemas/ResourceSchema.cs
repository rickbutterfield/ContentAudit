using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class ResourceSchema
    {
        public const string TableName = "umbContentAuditResources";

        public ResourceSchema() { }

        public ResourceSchema(ResourceDto dto)
        {
            Id = dto.Id;
            RunId = dto.RunId;
            Url = dto.Url;
            IsExternal = dto.IsExternal;
            Size = dto.Size;
            StatusCode = dto.StatusCode;
            ContentType = dto.ContentType;
            FoundPage = dto.FoundPage;
            Unique = dto.Unique;
        }

        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }

        public int RunId { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public string? Url { get; set; }

        public bool IsExternal { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public double? Size { get; set; }

        public int StatusCode { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public string? ContentType { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public string? FoundPage { get; set; }

        public Guid Unique { get; set; }

        public DateTime CreatedDate => DateTime.UtcNow;
    }
} 