import { HttpTransportType } from '@microsoft/signalr';
import { createContext, useEffect, useState, useCallback } from 'react';
import { createSignalRContext } from 'react-signalr';
import { refreshToken } from '../api/talkbackApi';
import { GameType, PlayerType } from '../types';

export const TalkBackContext = createContext<TalkBackContextType | null>(null);

const { useSignalREffect, Provider, invoke } = createSignalRContext();

export default function TalkBackProvider({ children }: any) {
	const [user, setUser] = useState<PlayerType>();
	const [game, setgame] = useState<GameType>();
	const [usersList, setUserList] = useState<PlayerType[]>([]);
	const [token, setToken] = useState<string>();

	useEffect(() => {
		async function refershTokenAsync() {
			const token = localStorage.getItem('accessToken');
			if (token) {
				try {
					const res = await refreshToken(token);
					setToken(res.data);
				} catch (err) {
					localStorage.removeItem('accessToken');
				}
			}
		}
		refershTokenAsync();
	}, []);

	// Player Effects
	useSignalREffect(
		'onLogin',
		(player, players) => {
			setUser(player);
			setUserList(players);
		},
		[usersList]
	);

	useSignalREffect(
		'onPlayerLogin',
		(player) => {
			setUserList([...usersList, player]);
		},
		[usersList]
	);

	useSignalREffect(
		'onPlayerLogout',
		(connectionId) =>
			setUserList(usersList.filter((u) => u.connectionId !== connectionId)),
		[usersList]
	);

	useSignalREffect(
		'onPlayerState',
		(player) => {
			if (player.connectionId === user?.connectionId) {
				setUser({ ...user!, status: player.status });
			}
			setUserList(
				usersList.map((u) => {
					if (u.connectionId === player.connectionId) u.status = player.status;
					return u;
				})
			);
		},
		[usersList]
	);

	// Game Effects
	useSignalREffect(
		'onGameSet',
		(game) => {
			setgame(game);
		},
		[game]
	);

	useSignalREffect(
		'onGameClose',
		() => {
			setgame(undefined);
		},
		[game]
	);

	return (
		<TalkBackContext.Provider
			value={{
				state: { user, game, usersList, token },
				userEvent: {
					handelLogin: useCallback((token: string) => {
						setToken(token);
						localStorage.setItem('accessToken', token);
					}, []),
					changeState: useCallback(() => invoke('playerState'), []),
				},
				gameEvent: {
					gameOpen: useCallback(
						(connectionId: string | null) => invoke('gameOpen', connectionId),
						[]
					),
					gameLeave: useCallback(() => invoke('gameLeave', game?.gameId), [game?.gameId]),
					gameReady: useCallback(() => invoke('gameReady', game?.gameId), [game?.gameId]),
					gameReset: useCallback(() => invoke('gameReset', game?.gameId), [game?.gameId]),
					gameTurn: useCallback(
						(i: number) => invoke('gameTurn', game?.gameId, i),
						[game?.gameId]
					),
				},
			}}
		>
			<Provider
				connectEnabled={!!token}
				dependencies={[token]}
				accessTokenFactory={() => `Bearer ${token}`}
				skipNegotiation
				transport={HttpTransportType.WebSockets}
				url='https://localhost:7025/hubs/lobby'
			>
				{children}
			</Provider>
		</TalkBackContext.Provider>
	);
}

export type TalkBackContextType = {
	state: {
		user: PlayerType | undefined;
		game: GameType | undefined;
		usersList: PlayerType[];
		token: string | undefined;
	};
	userEvent: {
		handelLogin: (token: string) => void;
		changeState: () => void;
	};
	gameEvent: {
		gameOpen: (connectionId: string | null) => void;
		gameLeave: () => void;
		gameReady: () => void;
		gameReset: () => void;
		gameTurn: (i: number) => void;
	};
};
