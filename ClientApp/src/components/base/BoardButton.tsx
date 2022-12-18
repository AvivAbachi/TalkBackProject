import { memo } from 'react';
import classNames from 'classnames';
import { Button } from '@material-tailwind/react/';

interface BoardButtonProps {
	onClick?: () => void;
	value?: '' | 'X' | 'O';
	disabled?: boolean;
	hightlight: '' | 'win' | 'lose';
}

function BoardButton({ onClick, value, disabled, hightlight }: BoardButtonProps) {
	return (
		<Button
			variant='gradient'
			color='blue-gray'
			className={classNames('btn-board', { [hightlight]: hightlight })}
			onClick={onClick}
			disabled={disabled || value !== ''}
		>
			{value}
		</Button>
	);
}

export default memo(BoardButton);
