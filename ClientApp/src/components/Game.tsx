import { memo, useMemo, useContext } from 'react';
import { TalkBackContext, TalkBackContextType } from '../hooks/TalkBackContext';
import BoardButton from './BoardButton';

import {
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	Typography,
	Button,
} from '@material-tailwind/react';

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
		<div className='grid min-h-screen place-items-center p-4'>
			<Card className='text-center'>
				<CardHeader color='light-blue' variant='gradient' className='p-4'>
					<Typography variant='h4' as='h1'>
						Tic Tac Toe
					</Typography>
				</CardHeader>
				<CardBody>
					<Typography variant='h4'>{gameTitle}</Typography>
					<p>
						{game?.p1?.userName} vs {game?.p2?.userName}
					</p>
				</CardBody>
				<CardFooter divider className='pt-3 pb-8'>
					<div
						className={
							'm-4 mx-auto grid w-fit grid-cols-3 gap-3 rounded-3xl p-4' +
							(yourTurn ? ' bg-blue-gray-500/20' : '')
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
					<Button
						variant='gradient'
						color='green'
						disabled={
							game?.gameState === 'P1' ||
							game?.gameState === 'P2' ||
							game?.gameState === player + 'R'
						}
						onClick={gameReady}
					>
						Ready
					</Button>
					<Button variant='gradient' color='red' className='mx-4' onClick={gameLeave}>
						Leave
					</Button>
					<Button
						variant='gradient'
						color='orange'
						onClick={gameReset}
						disabled={game?.gameState === 'Wait'}
					>
						Reset
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}

export default memo(Game);
