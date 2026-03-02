using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface ICrawlStateManager
    {
        bool IsRunning { get; }
        string? CurrentPhase { get; }
        CrawlStatusDto CurrentSummary { get; }
        CancellationToken GetCancellationToken();
        void StartCrawl();
        void CancelCrawl();
        void CompleteCrawl();
        void FailCrawl();
        void AddResult(CrawlDto result);
        void SetPhase(string phase);
    }
}
