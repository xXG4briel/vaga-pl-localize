namespace server.Data
{
    public class UserDal
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public ICollection<CustomerDal> Customers { get; set; }
    }
}
