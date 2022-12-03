import { useState } from 'react';
import Login from './components/login';
import Users from './components/users';

function App() {
	const [user, setUser] = useState<StateT>();

	function handelLogin(data: StateT) {
		data.token = 'Bearer ' + data.token;
		setUser(data);
	}

	return (
		<div className='App'>
			{user ? <Users user={user} /> : <Login onSuccess={handelLogin}></Login>}
		</div>
	);
}

export default App;

export type StateT = {
	token: string;
	tokenExpirationTime: number;
	id: string;
	username: string;
};
