export type MarkType = '' | 'X' | 'O';

export type GameStateType = 'Wait' | 'P1R' | 'P2R' | 'P1' | 'P2' | 'P1W' | 'P2W' | 'Draw';

export type PlayerStateType = 'Idle' | 'Ready' | 'Play';

export type PlayerType = {
	connectionId: string | null;
	userName: string;
	status: PlayerStateType;
};

export type GameType = {
	gameId: string;
	player1?: PlayerType;
	player2?: PlayerType;
	board: MarkType[];
	gameState: GameStateType;
	turn: MarkType;
};

export type FormType<T> = {
	UserName: T;
	Password: T;
};
