using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class ImageSchema
    {
        public const string TableName = "umbContentAuditImages";

        public ImageSchema() { }

        public ImageSchema(ImageDto image)
        {
            Url = image.Url;
            IsExternal = image.IsExternal;
            Size = image.Size ?? 0;
            StatusCode = image.StatusCode;
            ContentType = image.ContentType?.ToString() ?? "";
            AltText = image.AltText;
            FoundPage = image.FoundPage;
            NodeKey = image.NodeKey;
            IsBackground = image.IsBackground;
        }

        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }

        public int RunId { get; set; }
        public string? Url { get; set; }
        public bool IsExternal { get; set; }
        public bool IsBackground { get; set; }
        public double? Size { get; set; }
        public int StatusCode { get; set; }
        public string? ContentType { get; set; }
        public string? AltText { get; set; }
        public string? FoundPage { get; set; }
        public Guid? NodeKey { get; set; }    }
}
