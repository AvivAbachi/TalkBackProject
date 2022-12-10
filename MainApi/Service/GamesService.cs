using MainApi.Models;
using MainApi.Models.Abstract;

namespace MainApi.Service
{
    public class GamesService : IGamesService
    {
        private static readonly GamesService instance = new();
        public static GamesService Instance => instance;
        public List<Player> Players { get; } = new List<Player>();
        public List<Game> Games { get; } = new List<Game>();

        public Player? AddPlayer(string connectionId, string username)
        {
            Player? player = Players.SingleOrDefault(p => p?.ConnectionId == connectionId);
            if (player == null)
            {
                player = new Player { ConnectionId = connectionId, UserName = username, Status = PlayerStatus.Idle };
                Players.Add(player);
                return player;
            }
            return null;
        }

        public Player? RemovePlayer(string connectionId)
        {
            Player? player = Players.SingleOrDefault(p => p.ConnectionId == connectionId);
            if (player != null) Players.Remove(player);
            return player;
        }

        public Player? StatePlayer(string connectionId)
        {
            Player? player = Players.SingleOrDefault(p => p.ConnectionId == connectionId);
            if (player != null) player.Status = player.Status == PlayerStatus.Idle ? PlayerStatus.Ready : PlayerStatus.Idle;
            return player;
        }

        public Player? StatePlayer(string connectionId, PlayerStatus status)
        {
            Player? player = Players.SingleOrDefault(p => p.ConnectionId == connectionId);
            if (player != null) player.Status = status;
            return player;
        }

        public Game? CrateGame(string p1Id, string p2Id)
        {
            bool inGame = false;
            foreach (var g in Games)
            {
                if (g.Player1.ConnectionId == p1Id || g.Player1.ConnectionId == p2Id ||
                    g.Player2.ConnectionId == p1Id || g.Player2.ConnectionId == p2Id)
                {
                    inGame = true;
                    break;
                }
            }

            if (inGame) return null;

            var p1 = StatePlayer(p1Id, PlayerStatus.Play);
            var p2 = StatePlayer(p2Id, PlayerStatus.Play);
            Game game = new(Guid.NewGuid().ToString(), p1, p2);
            Games.Add(game);
            return game;
        }

        public Game? LeaveGame(string connectionId)
        {
            var game = Games.SingleOrDefault(g => g.Player1.ConnectionId == connectionId || g.Player2.ConnectionId == connectionId);
            if (game != null)
            {
                var leaver = game.Player1.ConnectionId == connectionId ? "P1" : "P2";
                if (leaver == "P1")
                {
                    game.Player1 = null;
                    game.GameState = GameStatus.P2W;
                }
                else
                {
                    game.Player2 = null;
                    game.GameState = GameStatus.P1W;
                }
                if (game.Player1 == null || game.Player2 == null) Games.Remove(game);
            }
            return game;
        }

        public Game? RemoveGame(string gameId)
        {
            Game? game = Games.SingleOrDefault(p => p.GameId == gameId);
            if (game != null)
            {
                if (game.Player1 != null) game.Player1.Status = PlayerStatus.Idle;
                if (game.Player2 != null) game.Player2.Status = PlayerStatus.Idle;
                Games.Remove(game);
            }
            return game;
        }
    }
}
