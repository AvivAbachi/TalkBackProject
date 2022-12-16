import { memo } from 'react';
import { Button } from '@material-tailwind/react/';
import { MarkType } from '../types';

interface BoardButtonProps {
	onClick?: () => void;
	value?: MarkType;
	disabled?: boolean;
}

function BoardButton({ onClick, value, disabled }: BoardButtonProps) {
	return (
		<Button
			variant='gradient'
			color='blue-gray'
			className='btn-board'
			onClick={onClick}
			disabled={disabled || value !== ''}
		>
			{value}
		</Button>
	);
}
export default memo(BoardButton);
