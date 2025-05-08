using CsvHelper.Configuration;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.ClassMaps
{
    public class EmissionsDtoMap : ClassMap<EmissionsDto>
    {
        public EmissionsDtoMap()
        {
            Map(m => m.EmissionsPerPageView).Name("Emissions Per Page View");
            Map(m => m.CarbonRating).Name("Carbon Rating");
        }
    }
}
