#if NET8_0_OR_GREATER
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Umbraco.Community.ContentAudit.Configuration
{
    public class ConfigureSwaggerGenOptions : IConfigureOptions<SwaggerGenOptions>
    {
        public void Configure(SwaggerGenOptions options)
        {
            options.CustomOperationIds(e => $"{e.ActionDescriptor.RouteValues["action"]}");

            options.SwaggerDoc(
                "content-audit",
                new OpenApiInfo
                {
                    Title = "ContentAudit API",
                    Version = "Latest",
                    Description = "Umbraco.Community.ContentAudit"
                });
        }
    }
}
#endif