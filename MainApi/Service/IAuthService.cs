using MainApi.Models;

namespace MainApi.Service
{
    public interface IAuthService
    {
        string CreateToken(Player player);
    }
}