using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.NotificationHandlers;
using Umbraco.Community.ContentAudit.Services;
using Umbraco.Community.ContentAudit.Composing;
using Umbraco.Community.ContentAudit.Common.Configuration;

#if NET9_0_OR_GREATER
using Umbraco.Community.ContentAudit.Configuration;
#else
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
            builder.Services.AddScoped<IPageScanningService, PageScanningService>();
            builder.Services.AddScoped<ICrawlerService, CrawlerService>();


            builder.WithCollectionBuilder<AuditIssueCollectionBuilder>()
                .Add(() => builder.TypeLoader.GetTypes<IAuditIssue>());

            var options = builder.Services.AddOptions<ContentAuditSettings>()
                .Bind(builder.Config.GetSection("ContentAudit"));

            options.ValidateDataAnnotations();

#if NET9_0_OR_GREATER
            builder.Services.ConfigureOptions<ConfigureSwaggerGenOptions>();
#else
            builder.Sections().Append<AuditSection>();
            builder.Dashboards().Add<ContentAuditDashboard>();
#endif
        }
    }
}
