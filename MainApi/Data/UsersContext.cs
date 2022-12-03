using MainApi.Models;
using Microsoft.EntityFrameworkCore;

namespace MainApi.Context
{
    public class UsersContext : DbContext
    {
        public UsersContext(DbContextOptions<UsersContext> options) : base(options) { }
        public virtual DbSet<Player>? Players { get; set; }
    }
}
