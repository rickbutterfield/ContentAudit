using Umbraco.Community.ContentAudit.Models;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    /// <summary>
    /// Defines an audit issue specific to page analysis
    /// </summary>
    public interface IAuditPageIssue : IAuditIssue
    {
        /// <summary>
        /// Checks a collection of pages for this specific issue
        /// </summary>
        /// <param name="pages">The pages to analyze</param>
        /// <returns>Pages that have this issue</returns>
        IEnumerable<PageAnalysisDto> CheckPages(IEnumerable<PageAnalysisDto> pages);
    }
}
