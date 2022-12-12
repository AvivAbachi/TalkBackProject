import { memo } from 'react';
import { Button } from '@mui/material';
import { MarkType } from '../types';

interface BoardButtonProps {
	onClick?: () => void;
	value?: MarkType;
	disabled?: boolean;
}

function BoardButton({ onClick, value, disabled }: BoardButtonProps) {
	return (
		<Button
			variant='contained'
			onClick={onClick}
			color={value === 'X' ? 'success' : value === 'O' ? 'warning' : 'info'}
			disabled={disabled || value !== ''}
		>
			{value}
		</Button>
	);
}
export default memo(BoardButton);
