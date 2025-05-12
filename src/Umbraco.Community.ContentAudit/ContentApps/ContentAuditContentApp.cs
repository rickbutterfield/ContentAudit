#if NET8_0
using Microsoft.Extensions.DependencyInjection;
using System.Runtime.CompilerServices;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.ContentEditing;
using Umbraco.Cms.Core.Models.Membership;
using Umbraco.Cms.Core.PublishedCache;
using Umbraco.Cms.Infrastructure.Scoping;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Extensions;

namespace Umbraco.Community.ContentAudit.ContentApps
{
    public class ContentAuditContentApp : IContentAppFactory
    {
        private readonly IScopedServiceProvider _scopedServiceProvider;

        public ContentAuditContentApp(IScopedServiceProvider scopedServiceProvider)
        {
            _scopedServiceProvider = scopedServiceProvider;
        }

        public ContentApp? GetContentAppFor(object source, IEnumerable<IReadOnlyUserGroup> userGroups)
        {
            // Only show app on content items
            if (!(source is IContent))
                return null;

            var content = (IContent)source;

            if (!content.Published)
                return null;

            using var scope = _scopedServiceProvider.ServiceProvider?.CreateScope();

            var publishedContentQueryAccessor = scope.ServiceProvider.GetService<IPublishedContentQueryAccessor>();
            if (publishedContentQueryAccessor == null)
                return null;

            publishedContentQueryAccessor.TryGetValue(out IPublishedContentQuery? publishedContentQuery);
            if (publishedContentQuery == null)
                return null;

            var publishedContent = publishedContentQuery.Content(content.Id);
            if (publishedContent == null)
                return null;

            var dataService = scope.ServiceProvider.GetService<IDataService>();
            if (dataService == null)
                return null;

            var auditData = dataService.GetLatestPageAuditData(publishedContent.Key).Result;
            if (auditData == null)
                return null;

            return new ContentApp
            {
                Alias = "contentAudit",
                Name = "Audit",
                Icon = "icon-scan",
                View = "/App_Plugins/UmbracoCommunityContentAudit/views/contentApp.html",
                Weight = 0
            };
        }
    }
}
#endif