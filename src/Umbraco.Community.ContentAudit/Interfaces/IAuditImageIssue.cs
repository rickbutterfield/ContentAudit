using Umbraco.Community.ContentAudit.Models;
using Umbraco.Community.ContentAudit.Models.Dtos;

namespace Umbraco.Community.ContentAudit.Interfaces
{
    /// <summary>
    /// Defines an audit issue specific to image analysis
    /// </summary>
    public interface IAuditImageIssue : IAuditIssue
    {
        /// <summary>
        /// Checks a collection of images for this specific issue
        /// </summary>
        /// <param name="images">The images to analyze</param>
        /// <param name="pages">The pages for context</param>
        /// <returns>Images that have this issue</returns>
        IEnumerable<ImageDto> CheckImages(IEnumerable<ImageDto> images, IEnumerable<PageAnalysisDto> pages);
    }
}
