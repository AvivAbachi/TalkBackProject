import { memo } from 'react';
import useStore, { playerEvent } from '../store/useStore';
import { Card, CardHeader, CardBody, Typography, Button } from '@material-tailwind/react';

function MyAcount() {
	const player = useStore((state) => state.player);

	return (
		<Card className='flex-1 shadow-xl'>
			<CardHeader
				color='light-blue'
				variant='gradient'
				className='flex items-center justify-between p-4'
			>
				<Typography variant='h4' as='h2'>
					My Acounnt
				</Typography>
				<Button size='sm' color='red' variant='gradient' onClick={playerEvent.logout}>
					Logout
				</Button>
			</CardHeader>
			<CardBody>
				<div className='card-body p-0'>
					<Typography variant='h4'>Hello, {player?.userName}</Typography>
					<p>Status: {player?.status}</p>
					<p>Connection Id: {player?.connectionId}</p>
				</div>
			</CardBody>
			<Button
				className='mx-4 -mb-5'
				variant='gradient'
				size='lg'
				color={player?.status === 'Ready' ? 'light-green' : 'blue-gray'}
				onClick={playerEvent.playerStatus}
			>
				{player?.status === 'Ready' ? 'Ready to Play!' : 'You Ready?'}
			</Button>
		</Card>
	);
}

export default memo(MyAcount);
