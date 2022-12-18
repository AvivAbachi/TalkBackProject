import { GameStateType } from '../types';

export const gameTitle = (gameState?: GameStateType, player?: 'P1' | 'P2') => {
	switch (gameState) {
		case 'P1R':
		case 'P2R':
			return gameState === player + 'R' ? 'Wait For Secound Player' : 'Please Be Ready';
		case 'P1':
		case 'P2':
			return gameState === player ? 'Your Turn' : 'Secound Player Turn';
		case 'P1W':
		case 'P2W':
			return gameState === player + 'W' ? 'You Win' : 'You Lose';
		default:
			return gameState;
	}
};
