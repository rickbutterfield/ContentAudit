using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface ICrawlService
    {
        Task<PageAnalysisDto?> GetPageAnalysis(string url, Uri baseUri, Guid nodeKey);
        Task<HeadResponseDto> GetHeadResponse(string url);
    }
}
