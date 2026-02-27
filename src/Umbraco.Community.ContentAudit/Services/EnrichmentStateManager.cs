using Microsoft.AspNetCore.SignalR;
using Umbraco.Community.ContentAudit.Hubs;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Services
{
    public class EnrichmentStateManager : IEnrichmentStateManager
    {
        private readonly IHubContext<ContentAuditHub, IContentAuditHubClient> _hubContext;
        private readonly List<CrawlDto> _results = new();
        private readonly object _lock = new();
        private CancellationTokenSource? _cts;

        public EnrichmentStateManager(IHubContext<ContentAuditHub, IContentAuditHubClient> hubContext)
            => _hubContext = hubContext;

        public bool IsRunning { get; private set; }

        public Guid? CurrentAuditKey { get; private set; }

        public IReadOnlyList<CrawlDto> CurrentResults
        {
            get
            {
                lock (_lock)
                {
                    return _results.ToList().AsReadOnly();
                }
            }
        }

        public CancellationToken GetCancellationToken()
        {
            lock (_lock)
            {
                return _cts?.Token ?? CancellationToken.None;
            }
        }

        public void StartEnrichment(Guid auditKey)
        {
            lock (_lock)
            {
                _cts?.Cancel();
                _cts?.Dispose();
                _cts = new CancellationTokenSource();
                _results.Clear();
                CurrentAuditKey = auditKey;
                IsRunning = true;
            }

            _hubContext.Clients.All.enrichStarted(auditKey);
        }

        public void CancelEnrichment()
        {
            Guid? key;
            lock (_lock)
            {
                _cts?.Cancel();
                key = CurrentAuditKey;
                CurrentAuditKey = null;
                IsRunning = false;
            }

            _hubContext.Clients.All.enrichCancelled();
        }

        public void CompleteEnrichment()
        {
            Guid auditKey;
            lock (_lock)
            {
                auditKey = CurrentAuditKey ?? Guid.Empty;
                _cts?.Dispose();
                _cts = null;
                CurrentAuditKey = null;
                IsRunning = false;
            }

            _hubContext.Clients.All.enrichCompleted(auditKey);
        }

        public void FailEnrichment(string error)
        {
            lock (_lock)
            {
                _cts?.Dispose();
                _cts = null;
                CurrentAuditKey = null;
                IsRunning = false;
            }

            _hubContext.Clients.All.enrichFailed(error);
        }

        public void AddResult(CrawlDto result)
        {
            lock (_lock)
            {
                _results.Add(result);
            }

            _hubContext.Clients.All.enrichProgress(result);
        }
    }
}
