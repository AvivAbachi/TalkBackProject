using MainApi.Models;
using MainApi.Models.Abstract;
using MainApi.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;

namespace MainApi.Hubs
{
    [Authorize]
    public class GameHub : Hub
    {
        private readonly IGamesService gamesService;
        private readonly IPlayersService playersService;
        private readonly UserManager<Player> userManager;

        public GameHub(IPlayersService playersService, IGamesService gamesService, UserManager<Player> userManager)
        {
            this.playersService = playersService;
            this.gamesService = gamesService;
            this.userManager = userManager;
        }

        public override async Task OnConnectedAsync()
        {
            var player = await userManager.FindByIdAsync(Context.User?.Identity?.Name!) as IPlayerBase;

            if (player == null) await SendError("Unauthorized");

            player = playersService.AddPlayer(player!);

            if (player == null) await SendError("Player already connected");

            player!.ConnectionId = Context.ConnectionId;
            var pl = new { player.ConnectionId, player.Status, player.UserName };
            await Clients.Others.SendAsync("onPlayerLogin", player);
            await Clients.Caller.SendAsync("onLogin", pl, playersService.Players);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var player = playersService.RemovePlayer(Context.ConnectionId);
            if (player != null)
            {
                var game = gamesService.RemoveGame(Context.ConnectionId);
                if (game != null)
                {
                    await Clients.Group(game.GameId).SendAsync("onGameClose", game);
                    await Clients.OthersInGroup(game.GameId).SendAsync("onError", "Player leave the game");
                    await Groups.RemoveFromGroupAsync(game.P1.ConnectionId, game.GameId);
                    await Groups.RemoveFromGroupAsync(game.P2.ConnectionId, game.GameId);
                    var stayPlayer = Context.ConnectionId == game.P1.ConnectionId ? game.P2 : game.P1;
                    await Clients.All.SendAsync("onPlayerState", stayPlayer);
                }
                await Clients.All.SendAsync("onPlayerLogout", player.ConnectionId);
            }
            await base.OnDisconnectedAsync(exception);
        }

        public async Task PlayerState()
        {
            var player = playersService.GetPlayer(Context.ConnectionId);
            var status = player?.Status == PlayerStatus.Idle ? PlayerStatus.Ready : PlayerStatus.Idle;
            if (player != null) player.Status = status;
            await Clients.All.SendAsync("onPlayerState", player);
        }

        public async Task GameOpen(string p2Id)
        {
            var p1 = playersService.GetPlayer(Context.ConnectionId);
            var p2 = playersService.GetPlayer(p2Id);

            if (p1 == null || p2 == null) await SendError("Player not found");

            var game = gamesService.CrateGame(p1!, p2!);

            if (game == null) await SendError("Player already on game");

            await Groups.AddToGroupAsync(game!.P1.ConnectionId, game.GameId);
            await Groups.AddToGroupAsync(game.P2.ConnectionId, game.GameId);
            await Clients.Group(game.GameId).SendAsync("onGameSet", game);
            await Clients.All.SendAsync("onPlayerState", game.P1);
            await Clients.All.SendAsync("onPlayerState", game.P2);
        }

        public async Task GameLeave()
        {
            var game = gamesService.RemoveGame(Context.ConnectionId);
            if (game != null)
            {
                await Clients.Group(game.GameId).SendAsync("onGameClose", game);
                await Clients.OthersInGroup(game.GameId).SendAsync("onError", "Player leave the game");
                await Groups.RemoveFromGroupAsync(game.P1.ConnectionId, game.GameId);
                await Groups.RemoveFromGroupAsync(game.P2.ConnectionId, game.GameId);
                await Clients.All.SendAsync("onPlayerState", game.P1);
                await Clients.All.SendAsync("onPlayerState", game.P2);
            }
        }

        public async Task GameReady(string gameId)
        {
            var game = gamesService.Games.SingleOrDefault(g => g.GameId == gameId);
            if (game != null)
            {
                game.PlayerReady(Context.ConnectionId);
                await Clients.Group(game.GameId).SendAsync("onGameSet", game);
            }
        }

        public async Task GameTurn(string gameId, int i)
        {
            var game = gamesService.Games.SingleOrDefault(g => g.GameId == gameId);
            if (game != null)
            {
                var succces = game.PlayerTurn(Context.ConnectionId, i);
                if (!succces) await Clients.Caller.SendAsync("onError", "Not vaild move!");
                await Clients.Group(game!.GameId).SendAsync("onGameSet", game);
            }
        }

        public async Task GameMessage(string gameId, string message)
        {
            var game = gamesService.Games.SingleOrDefault(g => g.GameId == gameId);
            if (game != null)
            {
                var m = new Message { Id = Context.ConnectionId, Text = message };
                await Clients.Group(game.GameId).SendAsync("onGameMessage", m);
            }
        }

        private async Task SendError(string message)
        {
            await Clients.Caller.SendAsync("onError", message);
            throw new HubException();
        }
    }
}