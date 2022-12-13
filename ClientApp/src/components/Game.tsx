import { memo, useMemo, useContext } from 'react';
import { TalkBackContext, TalkBackContextType } from '../hooks/TalkBackContext';
import BoardButton from './BoardButton';
// import {
// 	Card,
// 	CardBody,
// 	CardFooter,
// 	CardHeader,
// 	Button,
// 	Typography,
// } from '@material-tailwind/react';

function Game() {
	const {
		state: { user, game },
		gameEvent: { gameLeave, gameReady, gameReset, gameTurn },
	} = useContext(TalkBackContext) as TalkBackContextType;

	const player = useMemo(
		() => (game?.p1?.connectionId === user?.connectionId ? 'P1' : 'P2'),
		[game?.p1?.connectionId, user?.connectionId]
	);
	const yourTurn = useMemo(() => game?.gameState === player, [game?.gameState, player]);

	const gameTitle = useMemo(() => {
		switch (game?.gameState) {
			case 'P1R':
			case 'P2R':
				return game.gameState === player + 'R'
					? 'Wait For Secound Player'
					: 'Please Be Ready';
			case 'P1':
			case 'P2':
				return game.gameState === player ? 'Your Turn' : 'Secound Player Turn';
			case 'P1W':
			case 'P2W':
				return game.gameState === player + 'W' ? 'You Win' : 'You Lose';
			default:
				return game?.gameState;
		}
	}, [game?.gameState, player]);

	return (
		<div className='grid h-screen place-items-center '>
			<div className='w-[28rem] text-center'>
				<div color='blue' className='mb-4 grid h-28 place-items-center'>
					<div color='white'>Tic Tac Toe</div>
				</div>
				<div>
					<div>{gameTitle}</div>
					<div>
						{game?.p1?.userName} vs {game?.p2?.userName}
					</div>
					<div
						className={
							'mx-auto mt-4 grid w-fit grid-cols-3 gap-3 rounded-3xl p-5' +
							(yourTurn ? ' bg-blue-500/10' : '')
						}
					>
						{game?.board.map((value, i) => (
							<BoardButton
								key={i}
								value={value}
								disabled={!yourTurn}
								onClick={() => gameTurn?.(i)}
							/>
						))}
					</div>
				</div>
				<div className=' pt-0'>
					<button
						color='green'
						disabled={
							game?.gameState === 'P1' ||
							game?.gameState === 'P2' ||
							game?.gameState === player + 'R'
						}
						onClick={gameReady}
					>
						Ready
					</button>
					<button color='indigo' className='mx-4' onClick={gameLeave}>
						Leave
					</button>
					<button color='red' onClick={gameReset} disabled={game?.gameState === 'Wait'}>
						Reset
					</button>
				</div>
			</div>
		</div>
	);
}

export default memo(Game);
