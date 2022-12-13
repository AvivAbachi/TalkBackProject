import { PlayerType } from '../types';
import { memo } from 'react';
interface UserListItemProps extends PlayerType {
	onClick: (connectionId: string | null) => void;
	playerId?: string | null;
}

function UserListItem({
	onClick,
	connectionId,
	status,
	userName,
	playerId,
}: UserListItemProps) {
	return (
		<div className='flex items-center border-b px-4 py-2'>
			<div className='w-full'>
				<div color='black'>{userName}</div>
				<div>{status}</div>
			</div>
			<div>
				{status === 'Ready' && !(connectionId === playerId) && (
					<button color='green' onClick={() => onClick(connectionId)}>
						Play
					</button>
				)}
			</div>
		</div>
	);
}

export default memo(UserListItem);
