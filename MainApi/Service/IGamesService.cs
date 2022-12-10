using MainApi.Models;
using MainApi.Models.Abstract;

namespace MainApi.Service
{
    public interface IGamesService
    {
        List<Game> Games { get; }
        List<Player> Players { get; }
        Player? AddPlayer(string connectionId, string username);
        Game? CrateGame(string p1Id, string p2Id);
        Game? LeaveGame(string connectionId);
        Game? RemoveGame(string gameId);
        Player? RemovePlayer(string connectionId);
        Player? StatePlayer(string connectionId);
        Player? StatePlayer(string connectionId, PlayerStatus status);
    }
}