using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    public class InitialMigration : MigrationBase
    {
        private readonly IHostEnvironment _hostEnvironment;

        public InitialMigration(IMigrationContext context, IHostEnvironment hostEnvironment) : base(context)
        {
            _hostEnvironment = hostEnvironment;
        }

        protected override void Migrate()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "InitialMigration");

            if (TableExists(OverviewSchema.TableName) == false)
            {
                Create.Table<OverviewSchema>().Do();
            }
            if (TableExists(PageSchema.TableName) == false)
            {
                Create.Table<PageSchema>().Do();
            }
            if (TableExists(ImageSchema.TableName) == false)
            {
                Create.Table<ImageSchema>().Do();
            }
            if (TableExists(SeoSchema.TableName) == false)
            {
                Create.Table<SeoSchema>().Do();
            }
            if (TableExists(ContentAnalysisSchema.TableName) == false)
            {
                Create.Table<ContentAnalysisSchema>().Do();
            }
            if (TableExists(PerformanceSchema.TableName) == false)
            {
                Create.Table<PerformanceSchema>().Do();
            }
            if (TableExists(AccessibilitySchema.TableName) == false)
            {
                Create.Table<AccessibilitySchema>().Do();
            }
            if (TableExists(ContentQualitySchema.TableName) == false)
            {
                Create.Table<ContentQualitySchema>().Do();
            }
            if (TableExists(SocialMediaSchema.TableName) == false)
            {
                Create.Table<SocialMediaSchema>().Do();
            }
            if (TableExists(TechnicalSeoSchema.TableName) == false)
            {
                Create.Table<TechnicalSeoSchema>().Do();
            }
            if (TableExists(LinkSchema.TableName) == false)
            {
                Create.Table<LinkSchema>().Do();
            }
            if (TableExists(ResourceSchema.TableName) == false)
            {
                Create.Table<ResourceSchema>().Do();
            }
        }
    }
} 