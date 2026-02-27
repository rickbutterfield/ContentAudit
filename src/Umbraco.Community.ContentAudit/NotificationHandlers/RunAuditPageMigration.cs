using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Migrations;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Scoping;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Cms.Infrastructure.Migrations.Upgrade;
using Umbraco.Community.ContentAudit.Migrations;

namespace Umbraco.Community.ContentAudit.NotificationHandlers
{
    /// <summary>
    /// Notification handler that executes Content Audit database migrations during application startup.
    /// </summary>
    /// <remarks>
    /// This handler runs all Content Audit migrations in sequence when the Umbraco application starts.
    /// It also ensures that the admin user group has access to the Content Audit section.
    /// The migration state is tracked using Umbraco's KeyValue service to prevent duplicate execution.
    /// </remarks>
    public class RunAuditPageMigration : INotificationAsyncHandler<UmbracoApplicationStartingNotification>
    {
        private readonly IMigrationPlanExecutor _migrationPlanExecutor;
        private readonly ICoreScopeProvider _coreScopeProvider;
        private readonly IKeyValueService _keyValueService;
        private readonly IRuntimeState _runtimeState;
        private readonly IUserGroupService _userGroupService;

        /// <summary>
        /// Initializes a new instance of the <see cref="RunAuditPageMigration"/> class.
        /// </summary>
        /// <param name="coreScopeProvider">The core scope provider for database operations.</param>
        /// <param name="migrationPlanExecutor">The migration plan executor.</param>
        /// <param name="keyValueService">The key-value service for tracking migration state.</param>
        /// <param name="userGroupService">The user group service for configuring section access.</param>
        /// <param name="runtimeState">The runtime state to check application readiness.</param>
        public RunAuditPageMigration(
            ICoreScopeProvider coreScopeProvider,
            IMigrationPlanExecutor migrationPlanExecutor,
            IKeyValueService keyValueService,
            IUserGroupService userGroupService,
            IRuntimeState runtimeState)
        {
            _migrationPlanExecutor = migrationPlanExecutor;
            _coreScopeProvider = coreScopeProvider;
            _keyValueService = keyValueService;
            _runtimeState = runtimeState;
            _userGroupService = userGroupService;
        }

        /// <summary>
        /// Handles the application starting notification to execute Content Audit migrations.
        /// </summary>
        /// <param name="notification">The application starting notification.</param>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <remarks>
        /// This method:
        /// 1. Checks if the runtime is at Run level before executing migrations
        /// 2. Creates a migration plan with all Content Audit migrations in sequence
        /// 3. Executes the migration plan using the Umbraco migration framework
        /// 4. Grants the admin user group access to the Content Audit section if not already configured
        /// 
        /// The migration plan includes:
        /// - InitialMigration: Creates all Content Audit database tables
        /// - AddHealthScoreMigration: Adds the HealthScore column to the overview table
        /// </remarks>
        public async Task HandleAsync(UmbracoApplicationStartingNotification notification, CancellationToken cancellationToken)
        {
            if (_runtimeState.Level < RuntimeLevel.Run)
                return;

            var migrationPlan = new MigrationPlan("ContentAudit");

            migrationPlan.From(string.Empty)
                .To<InitialMigration>("contentaudit-init")
                .To<AddHealthScoreMigration>("contentaudit-add-healthscore")
                .To<MigrateToAuditKeyMigration>("contentaudit-migrate-to-auditkey")
                .To<AddCrawlStateMigration>("contentaudit-add-crawlstate")
                .To<AddPageFingerprintMigration>("contentaudit-add-pagefingerprint")
                .To<AddIsEnrichedMigration>("contentaudit-add-isenriched");

            var upgrader = new Upgrader(migrationPlan);
            await upgrader.ExecuteAsync(
                _migrationPlanExecutor,
                _coreScopeProvider,
                _keyValueService);

            var adminGroup = await _userGroupService.GetAsync(Cms.Core.Constants.Security.AdminGroupAlias);
            if (adminGroup != null)
            {
                if (!adminGroup.AllowedSections.Contains(Constants.SectionAlias))
                {
                    adminGroup.AddAllowedSection(Constants.SectionAlias);
                    await _userGroupService.UpdateAsync(adminGroup, Cms.Core.Constants.Security.SuperUserKey);
                }
            }
        }
    }
}
