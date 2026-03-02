using System.Text.Json;
using System.Text.Json.Serialization;
using NJsonSchema.Generation;

namespace Umbraco.Community.ContentAudit.SchemaGenerator;

internal class ContentAuditSchemaGenerator : JsonSchemaGenerator
{
    public ContentAuditSchemaGenerator()
        : base(new SystemTextJsonSchemaGeneratorSettings
        {
            AlwaysAllowAdditionalObjectProperties = true,
            DefaultReferenceTypeNullHandling = ReferenceTypeNullHandling.NotNull,
            SchemaNameGenerator = new NamespacePrefixedSchemaNameGenerator(),
            IgnoreObsoleteProperties = true,
            GenerateExamples = true,
            SerializerOptions = new JsonSerializerOptions
            {
                Converters = { new JsonStringEnumConverter() },
            },
        })
    { }
}

internal class NamespacePrefixedSchemaNameGenerator : DefaultSchemaNameGenerator
{
    public override string Generate(Type type) =>
        type.Namespace!.Replace(".", string.Empty) + base.Generate(type);
}
