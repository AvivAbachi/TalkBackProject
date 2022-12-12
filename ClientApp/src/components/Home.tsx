import { Button, Divider, List, Typography } from '@mui/material';
import { useContext, memo } from 'react';
import { TalkBackContext, TalkBackContextType } from '../hooks/TalkBackContext';
import UserListItem from './UserListItem';

function Home() {
	const {
		state: { user, usersList },
		userEvent: { changeState },
		gameEvent: { gameOpen },
	} = useContext(TalkBackContext) as TalkBackContextType;

	return (
		<div>
			<Typography variant='h3' component='h1'>
				User Page, {user?.userName}
			</Typography>
			<p>{user?.connectionId}</p>
			<p>{user?.status}</p>
			<Button
				variant='contained'
				color={user?.status === 'Ready' ? 'success' : 'secondary'}
				onClick={changeState}
			>
				{user?.status === 'Ready' ? 'Ready to Play' : 'Not Ready'}
			</Button>
			<List>
				<Divider variant='middle' component='li' />
				{usersList?.map(({ connectionId, status, userName }) => (
					<UserListItem
						key={connectionId}
						userName={userName}
						connectionId={connectionId}
						status={status}
						onClick={gameOpen}
						userId={user?.connectionId}
					/>
				))}
			</List>
		</div>
	);
}

export default memo(Home);
