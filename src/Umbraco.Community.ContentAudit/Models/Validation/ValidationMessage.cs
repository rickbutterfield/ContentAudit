namespace Umbraco.Community.ContentAudit.Models.Validation
{
    public class ValidationMessage
    {
        public string? Type { get; set; } // "error", "warning", "info"
        public int? LastLine { get; set; }
        public int? LastColumn { get; set; }
        public int? FirstLine { get; set; }
        public int? FirstColumn { get; set; }
        public string? Message { get; set; }
        public string? Extract { get; set; }
        public int? HiliteStart { get; set; }
        public int? HiliteLength { get; set; }
    }
}
