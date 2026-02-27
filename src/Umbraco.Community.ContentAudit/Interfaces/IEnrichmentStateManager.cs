using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface IEnrichmentStateManager
    {
        bool IsRunning { get; }
        Guid? CurrentAuditKey { get; }
        IReadOnlyList<CrawlDto> CurrentResults { get; }
        CancellationToken GetCancellationToken();
        void StartEnrichment(Guid auditKey);
        void CancelEnrichment();
        void CompleteEnrichment();
        void FailEnrichment(string error);
        void AddResult(CrawlDto result);
    }
}
