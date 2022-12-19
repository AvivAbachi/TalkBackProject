using MainApi.Models;
using MainApi.Models.Abstract;

namespace MainApi.Service
{
    public interface IGamesService
    {
        List<Game> Games { get; }

        Game? CrateGame(IPlayerBase p1, IPlayerBase p2);
        Game? LeaveGame(string connectionId);
    }
}