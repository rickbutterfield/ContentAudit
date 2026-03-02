using CommandLine;

namespace Umbraco.Community.ContentAudit.SchemaGenerator;

internal class Options
{
    [Option('o', "outputFile", Required = false,
        HelpText = "Path to the output JSON schema file",
        Default = @"..\..\..\..\..\src\Umbraco.Community.ContentAudit\appsettings-schema.ContentAudit.json")]
    public string OutputFile { get; set; } = null!;
}
