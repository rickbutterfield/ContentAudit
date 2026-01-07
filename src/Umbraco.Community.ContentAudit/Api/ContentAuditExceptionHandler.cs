using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Umbraco.Community.ContentAudit.Api
{
    /// <summary>
    /// Global exception handler for ContentAudit API endpoints.
    /// Returns RFC 7807 ProblemDetails for unhandled exceptions.
    /// </summary>
    public class ContentAuditExceptionHandler : IExceptionHandler
    {
        private readonly ILogger<ContentAuditExceptionHandler> _logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="ContentAuditExceptionHandler"/> class.
        /// </summary>
        /// <param name="logger">The logger instance.</param>
        public ContentAuditExceptionHandler(ILogger<ContentAuditExceptionHandler> logger)
        {
            _logger = logger;
        }

        /// <inheritdoc/>
        public async ValueTask<bool> TryHandleAsync(
            HttpContext httpContext,
            Exception exception,
            CancellationToken cancellationToken)
        {
            if (!httpContext.Request.Path.StartsWithSegments("/umbraco/content-audit"))
            {
                return false;
            }

            _logger.LogError(exception, "Unhandled exception in ContentAudit API: {Message}", exception.Message);

            var problemDetails = new ProblemDetails
            {
                Status = StatusCodes.Status500InternalServerError,
                Title = "An error occurred while processing your request",
                Type = "https://tools.ietf.org/html/rfc7807",
                Instance = httpContext.Request.Path
            };

            if (exception is OperationCanceledException)
            {
                problemDetails.Status = StatusCodes.Status499ClientClosedRequest;
                problemDetails.Title = "Request was cancelled";
            }
            else if (exception is ArgumentException argumentException)
            {
                problemDetails.Status = StatusCodes.Status400BadRequest;
                problemDetails.Title = "Invalid argument";
                problemDetails.Detail = argumentException.Message;
            }
            else if (exception is InvalidOperationException invalidOpException)
            {
                problemDetails.Status = StatusCodes.Status400BadRequest;
                problemDetails.Title = "Invalid operation";
                problemDetails.Detail = invalidOpException.Message;
            }
            else if (exception is KeyNotFoundException)
            {
                problemDetails.Status = StatusCodes.Status404NotFound;
                problemDetails.Title = "Resource not found";
            }

            httpContext.Response.StatusCode = problemDetails.Status ?? StatusCodes.Status500InternalServerError;
            httpContext.Response.ContentType = "application/problem+json";

            await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);

            return true;
        }
    }
}
