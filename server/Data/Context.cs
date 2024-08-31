using Microsoft.EntityFrameworkCore;

namespace server.Data
{
    public class Context: DbContext
    {

        public Context(DbContextOptions<Context> options) : base(options) {
            
        }

        #region Models
        public DbSet<UserDal> Users { get; set; }
        public DbSet<CustomerDal> Customers{ get; set; }
        public DbSet<BillDal> Bills { get; set; }
        # endregion

    }
}
