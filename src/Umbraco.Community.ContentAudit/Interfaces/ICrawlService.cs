using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface ICrawlService
    {
        Task<PageAnalysisData> GetPageAnalysis(string url, Uri baseUri, Guid nodeKey);
    }
}
