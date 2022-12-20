import * as talkbackApi from '../api/talkbackApi';
import { FormType, PlayerType } from '../types';
import useStore, { setError } from './useStore';

const submitForm = async (form: FormType, isLogin: boolean) => {
	try {
		const res = await (isLogin ? talkbackApi.login(form) : talkbackApi.register(form));
		useStore.setState((state) => ({ ...state, token: res.data }));
		localStorage.setItem('accessToken', res.data);
	} catch (err: any) {
		if (err?.response?.status === 400) {
			const data = err.response.data;
			throw !!data?.errors ? data?.errors : data;
		} else {
			setError(err?.message);
		}
	}
};

const refreshToken = () => {
	const token = localStorage.getItem('accessToken');
	if (token) {
		talkbackApi
			.refreshToken(token)
			.then((res) => useStore.setState((state) => ({ ...state, token: res.data })))
			.catch((err) => logout(err));
	}
};

const logout = (error: any) => {
	console.error(error);
	localStorage.removeItem('accessToken');
	useStore.setState((state) => ({
		game: undefined,
		token: undefined,
		player: undefined,
		error: undefined,
		playersList: [],
		chat: [],
		connection: state.connection,
	}));
};

const onLogin = (player: PlayerType, playersList: PlayerType[]) => {
	useStore.setState((state) => ({ ...state, player, playersList }));
};

const onPlayerLogin = (player: PlayerType) => {
	useStore.setState((state) => ({
		...state,
		playersList: [...state.playersList, player],
	}));
};

const onPlayerLogout = (connectionId: string) => {
	useStore.setState((state) => ({
		...state,
		playersList: state.playersList.filter((u) => u.connectionId !== connectionId),
	}));
};

const onPlayerState = (player: PlayerType) => {
	useStore.setState((state) => ({
		...state,
		player: state.player?.connectionId === player.connectionId ? player : state.player,
		playersList: state.playersList.map((p) => {
			if (p.connectionId === player.connectionId) p.status = player.status;
			return p;
		}),
	}));
};

const playerStatus = () => {
	return useStore.getState().connection.invoke('playerState');
};

const userEvent = {
	submitForm,
	logout,
	refreshToken,

	onLogin,
	onPlayerLogin,
	onPlayerLogout,
	onPlayerState,

	playerStatus,
};

export default userEvent;
