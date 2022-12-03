using MainApi.Models;

namespace MainApi.Service
{
    public class GamesService : IGamesService
    {
        private static readonly GamesService instance = new GamesService();
        private readonly Random random = new Random();
        public static GamesService Instance => instance;
        public List<Player> Players { get; } = new List<Player>();
        public List<Game> Games { get; } = new List<Game>();

        public Game CrateGame()
        {
            Game game = new(random, "", "", "");
            Games.Add(game);
            return game;
        }

        public Player PlayerLogin(string connectionId, string username)
        {
            Player player = new Player { ConnectionId = connectionId, Username = username };
            Players.Add(player);
            return player;
        }


        public Player? PlayerLogout(string connectionId)
        {
            Player? player = Players.SingleOrDefault(p => p.ConnectionId == connectionId);
            if (player != null) Players.Remove(player);
            return player;
        }
    }
}
