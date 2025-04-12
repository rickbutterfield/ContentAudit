using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class SeoDto
    {
        public SeoDto() { }

        public SeoDto(SeoSchema schema)
        {
            RunId = schema.RunId;
            Url = schema.Url;
            Title = schema.Title;
            MetaDescription = schema.MetaDescription;
            CanonicalUrl = schema.CanonicalUrl;
            H1 = schema.H1;
            H2s = schema.H2s?.Split(',').ToList();
            H3s = schema.H3s?.Split(',').ToList();
            HasNoIndex = schema.HasNoIndex;
            HasNoFollow = schema.HasNoFollow;
            OpenGraphTitle = schema.OpenGraphTitle;
            OpenGraphDescription = schema.OpenGraphDescription;
            OpenGraphImage = schema.OpenGraphImage;
            TwitterCard = schema.TwitterCard;
            TwitterTitle = schema.TwitterTitle;
            TwitterDescription = schema.TwitterDescription;
            TwitterImage = schema.TwitterImage;
            CreatedDate = schema.CreatedDate;
        }

        public int RunId { get; set; }

        public string? Url { get; set; }

        public string? Title { get; set; }

        public string? MetaDescription { get; set; }

        public string? CanonicalUrl { get; set; }

        public string? H1 { get; set; }

        public List<string>? H2s { get; set; }

        public List<string>? H3s { get; set; }

        public bool HasNoIndex { get; set; }
        public bool HasNoFollow { get; set; }

        public string? OpenGraphTitle { get; set; }

        public string? OpenGraphDescription { get; set; }

        public string? OpenGraphImage { get; set; }

        public string? TwitterCard { get; set; }

        public string? TwitterTitle { get; set; }

        public string? TwitterDescription { get; set; }

        public string? TwitterImage { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}
