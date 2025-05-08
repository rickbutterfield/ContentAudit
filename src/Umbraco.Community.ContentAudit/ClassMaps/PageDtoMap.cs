using CsvHelper.Configuration;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.ClassMaps
{
    public class PageDtoMap : ClassMap<PageDto>
    {
        public PageDtoMap()
        {
            Map(x => x.Url).Name("URL");
            Map(x => x.Redirect).Name("Is Redirect?");
            Map(x => x.RedirectUrl).Name("Redirect URL");
            Map(x => x.StatusCode).Name("Status Code");
        }
    }
}
