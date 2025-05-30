namespace Umbraco.Community.ContentAudit.Models.Validation
{
    public class ValidationResult
    {
        public List<ValidationMessage>? Messages { get; set; } = new();
        public ValidationSource? Source { get; set; }
        public string? Url { get; set; }
        public string? Language { get; set; }
    }
}
