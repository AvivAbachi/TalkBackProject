import { memo, useContext } from 'react';
import Login from './components/Login';
import Game from './components/Game';
import Home from './components/Home';
import { TalkBackContext, TalkBackContextType } from './hooks/TalkBackContext';

function App() {
	const {
		state: { user, game },
	} = useContext(TalkBackContext) as TalkBackContextType;

	return !user ? <Login /> : !game ? <Home /> : <Game />;
}

export default memo(App);

// https://www.youtube.com/playlist?list=PLThyvG1mlMzltDxuQj0uQw1TDu1gJUNeG
// https://github.com/MartinPrivoznik/online-memory-game-using-signalR
// https://radzion.com/blog/asp-react-blog/authentication
// https://github.com/moshecstern/.NETReact

// https://github.com/AndyButland/BackgammonR
