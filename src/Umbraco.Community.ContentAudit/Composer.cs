using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Community.ContentAudit.Configuration;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.NotificationHandlers;
using Umbraco.Community.ContentAudit.Services;
using Umbraco.Community.ContentAudit.Composing;
using Umbraco.Community.ContentAudit.Common.Configuration;

#if NET8_0
using Umbraco.Community.ContentAudit.Sections;
using Umbraco.Community.ContentAudit.Dashboards;
#endif

namespace Umbraco.Community.ContentAudit
{
    public class Composer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.AddNotificationHandler<UmbracoApplicationStartingNotification, RunAuditPageMigration>();

            builder.Services.AddScoped<IRobotsService, RobotsService>();
            builder.Services.AddScoped<ISitemapService, SitemapService>();
            builder.Services.AddScoped<IAuditService, AuditService>();
            builder.Services.AddScoped<ICrawlerService, CrawlerService>();

            builder.Services.ConfigureOptions<ConfigureSwaggerGenOptions>();

            builder.WithCollectionBuilder<AuditIssueCollectionBuilder>()
                .Add(() => builder.TypeLoader.GetTypes<IAuditIssue>());

            var options = builder.Services.AddOptions<ContentAuditSettings>()
                .Bind(builder.Config.GetSection("ContentAudit"));

            options.ValidateDataAnnotations();

#if NET8_0
            builder.Sections().Append<AuditSection>();
            builder.Dashboards().Add<ContentAuditDashboard>();
#endif
        }
    }
}
