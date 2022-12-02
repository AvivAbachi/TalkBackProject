using MainApi.Models;
using Microsoft.AspNetCore.SignalR;

namespace MainApi.Hubs
{

    public class GameHub : Hub
    {
        //private static readonly ConcurrentBag<Player> players = new ConcurrentBag<Player>();
        //private static readonly ConcurrentBag<Game> games = new ConcurrentBag<Game>();
        private static readonly Random random = new();
        private static readonly XO xo = new(random);

        public async Task PlayerReset()
        {
            xo.Reset();
            await Clients.All.SendAsync("resetReceived", xo.State.ToString());
        }

        public async Task PlayerReady(string player)
        {
            xo.PlayerReady(player);
            await Clients.All.SendAsync("readyReceived", xo.State.ToString());
        }

        public async Task PlayerTurn(int x, int y, string player)
        {

            var (res,symbol) = xo.PlayerTurn(x, y, player);

            if (res)
            {
                await Clients.All.SendAsync("turnReceived", x, y, symbol.ToString(), xo.State.ToString());
            }
            //else
            //{
            //    await Clients.Caller.SendAsync("error", "not valid");
            //}
        }
    }
}
