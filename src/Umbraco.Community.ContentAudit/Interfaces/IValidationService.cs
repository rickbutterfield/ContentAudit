using Umbraco.Community.ContentAudit.Models.Validation;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    /// <summary>
    /// Service for validating HTML markup using the W3C validator
    /// </summary>
    public interface IValidationService
    {
        /// <summary>
        /// Validates HTML content against W3C standards
        /// </summary>
        /// <param name="htmlContent">The HTML markup to validate</param>
        /// <returns>Validation result with errors and warnings, or null if validation fails</returns>
        Task<ValidationResult?> ValidateHtmlAsync(string htmlContent);

        /// <summary>
        /// Validates HTML from a URL against W3C standards
        /// </summary>
        /// <param name="url">The URL to fetch and validate</param>
        /// <returns>Validation result with errors and warnings, or null if validation fails</returns>
        Task<ValidationResult?> ValidateUrlAsync(string url);
    }
}
