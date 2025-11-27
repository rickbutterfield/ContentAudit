using Umbraco.Community.ContentAudit.Models.Validation;

namespace Umbraco.Community.ContentAudit.Extensions
{
    /// <summary>
    /// Convenience extension methods for <see cref="ValidationResult"/>.
    /// </summary>
    public static class ValidationResultExtensions
    {
        /// <summary>
        /// Returns true when there are no errors.
        /// </summary>
        /// <param name="result">The validation result.</param>
        public static bool IsValid(this ValidationResult result)
        {
            return !result.HasErrors();
        }

        /// <summary>
        /// Returns true when at least one error exists.
        /// </summary>
        /// <param name="result">The validation result.</param>
        public static bool HasErrors(this ValidationResult result)
        {
            return result.Messages?.Any(m => m.Type == "error") == true;
        }

        /// <summary>
        /// Returns true when at least one warning exists.
        /// </summary>
        /// <param name="result">The validation result.</param>
        public static bool HasWarnings(this ValidationResult result)
        {
            return result.Messages?.Any(m => m.Type == "warning") == true;
        }

        /// <summary>
        /// Gets all error messages.
        /// </summary>
        /// <param name="result">The validation result.</param>
        /// <returns>Error messages.</returns>
        public static IEnumerable<ValidationMessage>? GetErrors(this ValidationResult result)
        {
            return result.Messages?.Where(m => m.Type == "error");
        }

        /// <summary>
        /// Gets all warning messages.
        /// </summary>
        /// <param name="result">The validation result.</param>
        /// <returns>Warning messages.</returns>
        public static IEnumerable<ValidationMessage>? GetWarnings(this ValidationResult result)
        {
            return result.Messages?.Where(m => m.Type == "warning");
        }

        /// <summary>
        /// Counts error messages.
        /// </summary>
        /// <param name="result">The validation result.</param>
        /// <returns>Error count.</returns>
        public static int ErrorCount(this ValidationResult result)
        {
            return result.GetErrors()?.Count() ?? 0;
        }

        /// <summary>
        /// Counts warning messages.
        /// </summary>
        /// <param name="result">The validation result.</param>
        /// <returns>Warning count.</returns>
        public static int WarningCount(this ValidationResult result)
        {
            return result.GetWarnings()?.Count() ?? 0;
        }
    }
}
