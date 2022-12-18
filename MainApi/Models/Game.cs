using MainApi.Models.Abstract;

namespace MainApi.Models
{
    public class Game
    {
        public string GameId { get; set; }
        public IPlayerBase? P1 { get; set; }
        public IPlayerBase? P2 { get; set; }
        public Mark[] Board { get; set; }
         public GameStatus GameState { get; set; } = GameStatus.Wait;
        public MarkEnum Turn { get; set; } = MarkEnum.X;
        public Game(string gameId, IPlayerBase player1, IPlayerBase player2)
        {
            GameId = gameId;
            P1 = player1;
            P2 = player2;
            Board = new Mark[9];
            for (int i = 0; i < Board.Length; i++) Board[i] = new Mark();
        }
    }
}
