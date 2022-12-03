using MainApi.Models;

namespace MainApi.Repositories
{
    public interface IUserRepository : IEntityBaseRepository<Player>
    {
        bool IsUsernameUniq(string username);
    }
}