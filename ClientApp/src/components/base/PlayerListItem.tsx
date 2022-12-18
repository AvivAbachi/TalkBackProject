import { memo } from 'react';
import { PlayerType } from '../../types';
import { Button, Typography } from '@material-tailwind/react/';

interface UserListItemProps extends PlayerType {
	onClick?: (connectionId: string | null) => void;
	playerId?: string | null;
}

function PlayerListItem({
	onClick,
	connectionId,
	status,
	userName,
	playerId,
}: UserListItemProps) {
	return (
		<div className='flex items-center border-b px-4 py-2'>
			<div className='w-full'>
				<Typography color='black' variant='h6'>
					{userName}
				</Typography>
				<Typography variant='small' className='text-gray-500'>
					{status}
				</Typography>
			</div>
			<div>
				{status === 'Ready' && !(connectionId === playerId) && (
					<Button
						size='sm'
						variant='gradient'
						color='light-green'
						onClick={() => onClick?.(connectionId)}
					>
						Play
					</Button>
				)}
			</div>
		</div>
	);
}

export default memo(PlayerListItem);
