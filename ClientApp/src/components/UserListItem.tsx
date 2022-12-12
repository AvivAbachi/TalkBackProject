import { PlayerType } from '../types';
import { Button, Divider, ListItem, ListItemText } from '@mui/material';
import { memo } from 'react';

interface UserListItemProps extends PlayerType {
	onClick: (connectionId: string | null) => void;
	userId?: string | null;
}

function UserListItem({
	onClick,
	connectionId,
	status,
	userName,
	userId,
}: UserListItemProps) {
	return (
		<>
			<ListItem
				secondaryAction={
					status === 'Ready' &&
					!(connectionId === userId) && (
						<Button onClick={() => onClick(connectionId)}>Play</Button>
					)
				}
			>
				<ListItemText primary={userName} secondary={status} />
			</ListItem>
			<Divider variant='middle' component='li' />
		</>
	);
}

export default memo(UserListItem);
