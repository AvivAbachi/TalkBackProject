import { memo, useMemo } from 'react';
import { GameT, LoginStateType, MarkType } from '../types';

interface GameProps {
	user: LoginStateType;
	game: GameT;
	onReady?: () => void;
	onReset?: () => void;
	onTurn?: (i: number) => void;
	onLeave?: () => void;
}

function Game({ user, game, onReady, onReset, onTurn, onLeave }: GameProps) {
	const player = useMemo(
		() => (game.player1?.connectionId === user.connectionId ? 'P1' : 'P2'),
		[game.player1?.connectionId, user.connectionId]
	);
	const yourTurn = useMemo(() => game.gameState === player, [game.gameState, player]);

	const gameTitle = useMemo(() => {
		switch (game.gameState) {
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
				return game.gameState;
		}
	}, [game.gameState, player]);

	return (
		<div className='game'>
			<h1>Tic Tac Toe</h1>
			<h2>{gameTitle}</h2>
			<p>
				{game.player1?.userName} vs {game.player2?.userName}
			</p>
			<div className={'board' + (yourTurn ? ' board-active' : '')}>
				{game.board.map((value, i) => (
					<BoardButton
						key={i}
						value={value}
						disabled={!yourTurn}
						onClick={() => onTurn?.(i)}
					/>
				))}
			</div>
			<button
				className='btn btn-primary'
				onClick={onReady}
				disabled={
					game.gameState === 'P1' ||
					game.gameState === 'P2' ||
					game.gameState === player + 'R'
				}
			>
				Ready
			</button>
			<button className='btn btn-secondary mx-3' onClick={onLeave}>
				Leave
			</button>
			<button
				className='btn btn-dark'
				onClick={onReset}
				disabled={game.gameState === 'Wait'}
			>
				Reset
			</button>
		</div>
	);
}

export default memo(Game);

interface BoardButtonProps {
	onClick?: () => void;
	value?: MarkType;
	disabled?: boolean;
}

function BoardButton({ onClick, value, disabled }: BoardButtonProps) {
	return (
		<button
			onClick={onClick}
			className={
				'btn ' +
				(value === 'X' ? 'btn-success' : value === 'O' ? 'btn-danger' : 'btn-secondary')
			}
			disabled={disabled || value !== ''}
		>
			{value}
		</button>
	);
}
