using CsvHelper.Configuration;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.ClassMaps
{
    public class SeoDtoMap : ClassMap<SeoDto>
    {
        public SeoDtoMap()
        {
            Map(x => x.Title).Name("Meta Title");
            Map(x => x.MetaDescription).Name("Meta Description");
            Map(x => x.CanonicalUrl).Name("Canonical URL");
            Map(x => x.H1).Name("H1");
            Map(x => x.H2s).Name("H2s");
            Map(x => x.H3s).Name("H3s");
            Map(x => x.HasNoIndex).Name("Has No Index");
            Map(x => x.HasNoFollow).Name("Has No Follow");
            Map(x => x.IsOrphaned).Name("Is Orphaned");
            Map(x => x.OpenGraphTitle).Name("Open Graph Title");
            Map(x => x.OpenGraphDescription).Name("Open Graph Description");
            Map(x => x.OpenGraphImage).Name("Open Graph Image");
            Map(x => x.TwitterCard).Name("Twitter Card");
            Map(x => x.TwitterTitle).Name("Twitter Title");
            Map(x => x.TwitterDescription).Name("Twitter Description");
            Map(x => x.TwitterImage).Name("Twitter Image");
            Map(x => x.CreatedDate).Name("Created Date");
        }
    }
}
