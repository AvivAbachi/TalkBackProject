import { StateT } from '../App';
import Chat from './chat';
import Game from './game';
import { ReactNode, useState } from 'react';
import GameConnector from '../service/GameConnector';

function Users({ user }: { user: StateT }) {
	const { events, ...game } = GameConnector(user.username, user.token);

	const [userList, setUserList] = useState([]);

	return (
		<div>
			User Page
			{/* <Game></Game> */}
			<div>id: {user.id}</div>
			<div>token: {user.token}</div>
			<div>tokenExpirationTime: {user.tokenExpirationTime}</div>
			<div>username: {user.username}</div>
			<Chat></Chat>
		</div>
	);
}

type User = {};

export default Users;
