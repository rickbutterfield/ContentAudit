using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Playwright;
using System.Threading.Channels;
using Umbraco.Community.ContentAudit.Configuration;
using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Services
{
    /// <inheritdoc/>
    public class BrowserPagePool : IBrowserPagePool, IAsyncDisposable
    {
        private readonly IPlaywright _playwright;
        private readonly IOptionsMonitor<ContentAuditSettings> _options;
        private readonly ILogger<BrowserPagePool> _logger;
        private readonly Channel<IPage> _pageChannel;
        private readonly SemaphoreSlim _browserLock = new(1, 1);
        private readonly SemaphoreSlim _pageCountLock = new(1, 1);

        private IBrowser? _browser;
        private int _activePageCount;
        private bool _disposed;

        public BrowserPagePool(
            IPlaywright playwright,
            IOptionsMonitor<ContentAuditSettings> options,
            ILogger<BrowserPagePool> logger)
        {
            _playwright = playwright;
            _options = options;
            _logger = logger;
            _pageChannel = Channel.CreateUnbounded<IPage>(new UnboundedChannelOptions
            {
                SingleReader = false,
                SingleWriter = false
            });
        }

        private async Task<IBrowser> GetBrowserAsync()
        {
            if (_browser != null)
                return _browser;

            await _browserLock.WaitAsync();
            try
            {
                if (_browser != null)
                    return _browser;

                _browser = await _playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions
                {
                    Headless = true
                });

                _logger.LogInformation("Browser instance created for page pool");
                return _browser;
            }
            finally
            {
                _browserLock.Release();
            }
        }

        /// <inheritdoc/>
        public async Task<IPage> AcquireAsync(CancellationToken cancellationToken = default)
        {
            ObjectDisposedException.ThrowIf(_disposed, this);

            if (_pageChannel.Reader.TryRead(out var existingPage))
            {
                if (!existingPage.IsClosed)
                {
                    _logger.LogDebug("Reusing existing page from pool");
                    return existingPage;
                }

                _logger.LogDebug("Retrieved closed page from pool, creating new one");
                await DecrementPageCountAsync();
            }

            var maxPages = _options.CurrentValue.MaxConcurrentCrawls;

            await _pageCountLock.WaitAsync(cancellationToken);
            try
            {
                if (_activePageCount >= maxPages)
                {
                    _pageCountLock.Release();

                    _logger.LogDebug("Pool at capacity ({MaxPages}), waiting for available page", maxPages);
                    var page = await _pageChannel.Reader.ReadAsync(cancellationToken);

                    if (!page.IsClosed)
                        return page;

                    await _pageCountLock.WaitAsync(cancellationToken);
                }

                _activePageCount++;
            }
            finally
            {
                if (_pageCountLock.CurrentCount == 0)
                    _pageCountLock.Release();
            }

            try
            {
                var browser = await GetBrowserAsync();
                var newPage = await browser.NewPageAsync(new BrowserNewPageOptions
                {
                    BypassCSP = true
                });
                _logger.LogDebug("Created new page, pool size: {ActiveCount}/{MaxPages}", _activePageCount, maxPages);
                return newPage;
            }
            catch
            {
                await DecrementPageCountAsync();
                throw;
            }
        }

        /// <inheritdoc/>
        public async Task ReleaseAsync(IPage page)
        {
            if (_disposed)
            {
                await SafeClosePageAsync(page);
                return;
            }

            if (page.IsClosed)
            {
                await DecrementPageCountAsync();
                return;
            }

            try
            {
                await page.Context.ClearCookiesAsync();

                await page.EvaluateAsync("() => localStorage.clear()").ConfigureAwait(false);
                await page.EvaluateAsync("() => sessionStorage.clear()").ConfigureAwait(false);

                await page.GotoAsync("about:blank");
                await page.UnrouteAllAsync();

                await _pageChannel.Writer.WriteAsync(page);
                _logger.LogDebug("Page returned to pool");
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to reset page state, disposing page instead");
                await SafeClosePageAsync(page);
                await DecrementPageCountAsync();
            }
        }

        private async Task DecrementPageCountAsync()
        {
            await _pageCountLock.WaitAsync();
            try
            {
                if (_activePageCount > 0)
                    _activePageCount--;
            }
            finally
            {
                _pageCountLock.Release();
            }
        }

        private async Task SafeClosePageAsync(IPage page)
        {
            try
            {
                if (!page.IsClosed)
                    await page.CloseAsync();
            }
            catch (Exception ex)
            {
                _logger.LogDebug(ex, "Error closing page");
            }
        }

        /// <inheritdoc/>
        public async ValueTask DisposeAsync()
        {
            if (_disposed)
                return;

            _disposed = true;
            _pageChannel.Writer.Complete();

            while (_pageChannel.Reader.TryRead(out var page))
            {
                await SafeClosePageAsync(page);
            }

            if (_browser != null)
            {
                await _browser.DisposeAsync();
                _logger.LogInformation("Browser page pool disposed");
            }

            _browserLock.Dispose();
            _pageCountLock.Dispose();
        }
    }
}
