using MainApi.Models;

namespace MainApi.Service
{
    public interface IAuthService
    {
        AuthData GetAuthData(Player player);
        string HashPassword(string password);
        bool VerifyPassword(string password, string hashedPassword);
    }
}