using NJsonSchema.Generation;
using System;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;
using Umbraco.Community.ContentAudit.Configuration;

namespace Umbraco.Community.ContentAudit.SchemaGenerator
{
    internal class ContentAuditSchemaGenerator
    {
        private readonly JsonSchemaGenerator _schemaGenerator;

        public ContentAuditSchemaGenerator()
        {
            _schemaGenerator = new JsonSchemaGenerator(new ContentAuditSchemaGeneratorSettings());
        }

        public string Generate()
        {
            var contentAuditSchema = GenerateContentAuditSchema();
            return contentAuditSchema.ToString();
        }

        private JsonObject GenerateContentAuditSchema()
        {
            var schema = _schemaGenerator.Generate(typeof(ContentAuditOptions));
            return JsonSerializer.Deserialize<JsonObject>(schema.ToJson());
        }
    }

    internal class ContentAuditSchemaGeneratorSettings : SystemTextJsonSchemaGeneratorSettings
    {
        public ContentAuditSchemaGeneratorSettings()
        {
            AlwaysAllowAdditionalObjectProperties = true;
            SerializerOptions = new JsonSerializerOptions()
            {
                
            };
            DefaultReferenceTypeNullHandling = ReferenceTypeNullHandling.NotNull;
            SchemaNameGenerator = new NamespacePrefixedSchemaNameGenerator();
            SerializerOptions.Converters.Add(new JsonStringEnumConverter());
            IgnoreObsoleteProperties = true;
            GenerateExamples = true;
        }
    }

    internal class NamespacePrefixedSchemaNameGenerator : DefaultSchemaNameGenerator
    {
        public override string Generate(Type type) => type.Namespace.Replace(".", string.Empty) + base.Generate(type);
    }
}
