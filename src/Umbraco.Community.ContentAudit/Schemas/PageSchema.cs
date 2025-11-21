using NPoco;
using System.Text.Json;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Schemas
{
    /// <summary>
    /// Database schema for page audit data
    /// </summary>
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class PageSchema
    {
        /// <summary>
        /// Database table name for page data
        /// </summary>
        public const string TableName = "umbContentAuditInternalPages";

        /// <summary>
        /// Initializes a new instance of the PageSchema
        /// </summary>
        public PageSchema() { }

        /// <summary>
        /// Initializes a new instance of the PageSchema from a DTO
        /// </summary>
        /// <param name="pageDto">The data transfer object containing page data</param>
        /// <param name="runId">The audit run identifier</param>
        public PageSchema(PageDto pageDto, int runId)
        {
            RunId = runId;
            Url = pageDto.Url;
            RedirectUrl = pageDto.RedirectUrl;
            Redirect = pageDto.Redirect;
            Unique = pageDto.Unique;
            StatusCode = pageDto.StatusCode;
        }

        /// <summary>
        /// Gets or sets the unique identifier
        /// </summary>
        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the audit run identifier
        /// </summary>
        public int RunId { get; set; }

        /// <summary>
        /// Gets or sets the page URL
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? Url { get; set; }

        /// <summary>
        /// Gets or sets the redirect URL if applicable
        /// </summary>
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        public string? RedirectUrl { get; set; }

        /// <summary>
        /// Gets or sets whether this is an asset
        /// </summary>
        public bool IsAsset { get; set; }

        /// <summary>
        /// Gets or sets whether the page redirects
        /// </summary>
        public bool Redirect { get; set; }

        /// <summary>
        /// Gets or sets the unique identifier (GUID)
        /// </summary>
        public Guid Unique { get; set; }

        /// <summary>
        /// Gets or sets the HTTP status code
        /// </summary>
        public int StatusCode { get; set; }

        /// <summary>
        /// Gets the creation date
        /// </summary>
        public DateTime CreatedDate => DateTime.Now;
    }
}
