using Umbraco.Community.ContentAudit.Models.Validation;

namespace Umbraco.Community.ContentAudit.Extensions
{
    public static class ValidationResultExtensions
    {
        public static bool IsValid(this ValidationResult result)
        {
            return !result.HasErrors();
        }

        public static bool HasErrors(this ValidationResult result)
        {
            return result.Messages.Any(m => m.Type == "error");
        }

        public static bool HasWarnings(this ValidationResult result)
        {
            return result.Messages.Any(m => m.Type == "warning");
        }

        public static IEnumerable<ValidationMessage> GetErrors(this ValidationResult result)
        {
            return result.Messages.Where(m => m.Type == "error");
        }

        public static IEnumerable<ValidationMessage> GetWarnings(this ValidationResult result)
        {
            return result.Messages.Where(m => m.Type == "warning");
        }

        public static int ErrorCount(this ValidationResult result)
        {
            return result.GetErrors().Count();
        }

        public static int WarningCount(this ValidationResult result)
        {
            return result.GetWarnings().Count();
        }
    }
}
