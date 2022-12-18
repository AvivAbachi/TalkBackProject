import { memo, useMemo } from 'react';
import useStore, { gameEvent } from '../store/useStore';
import BoardButton from './base/BoardButton';
import {
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	Typography,
	Button,
} from '@material-tailwind/react';
import { gameTitle } from '../utils/gameUtilis';

function Game() {
	const pl = useStore((state) => state.player);
	const game = useStore((state) => state.game);

	const player = useMemo(
		() => (game?.p1?.connectionId === pl?.connectionId ? 'P1' : 'P2'),
		[game?.p1?.connectionId, pl?.connectionId]
	);

	const yourTurn = useMemo(() => game?.gameState === player, [game?.gameState, player]);

	const title = useMemo(
		() => gameTitle(game?.gameState, player),
		[game?.gameState, player]
	);

	return (
		<Card className='flex-1 text-center'>
			<CardHeader
				color='light-blue'
				variant='gradient'
				className='flex items-center justify-between p-4'
			>
				<Typography variant='h4' as='h1'>
					Tic Tac Toe
				</Typography>
				<Button variant='gradient' color='red' size='sm' onClick={gameEvent.gameLeave}>
					Leave
				</Button>
			</CardHeader>

			<CardBody>
				<Typography variant='h4'>{title}</Typography>
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
							onClick={() => gameEvent.gameTurn(i)}
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
					onClick={gameEvent.gameReady}
				>
					Ready
				</Button>

				<Button
					variant='gradient'
					color='orange'
					onClick={gameEvent.gameReset}
					disabled={game?.gameState === 'Wait'}
				>
					Reset
				</Button>
			</CardFooter>
		</Card>
	);
}

export default memo(Game);
