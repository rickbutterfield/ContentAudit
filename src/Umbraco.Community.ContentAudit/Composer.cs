using Microsoft.Extensions.DependencyInjection;
using Microsoft.Playwright;
using OpenIddict.Validation.AspNetCore;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Community.ContentAudit.Authorization;
using Umbraco.Community.ContentAudit.Composing;
using Umbraco.Community.ContentAudit.Configuration;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.NotificationHandlers;
using Umbraco.Community.ContentAudit.Repositories;
using Umbraco.Community.ContentAudit.Services;

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

            builder.AddNotificationAsyncHandler<UmbracoApplicationStartingNotification, RunAuditPageMigration>();

            builder.Services.AddScoped<IAuditRepository, AuditRepository>();
            builder.Services.AddScoped<IRobotsService, RobotsService>();
            builder.Services.AddScoped<ISitemapService, SitemapService>();
            builder.Services.AddScoped<IDataService, DataService>();
            builder.Services.AddScoped<ICrawlService, CrawlService>();
            builder.Services.AddScoped<IAuditService, AuditService>();
            builder.Services.AddScoped<IEmissionsService, EmissionsService>();
            builder.Services.AddScoped<IValidationService, ValidationService>();

            // Register Playwright as a singleton
            builder.Services.AddSingleton<IPlaywright>(_ => Playwright.CreateAsync().GetAwaiter().GetResult());

            builder.WithCollectionBuilder<AuditIssueCollectionBuilder>()
                .Add(() => builder.TypeLoader.GetTypes<IAuditIssue>());

            var options = builder.Services.AddOptions<ContentAuditSettings>()
                .Bind(builder.Config.GetSection("ContentAudit"))
                .ValidateDataAnnotations();

            builder.Services.ConfigureOptions<ConfigureSwaggerGenOptions>();

            builder.Services.AddAuthorization(config =>
            {
                config.AddPolicy(AuthorizationPolicies.SectionAccessContentAudit, policy =>
                {
                    policy.AuthenticationSchemes.Add(OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme);
                    policy.RequireClaim(Cms.Core.Constants.Security.AllowedApplicationsClaimType, Constants.SectionAlias);
                });
            });
        }
    }
}
