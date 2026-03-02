using System.Diagnostics;
using Microsoft.AspNetCore.SignalR;
using Umbraco.Community.ContentAudit.Hubs;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Services
{
    public class CrawlStateManager : ICrawlStateManager
    {
        private const int RecentUrlCapacity = 5;
        private const long BroadcastIntervalMs = 250;

        private readonly IHubContext<ContentAuditHub, IContentAuditHubClient> _hubContext;
        private readonly object _lock = new();
        private readonly Queue<CrawlDto> _recentUrls = new();
        private readonly Stopwatch _broadcastStopwatch = new();

        private CancellationTokenSource? _cts;
        private int _total;
        private int _internal;
        private int _external;
        private int _resources;
        private int _images;
        private int _blocked;
        private int _skipped;

        public CrawlStateManager(IHubContext<ContentAuditHub, IContentAuditHubClient> hubContext)
            => _hubContext = hubContext;

        public bool IsRunning { get; private set; }

        public string? CurrentPhase { get; private set; }

        public CrawlStatusDto CurrentSummary
        {
            get
            {
                lock (_lock)
                {
                    return BuildSummary();
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
                ResetCounters();
                CurrentPhase = null;
                IsRunning = true;
                _broadcastStopwatch.Restart();
            }

            _hubContext.Clients.All.crawlStarted();
        }

        public void CancelCrawl()
        {
            CrawlStatusDto finalSummary;
            lock (_lock)
            {
                _cts?.Cancel();
                CurrentPhase = null;
                IsRunning = false;
                finalSummary = BuildSummary();
            }

            _hubContext.Clients.All.crawlProgress(finalSummary);
            _hubContext.Clients.All.crawlCancelled();
        }

        public void CompleteCrawl()
        {
            CrawlStatusDto finalSummary;
            lock (_lock)
            {
                _cts?.Dispose();
                _cts = null;
                CurrentPhase = null;
                IsRunning = false;
                finalSummary = BuildSummary();
            }

            _hubContext.Clients.All.crawlProgress(finalSummary);
            _hubContext.Clients.All.crawlCompleted();
        }

        public void FailCrawl()
        {
            CrawlStatusDto finalSummary;
            lock (_lock)
            {
                _cts?.Dispose();
                _cts = null;
                CurrentPhase = null;
                IsRunning = false;
                finalSummary = BuildSummary();
            }

            _hubContext.Clients.All.crawlProgress(finalSummary);
            _hubContext.Clients.All.crawlFailed("Crawl failed unexpectedly");
        }

        public void AddResult(CrawlDto result)
        {
            CrawlStatusDto? summaryToBroadcast = null;

            lock (_lock)
            {
                _total++;

                if (result.Blocked)
                    _blocked++;
                else if (result.Skipped)
                    _skipped++;
                else if (result.Image)
                    _images++;
                else if (result.Resource)
                    _resources++;
                else if (result.External)
                    _external++;
                else
                    _internal++;

                _recentUrls.Enqueue(result);
                while (_recentUrls.Count > RecentUrlCapacity)
                    _recentUrls.Dequeue();

                if (_total == 1 || _broadcastStopwatch.ElapsedMilliseconds >= BroadcastIntervalMs)
                {
                    summaryToBroadcast = BuildSummary();
                    _broadcastStopwatch.Restart();
                }
            }

            if (summaryToBroadcast is not null)
            {
                _hubContext.Clients.All.crawlProgress(summaryToBroadcast);
            }
        }

        public void SetPhase(string phase)
        {
            CurrentPhase = phase;
            _hubContext.Clients.All.crawlPhaseChanged(phase);
        }

        private void ResetCounters()
        {
            _total = 0;
            _internal = 0;
            _external = 0;
            _resources = 0;
            _images = 0;
            _blocked = 0;
            _skipped = 0;
            _recentUrls.Clear();
        }

        private CrawlStatusDto BuildSummary() => new()
        {
            IsRunning = IsRunning,
            Phase = CurrentPhase,
            Total = _total,
            Internal = _internal,
            External = _external,
            Resources = _resources,
            Images = _images,
            Blocked = _blocked,
            Skipped = _skipped,
            RecentUrls = [.. _recentUrls],
        };
    }
}
