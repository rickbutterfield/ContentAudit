namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface IPageResourceDto
    {
        string Url { get; set; }

        double? Size { get; set; }

        int StatusCode { get; set; }

        string? ContentType { get; set; }

        string? FoundPage { get; set; }

        Guid? NodeKey { get; set; }

        bool IsExternal { get; set; }
    }
}
