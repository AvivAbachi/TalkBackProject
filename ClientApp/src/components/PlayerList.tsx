import { useState, memo } from 'react';
import { PlayerStateType } from '../types';
import useStore, { gameEvent } from '../store/useStore';
import PlayerListItem from './base/PlayerListItem';
import {
	Card,
	CardHeader,
	CardBody,
	Typography,
	Tabs,
	Tab,
	TabsHeader,
} from '@material-tailwind/react';

function PlayerList() {
	const [filter, setFilter] = useState<PlayerStateType>('Idle');
	const player = useStore((state) => state.player);
	const list = useStore((state) => state.playersList);

	return (
		<Card className='mt-24 flex-1 shadow-xl lg:mt-0'>
			<CardHeader color='light-blue' variant='gradient' className='p-4'>
				<Typography variant='h4' as='h2'>
					Player List
				</Typography>
			</CardHeader>
			<CardBody>
				<Tabs
					value={filter}
					onChange={(val: string) => setFilter(val as PlayerStateType)}
				>
					<TabsHeader>
						<Tab value='Idle'>All player</Tab>
						<Tab value='Ready'>Ready to play</Tab>
					</TabsHeader>
				</Tabs>
				<ul className='max-h-96 overflow-auto'>
					{list.map((u) => (
						<PlayerListItem
							key={u.connectionId}
							{...u}
							onClick={gameEvent.gameOpen}
							playerId={player?.connectionId}
						/>
					))}
				</ul>
			</CardBody>
		</Card>
	);
}
export default memo(PlayerList);
