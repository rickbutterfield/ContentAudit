namespace Umbraco.Community.ContentAudit.Models.Emissions
{
    public class EmissionResult
    {
        public double? DataCenterOperationalCO2e { get; set; }
        public double? NetworkOperationalCO2e { get; set; }
        public double? ConsumerDeviceOperationalCO2e { get; set; }
        public double? DataCenterEmbodiedCO2e { get; set; }
        public double? NetworkEmbodiedCO2e { get; set; }
        public double? ConsumerDeviceEmbodiedCO2e { get; set; }
        public double? TotalEmbodiedCO2e { get; set; }
        public double? TotalOperationalCO2e { get; set; }
        public double? DataCenterCO2e { get; set; }
        public double? NetworkCO2e { get; set; }
        public double? ConsumerDeviceCO2e { get; set; }
        public double? Total { get; set; }
        public string? Rating { get; set; }
        public double? FirstVisitCO2e { get; set; }
        public double? ReturnVisitCO2e { get; set; }
    }

}
