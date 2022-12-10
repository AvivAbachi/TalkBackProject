import { memo } from 'react';
import Login from './components/Login';
import Game from './components/Game';
import Home from './components/Home';
import useTalkBackProject from './hooks/useTalkBackProject';
import { HttpTransportType } from '@microsoft/signalr';

function App() {
	const {
		Provider,
		state: { user, game, playerList },
		loginEvent,
		userEvent,
		gameEvent,
	} = useTalkBackProject();
	return !user ? (
		<Login onSuccess={userEvent.handelLogin} />
	) : (
		<Provider
			onOpen={loginEvent.onOpen}
			onClosed={loginEvent.onClosed}
			connectEnabled={!!user.token}
			dependencies={[user.token]}
			url='https://localhost:7025/hubs/lobby'
			accessTokenFactory={() => user?.token!}
			skipNegotiation
			transport={HttpTransportType.WebSockets}
		>
			{!game ? (
				<Home
					user={user}
					playerList={playerList}
					changeState={userEvent.changeState}
					openGame={gameEvent.openGame}
				/>
			) : (
				<Game
					user={user}
					game={game}
					onReady={gameEvent.readyGame}
					onReset={gameEvent.resetGame}
					onLeave={gameEvent.leaveGame}
					onTurn={gameEvent.turnGame}
				/>
			)}
		</Provider>
	);
}

export default memo(App);

// https://www.youtube.com/playlist?list=PLThyvG1mlMzltDxuQj0uQw1TDu1gJUNeG
// https://github.com/MartinPrivoznik/online-memory-game-using-signalR
// https://radzion.com/blog/asp-react-blog/authentication
// https://github.com/moshecstern/.NETReact

// https://github.com/AndyButland/BackgammonR
