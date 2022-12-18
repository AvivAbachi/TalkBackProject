import { useState, memo } from 'react';
import { PlayerStateType } from '../types';
import useStore, { gameEvent } from '../store/useStore';
import { Panel, PlayerListItem } from './base/';
import { CardBody, Tabs, Tab, TabsHeader } from '@material-tailwind/react';

function PlayerList() {
	const [filter, setFilter] = useState<PlayerStateType>('Idle');
	const player = useStore((state) => state.player);
	const list = useStore((state) => state.playersList);

	return (
		<Panel title='Player List' className='mt-24 lg:mt-0'>
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
					{list.map((pl) => (
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
