using Microsoft.EntityFrameworkCore;

namespace ToDoServer.Common.Models
{
    public sealed class TodoContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Board> Boards { get; set; }
        public DbSet<Todo> Todos { get; set; }

        public TodoContext(DbContextOptions options)
            : base(options)
        {
            this.Database.EnsureCreated();
        }
    }
}
