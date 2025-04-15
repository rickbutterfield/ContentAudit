using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    public class InitialMigration : MigrationBase
    {
        public InitialMigration(IMigrationContext context) : base(context)
        {
        }

        protected override void Migrate()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "InitialMigration");

            // Overview Table
            if (TableExists(OverviewSchema.TableName) == false)
            {
                Create.Table<OverviewSchema>().Do();
            }

            // Internal Page Table
            if (TableExists(PageSchema.TableName) == false)
            {
                Create.Table<PageSchema>().Do();
            }

            // Image Table
            if (TableExists(ImageSchema.TableName) == false)
            {
                Create.Table<ImageSchema>().Do();
            }

            // SEO Table
            if (TableExists(SeoSchema.TableName) == false)
            {
                Create.Table<SeoSchema>().Do();
            }

            // Content Analysis Table
            if (TableExists(ContentAnalysisSchema.TableName) == false)
            {
                Create.Table<ContentAnalysisSchema>().Do();
            }

            // Performance Table
            if (TableExists(PerformanceSchema.TableName) == false)
            {
                Create.Table<PerformanceSchema>().Do();
            }

            // Accessibility Table
            if (TableExists(AccessibilitySchema.TableName) == false)
            {
                Create.Table<AccessibilitySchema>().Do();
            }

            // Content Quality Table
            if (TableExists(ContentQualitySchema.TableName) == false)
            {
                Create.Table<ContentQualitySchema>().Do();
            }

            // Social Media Table
            if (TableExists(SocialMediaSchema.TableName) == false)
            {
                Create.Table<SocialMediaSchema>().Do();
            }

            // Technical SEO Table
            if (TableExists(TechnicalSeoSchema.TableName) == false)
            {
                Create.Table<TechnicalSeoSchema>().Do();
            }

            // Links Table
            if (TableExists(LinkSchema.TableName) == false)
            {
                Create.Table<LinkSchema>().Do();
            }

            // Resources Table
            if (TableExists(ResourceSchema.TableName) == false)
            {
                Create.Table<ResourceSchema>().Do();
            }
        }
    }
} 