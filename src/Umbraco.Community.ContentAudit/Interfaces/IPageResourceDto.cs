namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface IPageResourceDto
    {
        string Url { get; set; }

        bool IsAsset { get; set; }

        double? Size { get; set; }

        int StatusCode { get; set; }

        string? ContentType { get; set; }
    }
}
