using CsvHelper.Configuration;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.ClassMaps
{
    /// <summary>
    /// CSV mapping for <see cref="PageDto"/>.
    /// </summary>
    public class PageDtoMap : ClassMap<PageDto>
    {
        /// <summary>
        /// Configures column mappings.
        /// </summary>
        public PageDtoMap()
        {
            Map(x => x.Url).Name("URL");
            Map(x => x.Redirect).Name("Is Redirect?");
            Map(x => x.RedirectUrl).Name("Redirect URL");
            Map(x => x.StatusCode).Name("Status Code");
        }
    }
}
