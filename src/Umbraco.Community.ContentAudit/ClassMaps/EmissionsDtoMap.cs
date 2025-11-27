using CsvHelper.Configuration;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.ClassMaps
{
    /// <summary>
    /// CSV mapping for <see cref="EmissionsDto"/>.
    /// </summary>
    public class EmissionsDtoMap : ClassMap<EmissionsDto>
    {
        /// <summary>
        /// Configures column mappings.
        /// </summary>
        public EmissionsDtoMap()
        {
            Map(m => m.EmissionsPerPageView).Name("Emissions Per Page View");
            Map(m => m.CarbonRating).Name("Carbon Rating");
        }
    }
}
