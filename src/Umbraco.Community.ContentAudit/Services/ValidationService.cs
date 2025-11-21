using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Umbraco.Community.ContentAudit.Interfaces;
using Umbraco.Community.ContentAudit.Models.Validation;

namespace Umbraco.Community.ContentAudit.Services
{
    /// <summary>
    /// Service for validating HTML content or webpages using the W3C Nu HTML Checker (validator.w3.org).
    /// </summary>
    /// <remarks>
    /// Uses an internal <see cref="HttpClient"/> instance unless one is provided via the constructor.
    /// Results are deserialized into <see cref="ValidationResult"/>.
    /// </remarks>
    public class ValidationService : IValidationService
    {
        private readonly HttpClient _httpClient;
        private const string ValidatorUrl = "https://validator.w3.org/nu/";

        /// <summary>
        /// Initializes a new instance of the <see cref="ValidationService"/> class.
        /// </summary>
        /// <param name="httpClient">
        /// Optional <see cref="HttpClient"/> to use for requests. If null, a new instance will be created.
        /// </param>
        public ValidationService(HttpClient httpClient = null)
        {
            _httpClient = httpClient ?? new HttpClient();

            // Set required headers for W3C validator
            _httpClient.DefaultRequestHeaders.Add("User-Agent",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
        }

        /// <summary>
        /// Validates HTML content directly by posting the markup to the W3C validator.
        /// </summary>
        /// <param name="htmlContent">The HTML markup to validate.</param>
        /// <returns>
        /// A <see cref="ValidationResult"/> containing validation messages and source information,
        /// or null if deserialization fails.
        /// </returns>
        /// <exception cref="HttpRequestException">Thrown when the validator response indicates a non-success status code.</exception>
        public async Task<ValidationResult?> ValidateHtmlAsync(string htmlContent)
        {
            using var client = new HttpClient();
            client.DefaultRequestHeaders.UserAgent.ParseAdd("ValidatorPostExample/1.0");

            using var form = new MultipartFormDataContent
            {
                { new StringContent("yes", Encoding.UTF8), "showsource" },
                { new StringContent("json", Encoding.UTF8), "out" }
            };

            var contentPart = new StringContent(htmlContent, Encoding.UTF8, "text/html");
            form.Add(contentPart, "content");

            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var url = "https://validator.w3.org/nu/";
            HttpResponseMessage response = await client.PostAsync(url, form);
            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadAsStringAsync();

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                PropertyNameCaseInsensitive = true
            };

            return JsonSerializer.Deserialize<ValidationResult>(jsonResponse, options);
        }

        /// <summary>
        /// Validates a webpage by URL using the W3C validator service.
        /// </summary>
        /// <param name="url">The absolute URL of the webpage to validate.</param>
        /// <returns>
        /// A <see cref="ValidationResult"/> containing validation messages and source information,
        /// or null if deserialization fails.
        /// </returns>
        /// <exception cref="HttpRequestException">Thrown when the validator response indicates a non-success status code.</exception>
        public async Task<ValidationResult?> ValidateUrlAsync(string url)
        {
            using var content = new MultipartFormDataContent();
            content.Add(new StringContent("json"), "out");
            content.Add(new StringContent("yes"), "showsource");
            content.Add(new StringContent(url), "doc");

            var response = await _httpClient.PostAsync(ValidatorUrl, content);
            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadAsStringAsync();

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                PropertyNameCaseInsensitive = true
            };

            return JsonSerializer.Deserialize<ValidationResult>(jsonResponse, options);
        }

        /// <summary>
        /// Releases resources used by this service.
        /// </summary>
        /// <remarks>
        /// Disposes the internal <see cref="HttpClient"/> instance if one exists.
        /// If an external <see cref="HttpClient"/> was provided to the constructor, disposing it here
        /// may not be desirable; this implementation disposes regardless of origin.
        /// </remarks>
        public void Dispose()
        {
            _httpClient?.Dispose();
        }
    }
}
