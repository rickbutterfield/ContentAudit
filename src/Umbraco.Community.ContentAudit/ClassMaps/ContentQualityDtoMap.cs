using CsvHelper.Configuration;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.ClassMaps
{
    /// <summary>
    /// CSV mapping for <see cref="ContentQualityDto"/>.
    /// </summary>
    public class ContentQualityDtoMap : ClassMap<ContentQualityDto>
    {
        /// <summary>
        /// Configures column mappings.
        /// </summary>
        public ContentQualityDtoMap()
        {
            Map(m => m.HasDuplicateContent).Name("Has Duplicate Content");
            Map(m => m.DuplicateContentUrls).Name("Duplicate Content URLs");
            Map(m => m.HasThinContent).Name("Has Thin Content");
            Map(m => m.ContentScore).Name("Content Score");
            Map(m => m.ContentGaps).Name("Content Gaps");
            Map(m => m.ContentStrengths).Name("Content Strengths");
        }
    }
}
