using System.Collections.Concurrent;
using System.Diagnostics;
using Microsoft.Extensions.Options;
using Umbraco.Community.ContentAudit.Configuration;
using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Services
{
    /// <inheritdoc />
    public class DomainRateLimiter : IDomainRateLimiter
    {
        private readonly ConcurrentDictionary<string, long> _lastRequestTicks = new(StringComparer.OrdinalIgnoreCase);
        private readonly IOptionsMonitor<ContentAuditSettings> _settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="DomainRateLimiter"/> class.
        /// </summary>
        public DomainRateLimiter(IOptionsMonitor<ContentAuditSettings> settings)
        {
            _settings = settings;
        }

        /// <inheritdoc />
        public async Task WaitAsync(string url, CancellationToken ct = default)
        {
            int delayMs = _settings.CurrentValue.ExternalRequestDelayMs;
            if (delayMs <= 0)
                return;

            if (!Uri.TryCreate(url, UriKind.Absolute, out var uri))
                return;

            string host = uri.Host;

            long now = Stopwatch.GetTimestamp();
            long previous = _lastRequestTicks.GetOrAdd(host, now);

            if (previous != now)
            {
                double elapsedMs = GetElapsedMs(previous, now);
                int remainingMs = delayMs - (int)elapsedMs;

                if (remainingMs > 0)
                    await Task.Delay(remainingMs, ct);
            }

            Interlocked.Exchange(ref now, Stopwatch.GetTimestamp());
            _lastRequestTicks[host] = now;
        }

        private static double GetElapsedMs(long startTicks, long endTicks)
        {
            return (endTicks - startTicks) * 1000.0 / Stopwatch.Frequency;
        }
    }
}
