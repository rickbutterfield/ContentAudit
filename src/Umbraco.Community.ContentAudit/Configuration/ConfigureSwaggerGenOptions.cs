using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Umbraco.Community.ContentAudit.Configuration
{
    /// <summary>
    /// Configures SwaggerGen for the ContentAudit API.
    /// </summary>
    public class ConfigureSwaggerGenOptions : IConfigureOptions<SwaggerGenOptions>
    {
        /// <summary>
        /// Applies operation ids and API document metadata.
        /// </summary>
        /// <param name="options">The SwaggerGen options to configure.</param>
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