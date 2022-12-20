import { GameType, MessageType } from '../types';
import useStore from './useStore';

export const onSetGame = (game: GameType) => {
	useStore.setState((state) => ({ ...state, game }));
};

export const onGameClose = () => {
	useStore.setState((state) => ({ ...state, game: undefined, chat: [] }));
};

export const onGameMessage = (message: MessageType) => {
	useStore.setState((state) => ({
		...state,
		chat: [
			...state.chat,
			{ send: message.id === state.player?.connectionId, text: message.text },
		],
	}));
};

export const gameOpen = (connectionId: string | null) => {
	return useStore.getState().connection.invoke('gameOpen', connectionId);
};

export const gameLeave = () => {
	return useStore.getState().connection.invoke('gameLeave');
};

export const gameReady = () => {
	return useStore
		.getState()
		.connection.invoke('gameReady', useStore.getState().game?.gameId);
};

export const gameTurn = (i: number) => {
	return useStore
		.getState()
		.connection.invoke('gameTurn', useStore.getState().game?.gameId, i);
};

export const gameMessage = (message: string) => {
	return useStore
		.getState()
		.connection.invoke('gameMessage', useStore.getState().game?.gameId, message);
};

const gameEvent = {
	onSetGame,
	onGameClose,
	onGameMessage,

	gameOpen,
	gameLeave,
	gameReady,
	gameTurn,
	gameMessage,
};

export default gameEvent;
