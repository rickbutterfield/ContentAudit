using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    /// <summary>
    /// Initial database migration that creates all Content Audit tables.
    /// </summary>
    /// <remarks>
    /// This migration creates the following database tables:
    /// - umbContentAuditOverview: Stores audit run summaries
    /// - umbContentAuditPage: Stores page-level audit data
    /// - umbContentAuditImage: Stores image metadata and analysis
    /// - umbContentAuditSeo: Stores SEO-related data
    /// - umbContentAuditContentAnalysis: Stores content analysis metrics
    /// - umbContentAuditPerformance: Stores performance metrics
    /// - umbContentAuditAccessibility: Stores accessibility data
    /// - umbContentAuditContentQuality: Stores content quality assessments
    /// - umbContentAuditSocialMedia: Stores social media integration data
    /// - umbContentAuditTechnicalSeo: Stores technical SEO data
    /// - umbContentAuditLink: Stores discovered links
    /// - umbContentAuditResource: Stores resource references (CSS, JS, etc.)
    /// </remarks>
    public class InitialMigration : AsyncMigrationBase
    {
        /// <summary>
        /// Initializes a new instance of the migration.
        /// </summary>
        /// <param name="context">The migration context.</param>
        /// <param name="hostEnvironment">The hosting environment.</param>
        public InitialMigration(IMigrationContext context, IHostEnvironment hostEnvironment) : base(context) { }

        /// <summary>
        /// Executes the migration to create all Content Audit database tables.
        /// </summary>
        /// <remarks>
        /// Each table is checked for existence before creation to support idempotent migrations.
        /// Tables are created using NPoco schema definitions from the corresponding schema classes.
        /// </remarks>
        protected override Task MigrateAsync()
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

            return Task.CompletedTask;
        }
    }
}