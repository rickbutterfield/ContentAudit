using System.ComponentModel.DataAnnotations;

namespace Umbraco.Community.ContentAudit.Configuration
{
    /// <summary>
    /// Validates that a string is a valid URL, but allows null or empty values.
    /// </summary>
    public class OptionalUrlAttribute : ValidationAttribute
    {
        /// <inheritdoc/>
        public override bool IsValid(object? value)
        {
            if (value is null || (value is string str && string.IsNullOrEmpty(str)))
                return true;

            if (value is not string urlString)
                return false;

            return Uri.TryCreate(urlString, UriKind.Absolute, out var uri)
                && (uri.Scheme == Uri.UriSchemeHttp || uri.Scheme == Uri.UriSchemeHttps);
        }
    }
}
