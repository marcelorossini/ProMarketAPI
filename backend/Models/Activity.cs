namespace ProMarketAPI.Models
{
    public class Activity
    {
        public long ID { get; set; }
        public long Company { get; set; }
        public string Date { get; set; }
        public string Description { get; set; }
        public Company CompanyData { get; set; }
    }
}
