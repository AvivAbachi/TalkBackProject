import { memo, useEffect, useRef } from 'react';
import shallow from 'zustand/shallow';
import Login from './components/Login';
import Game from './components/Game';
import useStore, { gameEvent, playerEvent } from './store/useStore';
import PlayerList from './components/PlayerList';
import MyAcount from './components/MyAcount';
import Chat from './components/Chat';

function App() {
	const load = useRef(false);
	const game = useStore((state) => state.game);
	const connection = useStore((state) => state.connection);
	const state = useStore((state) => state.connection.state, shallow);

	useEffect(() => {
		if (!load.current) {
			load.current = true;
			playerEvent.refreshToken();
		}
	}, []);

	useEffect(() => {
		connection?.on('onLogin', playerEvent.onLogin);
		connection?.on('onPlayerLogin', playerEvent.onPlayerLogin);
		connection?.on('onPlayerLogout', playerEvent.onPlayerLogout);
		connection?.on('onPlayerState', playerEvent.onPlayerState);
		connection?.on('onGameSet', gameEvent.onSetGame);
		connection?.on('onGameClose', gameEvent.onGameClose);
		connection?.on('onGameMessage', gameEvent.onGameMessage);
		connection?.on('onError', (error) => {
			console.error(error);
			connection.stop();
		});
	}, [connection]);

	if (state !== 'Connected') {
		return <Login />;
	}

	return (
		<div className='dashbord'>
			{game ? <Game /> : <MyAcount />}
			{game ? <Chat /> : <PlayerList />}
		</div>
	);
}

export default memo(App);

// https://www.youtube.com/playlist?list=PLThyvG1mlMzltDxuQj0uQw1TDu1gJUNeG
// https://github.com/MartinPrivoznik/online-memory-game-using-signalR
// https://radzion.com/blog/asp-react-blog/authentication
// https://github.com/moshecstern/.NETReact

// https://github.com/AndyButland/BackgammonR

// https://github.com/lucassarcanjo/live-chat
// https://github.com/jherr/efficient-selectors
// https://docs.pmnd.rs/zustand/guides/practice-with-no-store-actions
