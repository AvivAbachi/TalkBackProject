import { memo, useEffect, useRef } from 'react';
import shallow from 'zustand/shallow';
import useStore, { gameEvent, playerEvent, setError } from './store/useStore';
import { Chat, Game, Login, MyAcount, PlayerList } from './components/';
import { ErrorDialog } from './components/base/';

function App() {
	const load = useRef(false);
	const eventLoad = useRef(false);
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
		if (!eventLoad.current) {
			eventLoad.current = true;
			connection?.on('onLogin', playerEvent.onLogin);
			connection?.on('onPlayerLogin', playerEvent.onPlayerLogin);
			connection?.on('onPlayerLogout', playerEvent.onPlayerLogout);
			connection?.on('onPlayerState', playerEvent.onPlayerState);
			connection?.on('onGameSet', gameEvent.onSetGame);
			connection?.on('onGameClose', gameEvent.onGameClose);
			connection?.on('onGameMessage', gameEvent.onGameMessage);
			connection?.on('onError', setError);
		}
	}, [connection]);

	return (
		<div className='dashboard'>
			{state !== 'Connected' ? (
				<Login />
			) : !game ? (
				<>
					<MyAcount />
					<PlayerList />
				</>
			) : (
				<>
					<Game />
					<Chat />
				</>
			)}
			<ErrorDialog />
		</div>
	);
}

export default memo(App);
