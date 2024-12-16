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
    public class RunAuditPageMigration : INotificationHandler<UmbracoApplicationStartingNotification>
    {
        private readonly IMigrationPlanExecutor _migrationPlanExecutor;
        private readonly ICoreScopeProvider _coreScopeProvider;
        private readonly IKeyValueService _keyValueService;
        private readonly IRuntimeState _runtimeState;
#if NET8_0
        private readonly IUserService _userService;
#else
        private readonly IUserGroupService _userGroupService;
#endif

        public RunAuditPageMigration(
            ICoreScopeProvider coreScopeProvider,
            IMigrationPlanExecutor migrationPlanExecutor,
            IKeyValueService keyValueService,
#if NET8_0
            IUserService userService,
#else
            IUserGroupService userGroupService,
#endif
            IRuntimeState runtimeState)
        {
            _migrationPlanExecutor = migrationPlanExecutor;
            _coreScopeProvider = coreScopeProvider;
            _keyValueService = keyValueService;
            _runtimeState = runtimeState;
#if NET8_0
            _userService = userService;
#else
            _userGroupService = userGroupService;
#endif
        }
        public async void Handle(UmbracoApplicationStartingNotification notification)
        {
            if (_runtimeState.Level < RuntimeLevel.Run)
                return;

            var migrationPlan = new MigrationPlan("ContentAudit");

            migrationPlan.From(string.Empty)
                .To<AddInternalPageTable>("contentaudit-init")
                .To<AddOverviewTable>("contentaudit-overview")
                .To<AddOrphanedTable>("contentaudit-orphaned")
                .To<AddImageTable>("contentaudit-image")
                .To<AddExternalPageTable>("contentaudit-external");

            var upgrader = new Upgrader(migrationPlan);
            upgrader.Execute(
                _migrationPlanExecutor,
                _coreScopeProvider,
                _keyValueService);

#if NET8_0
            var adminGroup = _userService.GetUserGroupByAlias(Cms.Core.Constants.Security.AdminGroupAlias);
#else
            var adminGroup = await _userGroupService.GetAsync(Cms.Core.Constants.Security.AdminGroupAlias);
#endif
            if (adminGroup != null)
            {
                if (!adminGroup.AllowedSections.Contains(Constants.SectionAlias))
                {
                    adminGroup.AddAllowedSection(Constants.SectionAlias);
#if NET8_0
                    _userService.Save(adminGroup, new[] { Cms.Core.Constants.Security.SuperUserId });
#else
                    await _userGroupService.UpdateAsync(adminGroup, Cms.Core.Constants.Security.SuperUserKey);
#endif
                }
            }
        }
    }
}
