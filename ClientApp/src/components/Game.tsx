import { memo, useMemo } from 'react';
import classNames from 'classnames';
import useStore, { gameEvent } from '../store/useStore';
import { BoardButton, Panel } from './base/';
import gameUtilis from '../utils/gameUtilis';
import { CardBody, CardFooter, Typography, Button } from '@material-tailwind/react';

function Game() {
	const pl = useStore((state) => state.player);
	const game = useStore((state) => state.game);

	const player = useMemo(
		() => (game?.p1?.connectionId === pl?.connectionId ? 'P1' : 'P2'),
		[game?.p1?.connectionId, pl?.connectionId]
	);

	const yourTurn = useMemo(() => game?.gameState === player, [game?.gameState, player]);

	const title = useMemo(
		() => gameUtilis.title(game?.gameState, player),
		[game?.gameState, player]
	);

	return (
		<Panel title='Tic Tac Toe' action='Leave' onClick={gameEvent.gameLeave}>
			<CardBody className='text-center'>
				<Typography variant='h4'>{title}</Typography>
				{game?.p1?.userName} vs {game?.p2?.userName}
			</CardBody>
			<CardFooter divider className='pt-3 pb-8'>
				<div className={classNames('board', { 'bg-blue-gray-500/20': yourTurn })}>
					{game?.board.map((mark, i) => (
						<BoardButton
							key={i}
							value={mark.value}
							hightlight={
								mark.status && (game.gameState === 'P1W' || game.gameState === 'P2W')
									? game.gameState === player + 'W'
										? 'win'
										: 'lose'
									: ''
							}
							disabled={!yourTurn}
							onClick={() => gameEvent.gameTurn(i)}
						/>
					))}
				</div>
				<Button
					variant='gradient'
					color='green'
					className='mx-auto block w-full max-w-[19.5rem] text-sm'
					disabled={
						game?.gameState === 'P1' ||
						game?.gameState === 'P2' ||
						game?.gameState === player + 'R'
					}
					onClick={gameEvent.gameReady}
				>
					Ready
				</Button>
			</CardFooter>
		</Panel>
	);
}

export default memo(Game);
