using MainApi.Models.Abstract;

namespace MainApi.Models
{
    public class Game
    {
        public string GameId { get; }
        public IPlayerBase P1 { get; }
        public IPlayerBase P2 { get; }
        public Mark[] Board { get; } = new Mark[9];
        public GameStatus GameState { get; set; } = GameStatus.Wait;
        public MarkEnum Turn { get; set; } = MarkEnum.X;
        public Game(string gameId, IPlayerBase player1, IPlayerBase player2)
        {
            GameId = gameId;
            P1 = player1;
            P2 = player2;
            for (int i = 0; i < Board.Length; i++) Board[i] = new Mark();
        }
    }

    public static class GameHelper
    {
        private static readonly Random random = new();
        private static readonly int[,] cheakList = new int[8, 3] {
            { 0, 1, 2 },
            { 3, 4, 5 },
            { 6, 7, 8 },
            { 0, 3, 6 },
            { 1, 4, 7 },
            { 2, 5, 8 },
            { 0, 4, 8 },
            { 2, 4, 6 },
        };

        public static void PlayerReady(this Game game, string id)
        {

            if (game.GameState != GameStatus.P1 || game.GameState != GameStatus.P2)
            {
                if (game.GameState == GameStatus.P2R && id == game.P1?.ConnectionId ||
                    game.GameState == GameStatus.P1R && id == game.P2?.ConnectionId)
                {
                    game.Reset();
                    game.GameState = (GameStatus)random.Next(3, 5);
                }
                else if (id == game.P1?.ConnectionId) game.GameState = GameStatus.P1R;
                else if (id == game.P2?.ConnectionId) game.GameState = GameStatus.P2R;
            }
        }

        public static bool PlayerTurn(this Game game, string id, int i)
        {
            var player = game.P1?.ConnectionId == id ? GameStatus.P1 : GameStatus.P2;
            if (player == game.GameState)
            {
                if (game.Board[i].Value == MarkEnum.None)
                {
                    game.Board[i].Value = game.Turn;
                    game.GameState = game.CheakWin();
                    return true;
                }
            }
            return false;
        }

        public static void Reset(this Game game)
        {
            game.GameState = GameStatus.Wait;
            game.Turn = MarkEnum.X;
            for (int i = 0; i < game.Board.Length; i++)
            {
                game.Board[i].Value = MarkEnum.None;
                game.Board[i].Status = false;
            }
        }

        private static GameStatus CheakWin(this Game game)
        {
            for (int i = 0; i < 8; i++)
            {
                if (game.Board[cheakList[i, 0]].Value == game.Turn &&
                    game.Board[cheakList[i, 1]].Value == game.Turn &&
                    game.Board[cheakList[i, 2]].Value == game.Turn)
                {
                    game.Board[cheakList[i, 0]].Status = true;
                    game.Board[cheakList[i, 1]].Status = true;
                    game.Board[cheakList[i, 2]].Status = true;
                    return game.GameState == GameStatus.P1 ? GameStatus.P1W : GameStatus.P2W;
                }
            }
            if (game.Board.Any(m => m.Value == MarkEnum.None))
            {
                game.Turn = game.Turn == MarkEnum.X ? MarkEnum.O : MarkEnum.X;
                return game.GameState == GameStatus.P1 ? GameStatus.P2 : GameStatus.P1;
            }
            return GameStatus.Darw;
        }
    }
}