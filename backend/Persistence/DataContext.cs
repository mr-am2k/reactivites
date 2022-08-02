using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Activity> Activities {get;set;}
    }
}
//purpose of the DataContext is to connect to the database and allow us to do things needed with it

