import { useState } from 'react';
import { createSignalRContext } from 'react-signalr';
import { GameT, LoginStateType, PlayerType } from '../types';

const { useSignalREffect, Provider, invoke } = createSignalRContext();

export default function useTalkBackProject() {
	const [user, setUser] = useState<LoginStateType>();
	const [game, setgame] = useState<GameT>();
	const [playerList, setUserList] = useState<PlayerType[]>([]);

	// Login
	function onOpen(con: any) {
		setUser({ ...user!, connectionId: con?.connectionId });
		con.send('playerLogin', user?.userName);
	}

	function onClosed() {
		setUser({ ...user!, connectionId: null });
	}

	// Home
	useSignalREffect(
		'onReceivedPlayers',
		(players) => {
			setUserList(players);
		},
		[playerList]
	);

	useSignalREffect(
		'onPlayerLogin',
		(player) => {
			setUserList([...playerList, player]);
		},
		[playerList]
	);

	useSignalREffect(
		'onPlayerLogout',
		(connectionId) =>
			setUserList(playerList.filter((u) => u.connectionId !== connectionId)),
		[playerList]
	);

	useSignalREffect(
		'onPlayerState',
		(player) =>
			setUserList(
				playerList.map((u) => {
					if (u.connectionId === player.connectionId) u.status = player.status;
					return u;
				})
			),
		[playerList]
	);

	function handelLogin(data: LoginStateType) {
		setUser(data);
	}

	function changeState() {
		invoke('playerState');
	}

	// Game
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

	function openGame(p2Id: string | null) {
		invoke('openGame', p2Id);
	}

	function leaveGame() {
		invoke('leaveGame', game?.gameId);
	}

	function resetGame() {
		invoke('resetGame', game?.gameId);
	}

	function readyGame() {
		invoke('playerReady', game?.gameId);
	}

	function turnGame(i: number) {
		invoke('playerTurn', game?.gameId, i);
	}

	return {
		Provider,
		state: {
			user,
			game,
			playerList,
		},
		loginEvent: {
			onOpen,
			onClosed,
		},
		userEvent: {
			handelLogin,
			changeState,
		},
		gameEvent: {
			openGame,
			leaveGame,
			readyGame,
			resetGame,
			turnGame,
		},
	};
}
