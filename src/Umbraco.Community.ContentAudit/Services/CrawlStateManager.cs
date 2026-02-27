using Microsoft.AspNetCore.SignalR;
using Umbraco.Community.ContentAudit.Hubs;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Services
{
    public class CrawlStateManager : ICrawlStateManager
    {
        private readonly IHubContext<ContentAuditHub, IContentAuditHubClient> _hubContext;
        private readonly List<CrawlDto> _results = new();
        private readonly object _lock = new();
        private CancellationTokenSource? _cts;

        public CrawlStateManager(IHubContext<ContentAuditHub, IContentAuditHubClient> hubContext)
            => _hubContext = hubContext;

        public bool IsRunning { get; private set; }

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

        public void StartCrawl()
        {
            lock (_lock)
            {
                _cts?.Cancel();
                _cts?.Dispose();
                _cts = new CancellationTokenSource();
                _results.Clear();
                IsRunning = true;
            }

            _hubContext.Clients.All.crawlStarted();
        }

        public void CancelCrawl()
        {
            lock (_lock)
            {
                _cts?.Cancel();
            }

            IsRunning = false;
            _hubContext.Clients.All.crawlCancelled();
        }

        public void CompleteCrawl()
        {
            lock (_lock)
            {
                _cts?.Dispose();
                _cts = null;
                IsRunning = false;
            }

            _hubContext.Clients.All.crawlCompleted();
        }

        public void FailCrawl()
        {
            string error;
            lock (_lock)
            {
                _cts?.Dispose();
                _cts = null;
                IsRunning = false;
                error = "Crawl failed unexpectedly";
            }

            _hubContext.Clients.All.crawlFailed(error);
        }

        public void AddResult(CrawlDto result)
        {
            lock (_lock)
            {
                _results.Add(result);
            }

            _hubContext.Clients.All.crawlProgress(result);
        }
    }
}
