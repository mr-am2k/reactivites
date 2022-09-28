using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser> //we don't need to specify new DbSet, because IdentityDbContext is handling that
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Activity> Activities {get;set;}
    }
}
//purpose of the DataContext is to connect to the database and allow us to do things needed with it

