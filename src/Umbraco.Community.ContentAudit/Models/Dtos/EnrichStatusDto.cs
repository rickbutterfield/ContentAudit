namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    /// <summary>
    /// Status of an in-progress or completed performance enrichment operation.
    /// </summary>
    public class EnrichStatusDto
    {
        /// <summary>
        /// Gets or sets whether an enrichment is currently running.
        /// </summary>
        public bool IsRunning { get; set; }

        /// <summary>
        /// Gets or sets the audit key being enriched, if any.
        /// </summary>
        public Guid? AuditKey { get; set; }

        /// <summary>
        /// Gets or sets the list of pages processed so far.
        /// </summary>
        public IReadOnlyList<CrawlDto> Results { get; set; } = [];
    }
}
