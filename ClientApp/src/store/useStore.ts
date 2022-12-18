import create from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { GameType, MessageType, PlayerType } from '../types';

import {
	HttpTransportType,
	HubConnection,
	HubConnectionBuilder,
} from '@microsoft/signalr';

interface TalkbackState {
	token?: string;
	error: string;
	player?: PlayerType;
	game?: GameType;
	chat: MessageType[];
	playersList: PlayerType[];
	connection: HubConnection;
}

const useStore = create<TalkbackState>((set, get) => ({
	token: undefined,
	error: '',
	player: undefined,
	game: undefined,
	playersList: [],
	chat: [],
	connection: new HubConnectionBuilder()
		.withUrl(process.env?.REACT_APP_GAME ?? '', {
			skipNegotiation: true,
			transport: HttpTransportType.WebSockets,
			accessTokenFactory: () => `Bearer ${get().token}`,
		})
		.withAutomaticReconnect()
		.build(),
}));

useStore.subscribe(async (state, prev) => {
	if (state.token !== prev.token) {
		if (state.token) {
			await state.connection.start();
		} else {
			await state.connection.stop();
		}
	}
});

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('TalkbackStore', useStore);
}

export const setError = (error: string) => {
	if (error) console.error(error);
	useStore.setState(() => ({ error }), false);
};

export const clearError = () => setError('');

export { default as gameEvent } from './gameEvent';
export { default as playerEvent } from './playerEvent';
export default useStore;
