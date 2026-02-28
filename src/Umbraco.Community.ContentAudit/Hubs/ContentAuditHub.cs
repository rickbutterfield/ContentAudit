using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Umbraco.Community.ContentAudit.Authorization;
using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Hubs
{
    [Authorize(Policy = AuthorizationPolicies.SectionAccessContentAudit)]
    public class ContentAuditHub : Hub<IContentAuditHubClient>
    {
        private readonly ICrawlStateManager _crawlStateManager;
        private readonly IEnrichmentStateManager _enrichmentStateManager;

        public ContentAuditHub(ICrawlStateManager crawlStateManager, IEnrichmentStateManager enrichmentStateManager)
        {
            _crawlStateManager = crawlStateManager;
            _enrichmentStateManager = enrichmentStateManager;
        }

        public override async Task OnConnectedAsync()
        {
            if (_crawlStateManager.IsRunning)
            {
                await Clients.Caller.crawlStarted();

                if (_crawlStateManager.CurrentPhase is not null)
                {
                    await Clients.Caller.crawlPhaseChanged(_crawlStateManager.CurrentPhase);
                }

                foreach (var result in _crawlStateManager.CurrentResults)
                {
                    await Clients.Caller.crawlProgress(result);
                }
            }

            if (_enrichmentStateManager.IsRunning && _enrichmentStateManager.CurrentAuditKey.HasValue)
            {
                await Clients.Caller.enrichStarted(_enrichmentStateManager.CurrentAuditKey.Value);

                foreach (var result in _enrichmentStateManager.CurrentResults)
                {
                    await Clients.Caller.enrichProgress(result);
                }
            }

            if (_enrichmentStateManager.IsPageEnriching && _enrichmentStateManager.PageEnrichingUrl is not null)
            {
                await Clients.Caller.pageEnrichStarted(_enrichmentStateManager.PageEnrichingUrl);
            }

            await base.OnConnectedAsync();
        }
    }
}
