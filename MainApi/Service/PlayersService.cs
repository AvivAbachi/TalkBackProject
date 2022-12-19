using MainApi.Models.Abstract;

namespace MainApi.Service
{
    public class PlayersService : IPlayersService
    {
        public static PlayersService Instance { get; } = new();
        public List<IPlayerBase> Players { get; } = new List<IPlayerBase>();

        public IPlayerBase? GetPlayer(string connectionId)
        {
            return Players.SingleOrDefault(p => p.ConnectionId == connectionId);
        }

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
            var player = GetPlayer(connectionId);
            if (player != null) Players.Remove(player);
            return player;
        }

        public IPlayerBase? StatePlayer(IPlayerBase player, PlayerStatus status)
        {
            if (player != null) player.Status = status;
            return player;
        }

    }
}
