using MainApi.Models;
using MainApi.Models.Abstract;
using MainApi.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;

namespace MainApi.Hubs
{
    [Authorize]
    public class LobbyHub : Hub
    {
        private readonly IGamesService gamesService;
        private readonly UserManager<Player> userManager;
        public LobbyHub(IGamesService gamesService, UserManager<Player> userManager)
        {
            this.gamesService = gamesService;
            this.userManager = userManager;

        }

        public override async Task OnConnectedAsync()
        {
            var dsa = Context.UserIdentifier;
            IPlayerBase? player = await userManager.FindByIdAsync(Context.User?.Identity.Name);
            player = gamesService.AddPlayer(player, Context.ConnectionId!);
            if (player != null)
            {
                await Clients.Others.SendAsync("onPlayerLogin", player);
                await Clients.Caller.SendAsync("onLogin", player, gamesService.Players);
            }
            await base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            var player = gamesService.RemovePlayer(Context.ConnectionId);
            if (player != null)
            {
                //var game = gamesService.LeaveGame(Context.ConnectionId);
                //if (game != null)
                //{
                //    Groups.RemoveFromGroupAsync(Context.ConnectionId, game.GameId);
                //    Clients.Group(game.GameId).SendAsync("onGameSet", game);
                //}
                Clients.All.SendAsync("onPlayerLogout", player.ConnectionId);
            }
            return base.OnDisconnectedAsync(exception);
        }

        public async Task PlayerState()
        {
            var player = gamesService.StatePlayer(Context.ConnectionId);
            await Clients.All.SendAsync("onPlayerState", player);
        }

        public async Task GameOpen(string p2Id)
        {
            var game = gamesService.CrateGame(Context.ConnectionId, p2Id);
            if (game != null)
            {
                await Groups.AddToGroupAsync(game.Player1.ConnectionId, game.GameId);
                await Groups.AddToGroupAsync(game.Player2.ConnectionId, game.GameId);
                await Clients.Group(game.GameId).SendAsync("onGameSet", game);
                await Clients.All.SendAsync("onPlayerState", game.Player1);
                await Clients.All.SendAsync("onPlayerState", game.Player2);
            }
        }

        public async Task GameLeave(string gameId)
        {

            var game = gamesService.LeaveGame(Context.ConnectionId);
            if (game != null)
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, game.GameId);
                await Clients.Group(game.GameId).SendAsync("onGameSet", game);
                await Clients.All.SendAsync("onGameSet", game);
            }
        }

        public async Task GameReset(string gameId)
        {
            var game = gamesService.Games.FirstOrDefault(g => g.GameId == gameId);
            if (game != null)
            {
                game.Reset();
                await Clients.Group(game.GameId).SendAsync("onGameSet", game);
            }
        }

        public async Task GameReady(string gameId)
        {
            var game = gamesService.Games.FirstOrDefault(g => g.GameId == gameId);
            if (game != null)
            {
                game.PlayerReady(Context.ConnectionId);
                await Clients.Group(game.GameId).SendAsync("onGameSet", game);
            }
        }

        public async Task GameTurn(string gameId, int i)
        {
            var game = gamesService.Games.FirstOrDefault(g => g.GameId == gameId);
            var res = game?.PlayerTurn(Context.ConnectionId, i);
            if (res == true)
            {
                await Clients.Group(game!.GameId).SendAsync("onGameSet", game);
            }
        }
    }
}