namespace ProMarketAPI.Models
{
    public class Contact
    {
        public long ID { get; set; }
        public long Company { get; set; }
        public string Name { get; set; }
        public string Position { get; set; }
        public string Email { get; set; }
        public Company CompanyData { get; set; }
    }
}
