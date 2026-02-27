namespace Umbraco.Community.ContentAudit.Interfaces
{
    /// <summary>
    /// Enforces a minimum delay between consecutive requests to the same external domain.
    /// </summary>
    public interface IDomainRateLimiter
    {
        /// <summary>
        /// Waits if needed to enforce the per-domain delay before making a request to the given URL.
        /// </summary>
        Task WaitAsync(string url, CancellationToken ct = default);
    }
}
