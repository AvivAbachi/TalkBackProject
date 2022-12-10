export type MarkType = '' | 'X' | 'O';

export type GameStateType = 'Wait' | 'P1R' | 'P2R' | 'P1' | 'P2' | 'P1W' | 'P2W' | 'Draw';

export type PlayerStateType = 'Idle' | 'Ready' | 'Play';

export type BoardType = MarkType[];

export type PlayerType = {
	connectionId: string | null;
	userName: string;
	status: PlayerStateType;
};

export type LoginStateType = PlayerType & {
	token: string;
	id: string;
};

export type GameT = {
	gameId: string;
	player1?: PlayerType;
	player2?: PlayerType;
	board: BoardType;
	gameState: GameStateType;
	turn: MarkType;
};
