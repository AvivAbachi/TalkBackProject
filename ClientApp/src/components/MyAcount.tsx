import { memo } from 'react';
import useStore, { playerEvent } from '../store/useStore';
import { Panel } from './base/';
import { CardBody, Typography, Button } from '@material-tailwind/react';

function MyAcount() {
	const player = useStore((state) => state.player);

	return (
		<Panel as='h2' title='My Acounnt' action='logout' onClick={playerEvent.logout}>
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
		</Panel>
	);
}

export default memo(MyAcount);
