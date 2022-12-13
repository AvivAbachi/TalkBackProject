using MainApi.Models;
using MainApi.Models.Abstract;

namespace MainApi.Service
{
    public interface IGamesService
    {
        List<Game> Games { get; }
        List<IPlayerBase> Players { get; }

        IPlayerBase? AddPlayer(IPlayerBase player);
        Game? CrateGame(string p1Id, string p2Id);
        Game? LeaveGame(string connectionId);
        IPlayerBase? RemovePlayer(string connectionId);
        IPlayerBase? StatePlayer(string connectionId);
        IPlayerBase? StatePlayer(string connectionId, PlayerStatus status);
    }
}