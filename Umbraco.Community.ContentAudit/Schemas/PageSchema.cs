using NPoco;
using System.Text.Json.Serialization;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    [ExplicitColumns]
    public class PageSchema
    {
        public const string TableName = "umbContentAuditPages";

        public PageSchema() { }

        public PageSchema(PageResponseDto pageContent, int runId)
        {
            RunId = runId;
            Url = pageContent.Url;
            NodeKey = pageContent.NodeKey;
            StatusCode = pageContent.StatusCode;
            ContentType = pageContent.ContentType?.ToString();
            PageTitle = pageContent.PageTitle;
            PageSize = pageContent.Size.GetValueOrDefault();
        }

        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        [Column("Id")]
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [Column("RunId")]
        [JsonPropertyName("runId")]
        public int RunId { get; set; }

        [Column("Url")]
        [JsonPropertyName("url")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? Url { get; set; }

        [Column("NodeKey")]
        [JsonPropertyName("nodeKey")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public Guid? NodeKey { get; set; }

        [Column("StatusCode")]
        [JsonPropertyName("statusCode")]
        public int StatusCode { get; set; }

        [Column("ContentType")]
        [JsonPropertyName("contentType")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? ContentType { get; set; }

        [Column("PageTitle")]
        [JsonPropertyName("pageTitle")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? PageTitle { get; set; }

        [Column("PageSize")]
        [JsonPropertyName("pageSize")]
        public double PageSize { get; set; }
    }
}
