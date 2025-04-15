namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface ISitemapService
    {
        Task<List<string>> GetSitemapUrlAsync(string baseUrl);
    }
}
