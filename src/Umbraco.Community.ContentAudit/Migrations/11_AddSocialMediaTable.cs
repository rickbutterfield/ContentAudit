using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.ContentAudit.Schemas;

namespace Umbraco.Community.ContentAudit.Migrations
{
    public class AddSocialMediaTable : MigrationBase
    {
        public AddSocialMediaTable(IMigrationContext context) : base(context)
        {
        }

        protected override void Migrate()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "AddSocialMediaTable");

            if (TableExists(SocialMediaSchema.TableName) == false)
            {
                Create.Table<SocialMediaSchema>().Do();
            }
            else
            {
                Logger.LogDebug("The database table {DbTable} already exists, skipping", SocialMediaSchema.TableName);
            }
        }
    }
}