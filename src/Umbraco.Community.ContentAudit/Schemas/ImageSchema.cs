using NPoco;
using System.Net.Http.Headers;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    [ExplicitColumns]
    public class ImageSchema
    {
        public const string TableName = "umbContentAuditImage";

        public ImageSchema() { }

        public ImageSchema(ImageDto image)
        {
            Url = image.Url;
            IsExternal = image.IsExternal;
            Size = image.Size;
            StatusCode = image.StatusCode;
            ContentType = image.ContentType.ToString();
            AltText = image.AltText;
            FoundPage = image.FoundPage;
        }

        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        [Column("Id")]
        public int Id { get; set; }

        [Column("RunId")]
        public int RunId { get; set; }

        [Column("Url")]
        public string? Url { get; set; }

        [Column("IsExternal")]
        public bool IsExternal { get; set; }

        [Column("Size")]
        public double? Size { get; set; }

        [Column("StatusCode")]
        public int StatusCode { get; set; }

        [Column("ContentType")]
        public string? ContentType { get; set; }

        [Column("AltText")]
        public string? AltText { get; set; }

        [Column("FoundPage")]
        public string? FoundPage { get; set; }
    }
}
