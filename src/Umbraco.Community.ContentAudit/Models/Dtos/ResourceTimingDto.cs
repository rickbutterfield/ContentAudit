using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class ResourceTimingDto
    {

        [NullSetting(NullSetting = NullSettings.Null)]
        public string? Url { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public string? ResourceType { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public long? Duration { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public long? StartTime { get; set; }

        [NullSetting(NullSetting = NullSettings.Null)]
        public int? Size { get; set; }
    }
}
