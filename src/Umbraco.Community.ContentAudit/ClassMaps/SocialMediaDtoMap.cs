using CsvHelper.Configuration;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.ClassMaps
{
    public class SocialMediaDtoMap : ClassMap<SocialMediaDto>
    {
        public SocialMediaDtoMap()
        {
            Map(m => m.SocialShareButtons).Name("Social Share Buttons");
            Map(m => m.HasFacebookPixel).Name("Has Facebook Pixel");
            Map(m => m.HasTwitterPixel).Name("Has Twitter Pixel");
            Map(m => m.HasLinkedInPixel).Name("Has LinkedIn Pixel");
            Map(m => m.SocialMediaLinks).Name("Social Media Links");
        }
    }
}
