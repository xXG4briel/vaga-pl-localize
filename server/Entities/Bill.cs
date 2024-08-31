namespace server.Entities
{
    public class Bill
    {
        public int Id { get; set; }
        public float Value { get; set; }
        public DateTime DueDate { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
        public int CustomerId { get; set; }
    }
}
