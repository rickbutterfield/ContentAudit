using CommandLine;

namespace Umbraco.Community.ContentAudit.SchemaGenerator
{
    /// <summary>
    /// Command-line options for the schema generator
    /// </summary>
    public class Options
    {
        /// <summary>
        /// Gets or sets the output file path for the generated schema
        /// </summary>
        [Option('o', "outputFile", Required = false,
        HelpText = "Path to the output JSON schema file",
        Default = "..\\..\\..\\..\\..\\src\\Umbraco.Community.ContentAudit\\appsettings-schema.ContentAudit.json")]
        public string OutputFile { get; set; } = "..\\..\\..\\..\\..\\src\\Umbraco.Community.ContentAudit\\appsettings-schema.ContentAudit.json";
    }
}
