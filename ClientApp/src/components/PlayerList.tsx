import { useState, memo, useCallback } from 'react';
import { PlayerStateType } from '../types';
import useStore, { gameEvent } from '../store/useStore';
import { Panel, PlayerListItem } from './base/';
import { CardBody, Tabs, Tab, TabsHeader } from '@material-tailwind/react';

function PlayerList() {
	const [filter, setFilter] = useState<PlayerStateType>('Idle');
	const player = useStore((state) => state.player);
	const list = useStore((state) => state.playersList);
	const filterList = useCallback(
		() => (filter === 'Idle' ? list : list.filter((p) => p.status === filter)),
		[filter, list]
	);

	return (
		<Panel title='Player List' className='mt-24 lg:mt-0'>
			<CardBody>
				<Tabs value={filter}>
					<TabsHeader>
						<Tab value='Idle' onClick={() => setFilter('Idle')}>
							All player
						</Tab>
						<Tab value='Ready' onClick={() => setFilter('Ready')}>
							Ready to play
						</Tab>
					</TabsHeader>
				</Tabs>
				<ul className='max-h-96 overflow-auto'>
					{filterList().map((pl) => (
						<PlayerListItem
							key={pl.connectionId}
							{...pl}
							onClick={gameEvent.gameOpen}
							playerId={player?.connectionId}
						/>
					))}
				</ul>
			</CardBody>
		</Panel>
	);
}
export default memo(PlayerList);
