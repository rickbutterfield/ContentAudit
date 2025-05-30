using System.Text;
using System.Text.Json;
using Umbraco.Community.ContentAudit.Models.Validation;
using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Services
{
    public class ValidationService : IValidationService
    {
        private readonly HttpClient _httpClient;
        private const string ValidatorUrl = "https://validator.w3.org/nu/";

        public ValidationService(HttpClient httpClient = null)
        {
            _httpClient = httpClient ?? new HttpClient();

            // Set required headers for W3C validator
            _httpClient.DefaultRequestHeaders.Add("User-Agent",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
        }

        /// <summary>
        /// Validates HTML content directly
        /// </summary>
        public async Task<ValidationResult?> ValidateHtmlAsync(string htmlContent)
        {
            using var content = new MultipartFormDataContent();

            // Add form fields exactly as the W3C validator expects
            content.Add(new StringContent("json"), "out");
            content.Add(new StringContent("yes"), "showsource");

            // Create HTML content with proper content type
            var htmlStringContent = new StringContent(htmlContent, Encoding.UTF8);
            htmlStringContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("text/html");
            htmlStringContent.Headers.ContentType.CharSet = "utf-8";
            content.Add(htmlStringContent, "content");

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
        /// Validates a webpage by URL
        /// </summary>
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

        public void Dispose()
        {
            _httpClient?.Dispose();
        }
    }
}
