using MainApi.Models;
using MainApi.Models.Abstract;

namespace MainApi.Service
{
    public class GamesService : IGamesService
    {
        public static GamesService Instance { get; } = new();
        public List<Game> Games { get; } = new List<Game>();

        public Game? CrateGame(IPlayerBase p1, IPlayerBase p2)
        {
            if (p1 == null || p2 == null) return null;
            foreach (var g in Games)
            {
                if (g.P1.ConnectionId == p1.ConnectionId || g.P1.ConnectionId == p2.ConnectionId ||
                    g.P2.ConnectionId == p1.ConnectionId || g.P2.ConnectionId == p2.ConnectionId)
                {
                    return null;
                }
            }
            var game = new Game(Guid.NewGuid().ToString(), p1, p2);
            game.P1.Status = PlayerStatus.Play;
            game.P2.Status = PlayerStatus.Play;
            Games.Add(game);
            return game;
        }

        public Game? RemoveGame(string connectionId)
        {
            var game = Games.SingleOrDefault(g => g.P1?.ConnectionId == connectionId || g.P2?.ConnectionId == connectionId);
            if (game != null)
            {
                game.P1.Status = PlayerStatus.Idle;
                game.P2.Status = PlayerStatus.Idle;
                Games.Remove(game);
            }
            return game;
        }
    }
}
