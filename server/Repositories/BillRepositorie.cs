using Microsoft.IdentityModel.Tokens;
using server.Data;
using server.Entidades;
using server.Entities;

namespace server.Repositories
{
    public class BillRepositorie
    {
        public Context _context;
        private readonly IConfiguration _configuration;

        public BillRepositorie(IConfiguration configuration, Context context) { _context = context; _configuration = configuration; }

        public Bill? Find(int customerId, int id)
        {
            var customer = _context.Bills.Where(b => b.Id == id && b.CustomerId == customerId).FirstOrDefault();

            if(customer == null)
            {
                return null;
            }

            return new Bill
            {
                Id = customer.Id,
                UserId = customer.UserId,
                CustomerId = customer.CustomerId,
                Description = customer.Description,
                DueDate = customer.DueDate,
                Status = customer.Status,
                Value = customer.Value,
            };
        }
        public List<Bill> Index(int customerId)
        {
            var customers = _context.Bills.Where(c => c.CustomerId == customerId);

            return [.. customers.Select( x => new Bill
            {
                Id = x.Id,
                UserId = x.UserId,
                CustomerId = x.CustomerId,
                Description = x.Description,
                DueDate = x.DueDate,
                Status = x.Status,
                Value = x.Value,
            })];
        }

        public bool Update(int customerId, int id, Bill data)
        {
            try
            {
                var bill = _context.Bills.Where(b => b.Id == id && b.CustomerId == customerId).FirstOrDefault();

                if (bill == null)
                {
                    return false;
                }

                bill.Description = data.Description;
                bill.DueDate = data.DueDate;
                bill.Value = data.Value;
                bill.Status = data.Status;

                _context.Bills.Update(bill);

                var result = _context.SaveChanges();

                return result > 0;
            }
            catch (Exception error)
            {
                return false;
            }
        }

        public bool Create(Bill data)
        {
            try
            {
                var bill = new BillDal
                {
                    Description = data.Description,
                    UserId = data.UserId,
                    CustomerId = data.CustomerId,
                    Value = data.Value,
                    Status = data.Status,
                    DueDate= data.DueDate
                };

                _context.Bills.Add(bill);
                var result = _context.SaveChanges();

                return result > 0;
            }
            catch (Exception error)
            {
                return false;
            }
        }

        public bool Delete(int customerId, int id)
        {
            try
            {
                var bill = _context.Bills.Where(b => b.Id == id && b.CustomerId == customerId).FirstOrDefault();

                if (bill == null)
                {
                    return false;
                }

                _context.Bills.Remove(bill);
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
