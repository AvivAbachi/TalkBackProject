using MainApi.Models;
using MainApi.Service;
using Microsoft.AspNetCore.SignalR;

namespace MainApi.Hubs
{
    public class LobbyHub : Hub
    {
        private readonly IGamesService gamesService;
        public LobbyHub(IGamesService gamesService)
        {
            this.gamesService = gamesService;
        }

        public async Task PlayerLogin(string username)
        {
            var player = gamesService.AddPlayer(Context.ConnectionId, username);
            if (player != null)
            {
                await Clients.Caller.SendAsync("onReceivedPlayers", gamesService.Players);
                await Clients.Others.SendAsync("onPlayerLogin", player);
            }
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            var player = gamesService.RemovePlayer(Context.ConnectionId);
            if (player != null)
            {
                var game = gamesService.LeaveGame(Context.ConnectionId);
                if (game != null)
                {
                    Groups.RemoveFromGroupAsync(Context.ConnectionId, game.GameId);
                    Clients.Group(game.GameId).SendAsync("onGameSet", game);
                }
                Clients.All.SendAsync("onPlayerLogout", player.ConnectionId);
            }
            return base.OnDisconnectedAsync(exception);
        }

        public async Task PlayerState()
        {
            var player = gamesService.StatePlayer(Context.ConnectionId);
            await Clients.All.SendAsync("onPlayerState", player);
        }

        public async Task OpenGame(string p2Id)
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

        public async Task LeaveGame(string gameId)
        {
            var game = gamesService.LeaveGame(Context.ConnectionId);
            if (game != null)
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, game.GameId);
                await Clients.Group(game.GameId).SendAsync("onGameSet", game);
                await Clients.All.SendAsync("onGameSet", game);
            }
        }

        public async Task ResetGame(string gameId)
        {
            var game = gamesService.Games.FirstOrDefault(g => g.GameId == gameId);
            if (game != null)
            {
                game.Reset();
                await Clients.Group(game.GameId).SendAsync("onGameSet", game);
            }
        }

        public async Task PlayerReady(string gameId)
        {
            var game = gamesService.Games.FirstOrDefault(g => g.GameId == gameId);
            if (game != null)
            {
                game.PlayerReady(Context.ConnectionId);
                await Clients.Group(game.GameId).SendAsync("onGameSet", game);
            }
        }

        public async Task PlayerTurn(string gameId, int i)
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