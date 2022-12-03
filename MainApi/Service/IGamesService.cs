using MainApi.Models;

namespace MainApi.Service
{
    public interface IGamesService
    {
        List<Game> Games { get; }
        List<Player> Players { get; }
        Game CrateGame();
        Player PlayerLogin(string connectionId, string username);
        Player? PlayerLogout(string connectionId);
    }
}