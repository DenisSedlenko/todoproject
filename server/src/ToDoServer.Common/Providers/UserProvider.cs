using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using ToDoServer.Common.Interfaces;
using ToDoServer.Common.Models;

namespace ToDoServer.Common.Providers
{
    public class UserProvider : IUserProvider
    {
        private readonly TodoContext _context;

        public UserProvider(TodoContext context)
        {
            _context = context;
        }

        public async Task CheckOrCreateUser(User user)
        {
            var foundUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == user.Email);

            if (foundUser != null) return;

            _context.Users.Add(new User { Email = user.Email });
            _context.SaveChanges();
        }

        public async Task<int?> GetUserId(string email)
        {
            var foundUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);

            return foundUser?.UserId;
        }
    }
}
