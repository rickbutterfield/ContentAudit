using Microsoft.Playwright;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    /// <summary>
    /// Pool for reusing Playwright browser pages
    /// </summary>
    public interface IBrowserPagePool
    {
        /// <summary>
        /// Acquires a page from the pool or creates a new one
        /// </summary>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>A Playwright page instance</returns>
        Task<IPage> AcquireAsync(CancellationToken cancellationToken = default);

        /// <summary>
        /// Returns a page to the pool for reuse
        /// </summary>
        /// <param name="page">The page to return</param>
        Task ReleaseAsync(IPage page);
    }
}
