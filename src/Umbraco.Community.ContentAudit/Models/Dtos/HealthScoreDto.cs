namespace Umbraco.Community.ContentAudit.Models.Dtos
{
    public class HealthScoreDto
    {
        public HealthScoreDto() { }

        public double HealthScore { get; set; }
        public int TotalPages { get; set; }
        public int PagesWithErrors { get; set; }
    }
}
