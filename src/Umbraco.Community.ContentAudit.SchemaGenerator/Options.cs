using CommandLine;

namespace Umbraco.Community.ContentAudit.SchemaGenerator
{
    public class Options
    {
        [Option('o', "outputFile", Required = false,
        HelpText = "",
        Default = "..\\..\\..\\..\\Umbraco.Community.ContentAudit\\appsettings-schema.contentaudit.json")]
        public string OutputFile { get; set; } = "..\\..\\..\\..\\Umbraco.Community.ContentAudit\\appsettings-schema.contentaudit.json";
    }
}
