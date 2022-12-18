export type MarkType = {
	value: '' | 'X' | 'O';
	status: boolean;
};

export type GameStateType = 'Wait' | 'P1R' | 'P2R' | 'P1' | 'P2' | 'P1W' | 'P2W' | 'Draw';

export type PlayerStateType = 'Idle' | 'Ready' | 'Play';

export type PlayerType = {
	connectionId: string | null;
	userName: string;
	status: PlayerStateType;
};

export type GameType = {
	gameId: string;
	p1?: PlayerType;
	p2?: PlayerType;
	board: MarkType[];
	gameState: GameStateType;
	turn: MarkType;
};

export type FormType = {
	UserName: string;
	Password: string;
};

export type FormErrorType = {
	UserName: string[];
	Password: string[];
	Server: string[];
};

export type MessageType = {
	send: boolean;
	text: string;
};
