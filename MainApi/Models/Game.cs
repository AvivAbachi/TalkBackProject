using MainApi.Models.Abstract;

namespace MainApi.Models
{
    public class Game
    {
        public string GameId { get; set; }
        public Player Player1 { get; set; }
        public Player Player2 { get; set; }
        public Mark[] Board { get; set; } = new Mark[9];
        public GameStatus GameState { get; set; } = GameStatus.Wait;
        public Mark Turn { get; set; } = Mark.X;
        public Game(string gameId, Player player1, Player player2)
        {
            GameId = gameId;
            Player1 = player1;
            Player2 = player2;
        }
    }

    static class GameHelpper
    {
        private static readonly Random random = new();

        public static void Reset(this Game game)
        {
            game.GameState = GameStatus.Wait;
            game.Turn = Mark.X;
            game.Board = new Mark[9];
        }
        public static bool PlayerTurn(this Game game, string id, int i)
        {
            var player = game.Player1.ConnectionId == id ? GameStatus.P1 : GameStatus.P2;
            if (player == game.GameState)
            {
                if (game.Board[i] == Mark.None)
                {
                    game.Board[i] = game.Turn;
                    if (!game.GameEnd())
                    {
                        game.Turn = game.Turn == Mark.X ? Mark.O : Mark.X;
                        game.GameState = game.GameState == GameStatus.P1 ? GameStatus.P2 : GameStatus.P1;
                    }

                    return true;
                }
            }
            return false;
        }

        public static void PlayerReady(this Game game, string id)
        {
            if (game.GameState != GameStatus.P1 || game.GameState != GameStatus.P2)
            {
                if (game.GameState == GameStatus.P2R && id == game.Player1.ConnectionId ||
                    game.GameState == GameStatus.P1R && id == game.Player2.ConnectionId)
                {
                    game.Reset();
                    game.GameState = (GameStatus)random.Next(3, 5);
                }
                else if (id == game.Player1.ConnectionId) game.GameState = GameStatus.P1R;
                else if (id == game.Player2.ConnectionId) game.GameState = GameStatus.P2R;
            }
        }

        private static bool GameEnd(this Game game)
        {
            bool hasWin = (game.Board[0] == game.Turn && game.Board[1] == game.Turn && game.Board[2] == game.Turn) ||
                          (game.Board[3] == game.Turn && game.Board[4] == game.Turn && game.Board[5] == game.Turn) ||
                          (game.Board[6] == game.Turn && game.Board[7] == game.Turn && game.Board[8] == game.Turn) ||
                          (game.Board[0] == game.Turn && game.Board[3] == game.Turn && game.Board[6] == game.Turn) ||
                          (game.Board[1] == game.Turn && game.Board[4] == game.Turn && game.Board[7] == game.Turn) ||
                          (game.Board[2] == game.Turn && game.Board[5] == game.Turn && game.Board[8] == game.Turn) ||
                          (game.Board[0] == game.Turn && game.Board[4] == game.Turn && game.Board[8] == game.Turn) ||
                          (game.Board[2] == game.Turn && game.Board[4] == game.Turn && game.Board[6] == game.Turn);

            if (hasWin)
            {
                game.GameState = game.GameState == GameStatus.P1 ? GameStatus.P1W : GameStatus.P2W;
                return true;
            }

            foreach (var box in game.Board)
            {
                if (box == Mark.None) return false;
            }
            game.GameState = GameStatus.Darw;
            return true;
        }
    }
}
