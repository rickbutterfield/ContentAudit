using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface ICrawlService
    {
        Task<PageAnalysisDto> GetPageAnalysis(string url, Uri baseUri, Guid nodeKey);
    }
}
