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
            foreach (var g in Games)
            {
                if (g.P1?.ConnectionId == p1.ConnectionId || g.P1?.ConnectionId == p2.ConnectionId ||
                    g.P2?.ConnectionId == p1.ConnectionId || g.P2?.ConnectionId == p2.ConnectionId)
                {
                    return null;
                }
            }
            Game game = new(Guid.NewGuid().ToString(), p1!, p2!);
            Games.Add(game);
            return game;
        }

        public Game? LeaveGame(string connectionId)
        {
            var game = Games.SingleOrDefault(g => g.P1?.ConnectionId == connectionId || g.P2?.ConnectionId == connectionId);
            if (game != null)
            {
                bool gameStart = game.GameState == GameStatus.P1 || game.GameState == GameStatus.P2;
                if (game.P1?.ConnectionId == connectionId)
                {
                    game.P1 = null;
                    if (gameStart) game.GameState = GameStatus.P2W;
                }
                else if (game.P2?.ConnectionId == connectionId)
                {
                    game.P2 = null;
                    if (gameStart) game.GameState = GameStatus.P1W;
                }
                if (game.P1 == null && game.P2 == null) Games.Remove(game);
            }
            return game;
        }
    }
}
