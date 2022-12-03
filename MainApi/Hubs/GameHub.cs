using MainApi.Models;
using MainApi.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace MainApi.Hubs
{
    //[Authorize]
    public class GameHub : Hub
    {
        private readonly IGamesService gamesService;
        private readonly Game game;

        public GameHub(IGamesService gamesService)
        {
            this.gamesService = gamesService;
            game = this.gamesService.CrateGame();
        }

        public async Task PlayerLogin(string connectionId, string username)
        {
            Player player = gamesService.PlayerLogin(connectionId, username);
            await Clients.All.SendAsync("playerLogin", player.ConnectionId, player.Username);
            await Clients.Caller.SendAsync("playersReceived", gamesService.Players);
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            Player? player = gamesService.PlayerLogout(Context.ConnectionId);
            if (player != null)
            {
                Clients.All.SendAsync("playerLogout", player.ConnectionId);
            }
            return base.OnDisconnectedAsync(exception);
        }

        public async Task PlayerReset()
        {
            Game.Reset(game);
            await Clients.All.SendAsync("resetReceived", game.State.ToString());
        }

        public async Task PlayerReady(string player)
        {
            game.PlayerReady(player);
            await Clients.All.SendAsync("readyReceived", game.State.ToString());
        }

        public async Task PlayerTurn(int x, int y, string player)
        {

            var (res, symbol) = Game.PlayerTurn(game, x, y, player);
            if (res)
            {
                await Clients.All.SendAsync("turnReceived", x, y, symbol.ToString(), game.State.ToString());
            }
        }
    }
}
