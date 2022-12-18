using MainApi.Models;
using MainApi.Models.Abstract;

namespace MainApi.Service
{
    public class GamesService : IGamesService
    {
        private static readonly GamesService instance = new();
        public static GamesService Instance => instance;
        public List<IPlayerBase> Players { get; } = new List<IPlayerBase>();
        public List<Game> Games { get; } = new List<Game>();

        public IPlayerBase? AddPlayer(IPlayerBase player)
        {
            if (!Players.Exists(p => p?.Id == player.Id))
            {
                Players.Add(player);
                return player;
            }
            return null;
        }

        public IPlayerBase? RemovePlayer(string connectionId)
        {
            var player = Players.SingleOrDefault(p => p.ConnectionId == connectionId);
            if (player != null) Players.Remove(player);
            return player;
        }

        public IPlayerBase? StatePlayer(string connectionId)
        {
            var player = Players.SingleOrDefault(p => p.ConnectionId == connectionId);
            if (player != null) player.Status = player.Status == PlayerStatus.Idle ? PlayerStatus.Ready : PlayerStatus.Idle;
            return player;
        }

        public IPlayerBase? StatePlayer(string connectionId, PlayerStatus status)
        {
            var player = Players.SingleOrDefault(p => p.ConnectionId == connectionId);
            if (player != null) player.Status = status;
            return player;
        }

        public Game? CrateGame(string p1Id, string p2Id)
        {
            foreach (var g in Games)
            {
                if (g.P1?.ConnectionId == p1Id || g.P1?.ConnectionId == p2Id ||
                    g.P2?.ConnectionId == p1Id || g.P2?.ConnectionId == p2Id)
                {
                    return null;
                }
            }

            var p1 = StatePlayer(p1Id, PlayerStatus.Play);
            var p2 = StatePlayer(p2Id, PlayerStatus.Play);
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
