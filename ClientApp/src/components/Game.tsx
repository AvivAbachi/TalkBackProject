import { memo, useMemo, useContext } from 'react';
import { Button } from '@mui/material';
import { TalkBackContext, TalkBackContextType } from '../hooks/TalkBackContext';
import BoardButton from './BoardButton';

function Game() {
	const {
		state: { user, game },
		gameEvent: { gameLeave, gameReady, gameReset, gameTurn },
	} = useContext(TalkBackContext) as TalkBackContextType;

	const player = useMemo(
		() => (game?.player1?.connectionId === user?.connectionId ? 'P1' : 'P2'),
		[game?.player1?.connectionId, user?.connectionId]
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
		<div className='game'>
			<h1>Tic Tac Toe</h1>
			<h2>{gameTitle}</h2>
			<p>
				{game?.player1?.userName} vs {game?.player2?.userName}
			</p>
			<div className={'board' + (yourTurn ? ' board-active' : '')}>
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
				color='primary'
				disabled={
					game?.gameState === 'P1' ||
					game?.gameState === 'P2' ||
					game?.gameState === player + 'R'
				}
				onClick={gameReady}
			>
				Ready
			</Button>
			<Button color='secondary' className='mx-3' onClick={gameLeave}>
				Leave
			</Button>
			<Button color='error' onClick={gameReset} disabled={game?.gameState === 'Wait'}>
				Reset
			</Button>
		</div>
	);
}

export default memo(Game);
