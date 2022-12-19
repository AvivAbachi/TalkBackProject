using MainApi.Models.Abstract;

namespace MainApi.Service
{
    public interface IPlayersService
    {
        List<IPlayerBase> Players { get; }

        IPlayerBase? AddPlayer(IPlayerBase player);
        IPlayerBase? GetPlayer(string connectionId);
        IPlayerBase? RemovePlayer(string connectionId);
        IPlayerBase? StatePlayer(IPlayerBase player, PlayerStatus status);
    }
}