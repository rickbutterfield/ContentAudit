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
        Task crawlPhaseChanged(string phase);
        Task enrichStarted(Guid auditKey);
        Task enrichProgress(CrawlDto result);
        Task enrichCompleted(Guid auditKey);
        Task enrichFailed(string error);
        Task enrichCancelled();
        Task pageEnrichStarted(string url);
        Task pageEnrichCompleted(string url);
        Task pageEnrichFailed(string url);
#pragma warning restore SA1300
    }
}
