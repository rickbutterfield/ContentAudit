using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Hubs
{
    public interface IContentAuditHubClient
    {
#pragma warning disable SA1300
        Task crawlProgress(CrawlDto crawlResult);
        Task crawlStarted();
        Task crawlCompleted();
        Task crawlFailed(string error);
        Task crawlCancelled();
#pragma warning restore SA1300
    }
}
