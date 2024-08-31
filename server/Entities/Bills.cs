namespace server.Entities
{
    public class Bills
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Paid { get; set; }
        public int Overdue { get; set; }
        public int Open { get; set; }

    }
}
