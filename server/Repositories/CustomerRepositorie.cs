using Microsoft.IdentityModel.Tokens;
using server.Data;
using server.Entidades;
using server.Entities;

namespace server.Repositories
{
    public class CustomerRepositorie
    {
        public Context _context;
        private readonly IConfiguration _configuration;

        public CustomerRepositorie(IConfiguration configuration, Context context) { _context = context; _configuration = configuration; }

        public List<Bills> Index(int userId)
        {
            var customers = _context.Customers.Where(c => c.UserId == userId);
            List<Bills> result = new List<Bills>();
            
            DateTime today = DateTime.Now;

            foreach(var customer in customers)
            {
                var bills = _context.Bills.Where(b => b.CustomerId == customer.Id);

                result.Add(new Bills
                {
                    Id = customer.Id,
                    Name = customer.Name,
                    Open = bills.IsNullOrEmpty() ? 0 : _context.Bills.Count(x => x.Status == "open" && x.CustomerId == customer.Id),
                    Paid = bills.IsNullOrEmpty() ? 0 : _context.Bills.Count(x => x.Status == "paid" && x.CustomerId == customer.Id),
                    Overdue = bills.IsNullOrEmpty() ? 0 : _context.Bills.Count(x => x.Status != "paid" && x.DueDate < today && x.CustomerId == customer.Id),
                });

                bills = null;

            }

            return result;
        }

        public bool Update(int id, Customer data) {
            try
            {
                var customer = _context.Customers.Find(id);

                if(customer == null)
                {
                    return false;
                }
                customer.Name = data.Name;

                _context.Customers.Update(customer);

                var result = _context.SaveChanges();                

                return result > 0;
            }
            catch (Exception error)
            {
                return false;
            }
        }

        public bool Create(Customer data)
        {
            try
            {
                var customer = new CustomerDal
                {
                    Name = data.Name,
                    UserId = data.UserId
                };

                _context.Customers.Add(customer);
                var result = _context.SaveChanges();

                return result > 0;
            }
            catch (Exception error)
            {
                return false;
            }
        }

        public bool Delete(int id)
        {
            try
            {
                var customer = _context.Customers.Find(id);
                if (customer == null)
                {
                    return false;
                }
                var bills = _context.Bills.Where(x => x.CustomerId == id );
                if (!bills.IsNullOrEmpty())
                {
                    _context.Bills.RemoveRange(bills);
                    _context.SaveChanges();
                }

                _context.Customers.Remove(customer);
                _context.SaveChanges();

                return true;
            }
            catch (Exception error)
            {
                return false;
            }
        }
    }
}
