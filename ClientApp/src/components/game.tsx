import { useEffect, useRef, useState } from 'react';
import GameConnector, { State, Turn } from '../service/GameConnector';

const defaultBoard: Turn[][] = [
	['', '', ''],
	['', '', ''],
	['', '', ''],
];

export default function Game({ username = '' }) {
	const { events, ...game } = GameConnector(username, '');
	const [state, setState] = useState<State>('Wait');
	const [player, setPlayer] = useState('P1');
	const [board, setBoard] = useState(defaultBoard);
	const eventLoad = useRef(false);

	useEffect(() => {
		if (!eventLoad.current) {
			eventLoad.current = true;
			events.onPlayerTurn((x, y, value, state) => {
				const upBoard = board;
				upBoard[x][y] = value;
				setBoard([...upBoard]);
				setState(state);
			});

			events.onPlayerReday((state) => {
				setState(state);
			});

			events.onPlayerReset((state) => {
				setState(state);
				setBoard(defaultBoard);
			});

			events.onPlayerLogin((connectionId, username) => {
				console.log(connectionId, username);
			});

			events.onPlayerLogout((connectionId) => {
				console.log(connectionId);
			});

			events.getPlayers((players) => {
				console.log(players);
			});
		}
	});

	return (
		<div className='game'>
			<h1>{'game: ' + state + 'player:' + player}</h1>
			{board.map((row, x) => (
				<div key={x}>
					{row.map((value, y) => (
						<button
							key={y}
							onClick={() => game.playerTurn(x, y, player)}
							disabled={state !== player}
						>
							{value}
						</button>
					))}
				</div>
			))}
			<input
				type='radio'
				name='player'
				checked={player === 'P1'}
				onChange={() => setPlayer('P1')}
			/>
			P1
			<input
				type='radio'
				name='player'
				checked={player === 'P2'}
				onChange={() => setPlayer('P2')}
			/>
			P2
			<button onClick={() => game.playerReady(player)}>Ready</button>
			<button onClick={game.playerReset}>Reset</button>
		</div>
	);
}

// https://www.youtube.com/playlist?list=PLThyvG1mlMzltDxuQj0uQw1TDu1gJUNeG
// https://github.com/AndyButland/BackgammonR
// https://github.com/MartinPrivoznik/online-memory-game-using-signalR
// https://radzion.com/blog/asp-react-blog/authentication
