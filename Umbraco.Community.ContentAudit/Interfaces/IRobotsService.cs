namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface IRobotsService
    {
        Task<List<string>> GetDisallowedPathsAsync(string baseUrl);
    }
}
