import { useEffect, useState } from 'react';
import Connector, { State, Turn } from '../service/mainSerive';

export default function XO() {
	const { playerTurn, playerReset, playerReady, events } = Connector();

	const [state, setState] = useState<State>('Wait');
	const [player, setPlayer] = useState('P1');

	const [board, setBoard] = useState<Turn[][]>([
		['', '', ''],
		['', '', ''],
		['', '', ''],
	]);

	useEffect(() => {
		events(
			(x, y, value, state) => {
				const upBoard = board;
				upBoard[x][y] = value;
				setBoard([...upBoard]);
				setState(state);
			},
			(state) => {
				setState(state);
				setBoard([
					['', '', ''],
					['', '', ''],
					['', '', ''],
				]);
			},
			(state) => {
				setState(state);
			}
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='XO'>
			<h1>{state + ' ' + player}</h1>
			{board.map((row, x) => (
				<div>
					{row.map((value, y) => (
						<button onClick={() => playerTurn(x, y, player)} disabled={state !== player}>
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
			<button onClick={() => playerReady(player)}>Ready</button>
			<button onClick={playerReset}>Reset</button>
		</div>
	);
}
