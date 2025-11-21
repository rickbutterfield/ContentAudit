using CommandLine;

namespace Umbraco.Community.ContentAudit.SchemaGenerator
{
    public class Options
    {
        [Option('o', "outputFile", Required = false,
        HelpText = "",
        Default = "..\\..\\..\\..\\..\\src\\Umbraco.Community.ContentAudit\\appsettings-schema.ContentAudit.json")]
        public string OutputFile { get; set; } = "..\\..\\..\\..\\..\\src\\Umbraco.Community.ContentAudit\\appsettings-schema.ContentAudit.json";
    }
}
