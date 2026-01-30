using System.Text.RegularExpressions;

namespace Umbraco.Community.ContentAudit.Extensions
{
    /// <summary>
    /// Extension methods for URL normalization and handling
    /// </summary>
    public static partial class UrlExtensions
    {
        /// <summary>
        /// Normalizes a URL for consistent comparison and deduplication
        /// </summary>
        /// <param name="url">The URL to normalize</param>
        /// <param name="preserveTrailingSlash">Whether to preserve trailing slashes (default: true)</param>
        /// <returns>Normalized URL string</returns>
        public static string NormalizeUrl(this string url, bool preserveTrailingSlash = true)
        {
            if (string.IsNullOrWhiteSpace(url))
                return url;

            // Try to parse as URI for proper normalization
            if (!Uri.TryCreate(url, UriKind.Absolute, out var uri))
                return url;

            var builder = new UriBuilder(uri);

            // Lowercase the scheme and host
            builder.Scheme = builder.Scheme.ToLowerInvariant();
            builder.Host = builder.Host.ToLowerInvariant();

            // Remove default ports
            if ((builder.Scheme == "http" && builder.Port == 80) ||
                (builder.Scheme == "https" && builder.Port == 443))
            {
                builder.Port = -1;
            }

            // Normalize the path
            var path = builder.Path;

            // Remove duplicate slashes
            path = DuplicateSlashRegex().Replace(path, "/");

            // Decode unnecessarily encoded characters (safe characters)
            path = Uri.UnescapeDataString(path);

            // Re-encode to ensure consistency
            // But preserve already-decoded safe characters
            path = path.Replace(" ", "%20");

            // Handle trailing slash
            if (!preserveTrailingSlash && path.Length > 1 && path.EndsWith('/'))
            {
                path = path.TrimEnd('/');
            }
            else if (preserveTrailingSlash && path.Length > 1 && !path.EndsWith('/') && !HasFileExtension(path))
            {
                path += '/';
            }

            builder.Path = path;

            // Remove empty query string
            if (builder.Query == "?")
            {
                builder.Query = string.Empty;
            }

            // Remove fragment
            builder.Fragment = string.Empty;

            return builder.Uri.ToString();
        }

        /// <summary>
        /// Normalizes a URL and removes the query string
        /// </summary>
        public static string NormalizeUrlWithoutQuery(this string url, bool preserveTrailingSlash = true)
        {
            var normalized = url.NormalizeUrl(preserveTrailingSlash);

            if (Uri.TryCreate(normalized, UriKind.Absolute, out var uri))
            {
                var builder = new UriBuilder(uri)
                {
                    Query = string.Empty
                };
                return builder.Uri.ToString();
            }

            // Fallback: remove query string manually
            var queryIndex = normalized.IndexOf('?');
            return queryIndex >= 0 ? normalized[..queryIndex] : normalized;
        }

        /// <summary>
        /// Checks if two URLs are equivalent after normalization
        /// </summary>
        public static bool UrlEquals(this string url1, string url2, bool preserveTrailingSlash = true)
        {
            if (string.IsNullOrEmpty(url1) && string.IsNullOrEmpty(url2))
                return true;

            if (string.IsNullOrEmpty(url1) || string.IsNullOrEmpty(url2))
                return false;

            return url1.NormalizeUrl(preserveTrailingSlash)
                .Equals(url2.NormalizeUrl(preserveTrailingSlash), StringComparison.OrdinalIgnoreCase);
        }

        private static bool HasFileExtension(string path)
        {
            var lastSegment = path.Split('/').LastOrDefault();
            if (string.IsNullOrEmpty(lastSegment))
                return false;

            var dotIndex = lastSegment.LastIndexOf('.');
            if (dotIndex <= 0 || dotIndex == lastSegment.Length - 1)
                return false;

            var extension = lastSegment[(dotIndex + 1)..];
            return extension.Length >= 2 && extension.Length <= 5 && extension.All(char.IsLetterOrDigit);
        }

        [GeneratedRegex(@"/+")]
        private static partial Regex DuplicateSlashRegex();

        /// <summary>
        /// Checks if a URL matches any of the given patterns.
        /// Supports wildcards: * (single segment) and ** (multiple segments)
        /// </summary>
        public static bool MatchesAnyPattern(this string url, IEnumerable<string>? patterns)
        {
            if (patterns == null || !patterns.Any())
                return false;

            // Extract path from URL for matching
            string pathToMatch = url;
            if (Uri.TryCreate(url, UriKind.Absolute, out var uri))
            {
                pathToMatch = uri.AbsolutePath + uri.Query;
            }

            foreach (var pattern in patterns)
            {
                if (MatchesPattern(pathToMatch, pattern))
                    return true;
            }

            return false;
        }

        /// <summary>
        /// Checks if a URL path matches a single pattern
        /// </summary>
        private static bool MatchesPattern(string path, string pattern)
        {
            // Convert glob pattern to regex
            var regexPattern = "^" + Regex.Escape(pattern)
                .Replace("\\*\\*", ".*")      // ** matches anything including /
                .Replace("\\*", "[^/]*")      // * matches anything except /
                .Replace("\\?", ".")          // ? matches single character
                + "$";

            return Regex.IsMatch(path, regexPattern, RegexOptions.IgnoreCase);
        }

        /// <summary>
        /// Checks if a URL should be excluded based on patterns
        /// </summary>
        public static bool ShouldExcludeUrl(this string url, IEnumerable<string>? excludePatterns, IEnumerable<string>? includePatterns)
        {
            // If include patterns are specified, URL must match at least one
            if (includePatterns != null && includePatterns.Any())
            {
                if (!url.MatchesAnyPattern(includePatterns))
                    return true;
            }

            // Check exclude patterns
            if (url.MatchesAnyPattern(excludePatterns))
                return true;

            return false;
        }
    }
}
