using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Http.Resilience;
using Microsoft.Playwright;
using OpenIddict.Validation.AspNetCore;
using Polly;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Community.ContentAudit.Api;
using Umbraco.Community.ContentAudit.Authorization;
using Umbraco.Community.ContentAudit.Composing;
using Umbraco.Community.ContentAudit.Configuration;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.NotificationHandlers;
using Umbraco.Community.ContentAudit.Repositories;
using Umbraco.Community.ContentAudit.Services;
using Umbraco.Community.ContentAudit.Services.Discovery;
using Umbraco.Community.ContentAudit.Services.Persistence;

namespace Umbraco.Community.ContentAudit
{
    /// <summary>
    /// Registers ContentAudit services, options, and authorization policies.
    /// </summary>
    public class Composer : IComposer
    {
        /// <summary>
        /// Configures dependency injection and runtime policies for ContentAudit.
        /// </summary>
        /// <param name="builder">The Umbraco builder.</param>
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

            builder.Services.AddHttpClient(Constants.HttpClientName, client =>
            {
                client.Timeout = TimeSpan.FromSeconds(30);
                client.DefaultRequestHeaders.UserAgent.ParseAdd("ContentAudit/1.0");
            })
            .AddResilienceHandler("CrawlerRetry", builder =>
            {
                builder.AddRetry(new HttpRetryStrategyOptions
                {
                    MaxRetryAttempts = 3,
                    Delay = TimeSpan.FromSeconds(1),
                    BackoffType = DelayBackoffType.Exponential,
                    UseJitter = true,
                    ShouldHandle = args => ValueTask.FromResult(
                        args.Outcome.Result?.IsSuccessStatusCode == false ||
                        args.Outcome.Exception is HttpRequestException or TaskCanceledException)
                });
            });

            builder.Services.AddScoped<IAuditRepository, AuditRepository>();
            builder.Services.AddScoped<IRobotsService, RobotsService>();
            builder.Services.AddScoped<ISitemapService, SitemapService>();
            builder.Services.AddScoped<IDataService, DataService>();
            builder.Services.AddScoped<ICrawlService, CrawlService>();
            builder.Services.AddScoped<IAuditService, AuditService>();
            builder.Services.AddScoped<IEmissionsService, EmissionsService>();
            builder.Services.AddScoped<IValidationService, ValidationService>();

            // Register global exception handler for API endpoints
            builder.Services.AddExceptionHandler<ContentAuditExceptionHandler>();

            // Register Playwright and browser page pool as singletons
            builder.Services.AddSingleton<IPlaywright>(_ => Playwright.CreateAsync().GetAwaiter().GetResult());
            builder.Services.AddSingleton<IBrowserPagePool, BrowserPagePool>();

            // Register URL discovery strategies
            builder.Services.AddScoped<IUrlDiscoveryStrategy, SitemapUrlDiscoveryStrategy>();
            builder.Services.AddScoped<IUrlDiscoveryStrategy, UmbracoContentUrlDiscoveryStrategy>();

            // Register crawl result persistence
            builder.Services.AddScoped<ICrawlResultPersistence, UmbracoCrawlResultPersistence>();

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
#pragma warning disable CS0618 // Type or member is obsolete
                    policy.RequireClaim(Cms.Core.Constants.Security.AllowedApplicationsClaimType, new[] { Constants.SectionAlias });
#pragma warning restore CS0618 // Type or member is obsolete
                });
            });
        }
    }
}
