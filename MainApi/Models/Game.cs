using MainApi.Models.Abstract;

namespace MainApi.Models
{
    public class Game
    {
        private readonly Random random;
        public string GameId { get; set; }
        public string Player1Id { get; set; }
        public string Player2Id { get; set; }
        public GameValue[,] Board { get; set; } = new GameValue[3, 3];
        public GameStatus State { get; set; } = GameStatus.Wait;
        public GameValue Turn { get; set; } = GameValue.X;

        public Game(Random random, string gameId, string player1, string player2)
        {
            this.random = random;
            this.GameId = gameId;
            this.Player1Id = player1;
            this.Player2Id = player2;
        }

        static public (bool, GameValue) PlayerTurn(Game game, int x, int y, string player)
        {
            GameValue symbol = GameValue.None;
            if (player == game.State.ToString())
            {
                if (game.Board[x, y] == GameValue.None)
                {
                    game.Board[x, y] = game.Turn;
                    if (!CheakWin(game.Board))
                    {
                        symbol = game.Turn;
                        game.Turn = game.Turn == GameValue.X ? GameValue.Y : GameValue.X;
                        game.State = game.State == GameStatus.P1 ? GameStatus.P2 : GameStatus.P1;
                    }
                }
                return (true, symbol);
            }
            return (false, symbol);
        }

        static private bool CheakWin(GameValue[,] board)
        {
            return false;
        }

        static public void Reset(Game game)
        {
            game.State = GameStatus.Wait;
            game.Turn = GameValue.X;
            game.Board = new GameValue[3, 3];
        }

        public void PlayerReady(string player)
        {

            if (State == GameStatus.Wait || State == GameStatus.P1W ||
                State == GameStatus.P2W || State == GameStatus.Darw)
            {
                if (player == "P1") State = GameStatus.P1R;
                if (player == "P2") State = GameStatus.P2R;
            }
            else if (State == GameStatus.P2R && player == "P1" ||
                    State == GameStatus.P1R && player == "P2")
            {
                State = (GameStatus)random.Next(3, 5);
            }
        }
    }
}
