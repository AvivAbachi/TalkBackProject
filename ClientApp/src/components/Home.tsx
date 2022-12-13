import { useContext, memo, useState, useCallback } from 'react';
import { TalkBackContext, TalkBackContextType } from '../hooks/TalkBackContext';
import UserListItem from './UserListItem';

function Home() {
	const {
		state: { user, usersList },
		userEvent: { status, logout },
		gameEvent: { gameOpen },
	} = useContext(TalkBackContext) as TalkBackContextType;
	const [filter, setFilter] = useState('All');
	const filterList = useCallback(
		() => (filter === 'All' ? usersList : usersList.filter((u) => u.status === filter)),
		[filter, usersList]
	);

	return (
		<div className='mx-auto mt-8   max-w-7xl justify-center gap-10 p-8 lg:flex'>
			<div className='mb-20 w-full'>
				<div>
					<div color='blue' className='p-4'>
						<div className='flex items-center justify-between'>
							My Acounnt
							<button color='red' onClick={logout}>
								Logout
							</button>
						</div>
					</div>
					<div>
						<div color='black'>Hello, {user?.userName}</div>
						<p className='mt-4'>Status: {user?.status}</p>
						<p>Connection Id: {user?.connectionId}</p>
					</div>
					<div className='-mb-12 pt-0'>
						<button
							//size='lg'
							//variant={user?.status === 'Ready' ? 'gradient' : 'filled'}
							color={user?.status === 'Ready' ? 'teal' : 'gray'}
							onClick={status}
						>
							{user?.status === 'Ready' ? 'Ready to Play!' : 'You Ready?'}
						</button>
					</div>
				</div>
			</div>
			<div className='w-full'>
				<div>
					<div color='blue' className='p-4'>
						<div>Player List</div>
					</div>
					<div>
						<div>
							<div>
								<div onClick={() => setFilter('All')}>All Player</div>
								<div onClick={() => setFilter('Ready')}>Ready To Play</div>
							</div>
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
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default memo(Home);
