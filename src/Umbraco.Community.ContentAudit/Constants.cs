namespace Umbraco.Community.ContentAudit
{
    public class Constants
    {
        public static string Alias => "ContentAudit";
        public static string Name => "Audit";
#if NET8_0
        public static string SectionAlias => "audit";
#else
        public static string SectionAlias => "Umb.Section.ContentAudit";
#endif
        public static string MetadataTreeAlias => "contentMetadata";
    }
}
