import { memo } from 'react';
import { MarkType } from '../types';

interface BoardButtonProps {
	onClick?: () => void;
	value?: MarkType;
	disabled?: boolean;
}

function BoardButton({ onClick, value, disabled }: BoardButtonProps) {
	return (
		<button
			className='btn-board'
			onClick={onClick}
			color='blue'
			disabled={disabled || value !== ''}
		>
			{value}
		</button>
	);
}
export default memo(BoardButton);
