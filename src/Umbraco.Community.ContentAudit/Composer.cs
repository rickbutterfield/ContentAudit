using Microsoft.Extensions.DependencyInjection;
using Microsoft.Playwright;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Community.ContentAudit.Composing;
using Umbraco.Community.ContentAudit.Configuration;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.NotificationHandlers;
using Umbraco.Community.ContentAudit.Repositories;
using Umbraco.Community.ContentAudit.Services;
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
            string value = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
            Environment.SetEnvironmentVariable("PLAYWRIGHT_BROWSERS_PATH", Path.Join(value, "ms-playwright"));

            var exitCode = Program.Main(new[] { "install", "chromium" });
            if (exitCode != 0)
            {
                throw new Exception($"Playwright exited with code {exitCode}");
            }

            builder.AddNotificationHandler<UmbracoApplicationStartingNotification, RunAuditPageMigration>();

            builder.Services.AddScoped<IAuditRepository, AuditRepository>();
            builder.Services.AddScoped<IRobotsService, RobotsService>();
            builder.Services.AddScoped<ISitemapService, SitemapService>();
            builder.Services.AddScoped<IDataService, DataService>();
            builder.Services.AddScoped<ICrawlService, CrawlService>();
            builder.Services.AddScoped<IAuditService, AuditService>();
            builder.Services.AddScoped<IEmissionsService, EmissionsService>();

            // Register Playwright as a singleton
            builder.Services.AddSingleton<IPlaywright>(_ => Playwright.CreateAsync().GetAwaiter().GetResult());

            builder.WithCollectionBuilder<AuditIssueCollectionBuilder>()
                .Add(() => builder.TypeLoader.GetTypes<IAuditIssue>());

            var options = builder.Services.AddOptions<ContentAuditSettings>()
                .Bind(builder.Config.GetSection("ContentAudit"))
                .ValidateDataAnnotations();

#if NET9_0_OR_GREATER
            builder.Services.ConfigureOptions<ConfigureSwaggerGenOptions>();
#else
            builder.Sections().Append<AuditSection>();
            builder.Dashboards().Add<ContentAuditDashboard>();
#endif
        }
    }
}
