using CommandLine;
using Umbraco.Community.ContentAudit.SchemaGenerator;

await Parser.Default.ParseArguments<Options>(args).WithParsedAsync(async options =>
{
    var generator = new ContentAuditSchemaGenerator();
    var schema = generator.Generate(typeof(ContentAuditSchema));

    var path = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, options.OutputFile));
    Directory.CreateDirectory(Path.GetDirectoryName(path)!);
    await File.WriteAllTextAsync(path, schema.ToJson());

    Console.WriteLine("Schema written to {0}", path);
});
