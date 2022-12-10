import { memo } from 'react';
import { LoginStateType, PlayerType } from '../types';

interface UsersProps {
	user: LoginStateType;
	playerList: PlayerType[];
	changeState: () => void;
	openGame: (p2Id: string | null) => void;
}

function Home({ user, playerList = [], changeState, openGame }: UsersProps) {
	return (
		<div>
			User Page, {user.userName}
			<ul>
				{playerList.map((u) => (
					<li key={u.connectionId}>
						{u.userName} - {u.status}
						{u.status === 'Ready' && u.connectionId !== user.connectionId && (
							<button onClick={() => openGame(u.connectionId)}>Start Play</button>
						)}
					</li>
				))}
			</ul>
			<button onClick={changeState}>Ready?</button>
		</div>
	);
}

export default memo(Home);
