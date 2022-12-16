import { useContext, memo, useState, useCallback } from 'react';
import { TalkBackContext, TalkBackContextType } from '../hooks/TalkBackContext';
import UserListItem from './UserListItem';

import {
	Card,
	CardHeader,
	CardBody,
	Typography,
	Tabs,
	Tab,
	TabsHeader,
	Button,
} from '@material-tailwind/react';

function Home() {
	const {
		state: { user, usersList },
		userEvent: { status, logout },
		gameEvent: { gameOpen },
	} = useContext(TalkBackContext) as TalkBackContextType;
	const [filter, setFilter] = useState('all');
	const filterList = useCallback(
		() => (filter === 'all' ? usersList : usersList.filter((u) => u.status === filter)),
		[filter, usersList]
	);

	return (
		<div className='mx-auto mt-16 max-w-7xl items-start justify-center gap-10 p-4 lg:flex'>
			<Card className='flex-1'>
				<CardHeader
					color='light-blue'
					variant='gradient'
					className='flex items-center justify-between p-4'
				>
					<Typography variant='h4' as='h2'>
						My Acounnt
					</Typography>
					<Button size='sm' color='red' variant='gradient' onClick={logout}>
						Logout
					</Button>
				</CardHeader>
				<CardBody>
					<div className='card-body p-0'>
						<Typography variant='h4'>Hello, {user?.userName}</Typography>
						<p>Status: {user?.status}</p>
						<p>Connection Id: {user?.connectionId}</p>
					</div>
				</CardBody>
				<Button
					className='mx-4 -mb-5'
					variant='gradient'
					size='lg'
					color={user?.status === 'Ready' ? 'light-green' : 'blue-gray'}
					onClick={status}
				>
					{user?.status === 'Ready' ? 'Ready to Play!' : 'You Ready?'}
				</Button>
			</Card>
			<Card className='mt-32 flex-1 lg:mt-0'>
				<CardHeader color='light-blue' variant='gradient' className='p-4'>
					<Typography variant='h4' as='h2'>
						Player List
					</Typography>
				</CardHeader>
				<CardBody>
					<Tabs value={filter} onChange={setFilter}>
						<TabsHeader>
							{[
								{ value: 'all', title: 'All player' },
								{ value: 'ready', title: 'Ready to play' },
							].map((tab) => (
								<Tab color='red' value={tab.value}>
									{tab.title}
								</Tab>
							))}
						</TabsHeader>
					</Tabs>
					<ul className='max-h-96 overflow-auto'>
						{filterList()?.map((u) => (
							<UserListItem
								key={u.connectionId}
								{...u}
								onClick={gameOpen}
								playerId={user?.connectionId}
							/>
						))}
					</ul>
				</CardBody>
			</Card>
		</div>
	);
}

export default memo(Home);
