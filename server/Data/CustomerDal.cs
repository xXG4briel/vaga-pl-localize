namespace server.Data
{
    public class CustomerDal
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public UserDal User { get; set; }
    }
}
