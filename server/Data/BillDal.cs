namespace server.Data
{
    public class BillDal
    {
        public int Id { get; set; }
        public float Value {  get; set; }
        public DateTime DueDate { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
        public int CustomerId { get; set; }
        public CustomerDal Customer { get; set; }
        public UserDal User { get; set; }
    }
}
