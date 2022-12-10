using MainApi.Models;

namespace MainApi.Service
{
    public interface IAuthService
    {
        LoginData CreateToken(Player player);
    }
}