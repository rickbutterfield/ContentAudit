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

        public ContentAuditHub(ICrawlStateManager crawlStateManager)
            => _crawlStateManager = crawlStateManager;

        public override async Task OnConnectedAsync()
        {
            if (_crawlStateManager.IsRunning)
            {
                await Clients.Caller.crawlStarted();

                foreach (var result in _crawlStateManager.CurrentResults)
                {
                    await Clients.Caller.crawlProgress(result);
                }
            }

            await base.OnConnectedAsync();
        }
    }
}
