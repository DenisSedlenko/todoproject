namespace ToDoServer.Common.Interfaces
{
    using System.Threading.Tasks;
    using Models;

    public interface IUserProvider
    {
        Task CheckOrCreateUser(User user);

        Task<int?> GetUserId(string email);
    }
}
