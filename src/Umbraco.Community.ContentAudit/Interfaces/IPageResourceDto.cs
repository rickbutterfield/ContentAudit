using System.Net.Http.Headers;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface IPageResourceDto
    {
        string? Url { get; set; }

        bool IsExternal { get; set; }

        bool IsAsset { get; set; }

        double? Size { get; set; }

        int StatusCode { get; set; }

        MediaTypeHeaderValue? ContentType { get; set; }
    }
}
