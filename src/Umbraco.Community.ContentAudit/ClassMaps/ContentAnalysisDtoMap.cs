using CsvHelper.Configuration;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.ClassMaps
{
    /// <summary>
    /// CSV mapping for <see cref="ContentAnalysisDto"/>.
    /// </summary>
    public class ContentAnalysisDtoMap : ClassMap<ContentAnalysisDto>
    {
        /// <summary>
        /// Configures column mappings.
        /// </summary>
        public ContentAnalysisDtoMap()
        {
            Map(x => x.WordCount).Name("Word Count");
            Map(x => x.ParagraphCount).Name("Paragraph Count");
            Map(x => x.Images).Name("Images");
            Map(x => x.Resources).Name("Resources");
            Map(x => x.Links).Name("Links");
            Map(x => x.ExternalLinks).Name("External Links");
            Map(x => x.InternalLinks).Name("Internal Links");
            Map(x => x.ReadabilityScore).Name("Readability Score");
            Map(x => x.KeywordDensity).Name("Keyword Density");
            Map(x => x.MissingAltTextImages).Name("Missing Alt Text Images");
            Map(x => x.MissingTitleImages).Name("Missing Title Images");
        }
    }
}
