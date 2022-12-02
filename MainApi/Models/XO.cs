namespace MainApi.Models
{
    public enum State { Wait, P1R, P2R, P1, P2, P1W, P2W, Darw }
    public enum Symbol { None, X, Y }
    public class XO
    {

        public Symbol[] Board { get; set; } = new Symbol[9];
        public State State { get; set; } = State.Wait;
        public Symbol Turn { get; set; } = Symbol.X;
        private readonly Random random;

        public XO(Random random)
        {
            this.random = random;
        }

        public (bool, Symbol) PlayerTurn(int x, int y, string player)
        {
            Symbol symbol = Symbol.None;
            if (player == State.ToString())
            {
                if (Board[x * 3 + y] == Symbol.None)
                {
                    Board[x * 3 + y] = Turn;
                    if (!CheakWin())
                    {
                        symbol = Turn;
                        Turn = Turn == Symbol.X ? Symbol.Y : Symbol.X;
                        State = State == State.P1 ? State.P2 : State.P1;
                    }
                }
                return (true, symbol);
            }
            return (false, symbol);
        }

        private bool CheakWin()
        {
            return false;
        }


        public void Reset()
        {
            State = State.Wait;
            Turn = Symbol.X;
            Board = new Symbol[9];
        }

        public void PlayerReady(string player)
        {

            if (State == State.Wait || State == State.P1W ||
                State == State.P2W || State == State.Darw)
            {
                if (player == "P1") State = State.P1R;
                if (player == "P2") State = State.P2R;
            }
            else if (State == State.P2R && player == "P1" ||
                    State == State.P1R && player == "P2")
            {
                State = (State)random.Next(3, 5);
            }
        }
    }
}
