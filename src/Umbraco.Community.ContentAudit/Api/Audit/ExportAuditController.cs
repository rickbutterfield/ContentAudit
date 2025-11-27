using CsvHelper;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using Umbraco.Community.ContentAudit.ClassMaps;
using Umbraco.Community.ContentAudit.Interfaces;

namespace Umbraco.Community.ContentAudit.Api.Audit
{
    /// <summary>
    /// Exports audit data to a CSV file.
    /// </summary>
    public class ExportAuditController : AuditControllerBase
    {
        /// <summary>
        /// Initializes a new instance of the controller.
        /// </summary>
        /// <param name="dataService">Audit data service.</param>
        public ExportAuditController(IDataService dataService) : base(dataService) { }

        /// <summary>
        /// Returns a CSV export of all audit data.
        /// </summary>
        [HttpGet("export")]
        [ProducesResponseType(typeof(FileResult), 200, "text/csv")]
        public async Task<FileResult> Export()
        {
            var data = await DataService.GetExportData();

            using (var memoryStream = new MemoryStream())
            {
                using (var streamWriter = new StreamWriter(memoryStream))
                using (var csv = new CsvWriter(streamWriter, CultureInfo.InvariantCulture))
                {
                    csv.Context.RegisterClassMap<PageDtoMap>();
                    csv.Context.RegisterClassMap<SeoDtoMap>();
                    csv.Context.RegisterClassMap<ContentAnalysisDtoMap>();
                    csv.Context.RegisterClassMap<PerformanceDtoMap>();
                    csv.Context.RegisterClassMap<AccessibilityDtoMap>();
                    csv.Context.RegisterClassMap<TechnicalSeoDtoMap>();
                    csv.Context.RegisterClassMap<SocialMediaDtoMap>();
                    csv.Context.RegisterClassMap<ContentQualityDtoMap>();
                    csv.Context.RegisterClassMap<EmissionsDtoMap>();

                    csv.WriteRecords(data);
                }

                return File(memoryStream.ToArray(), "text/csv", $"Export-{DateTime.Now.ToString("s")}.csv");
            }
        }
    }
}
