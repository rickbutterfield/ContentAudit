using Umbraco.Community.ContentAudit.Models.Validation;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    public interface IValidationService
    {
        Task<ValidationResult?> ValidateHtmlAsync(string htmlContent);
        Task<ValidationResult?> ValidateUrlAsync(string url);
    }
}
