import axios from 'axios';
import { FormEvent, useState } from 'react';
import { LoginStateType } from '../types';

interface LoginProps {
	onSuccess: (data: LoginStateType) => void;
}

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const URL = 'https://localhost:7025/';

function Login({ onSuccess }: LoginProps) {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [isLogin, setIsLogin] = useState(false);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		axios
			.post(URL + (isLogin ? 'Login' : 'Register'), { userName, password })
			.then((res) => onSuccess(res.data))
			.catch((err) => console.error(err));
	};
	return (
		<div>
			<img src='' alt='' />
			<h1>{isLogin ? 'Login ' : 'Register'}</h1>
			<form onSubmit={handleSubmit}>
				<input
					value={userName}
					placeholder='Username'
					onChange={(e) => setUserName(e.target.value)}
					required
				/>
				<br />
				<input
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Password'
					required
				/>
				<br />
				<button>{isLogin ? 'Login' : 'Register'}</button>
				<br />
				<button type='button' onClick={() => setIsLogin(!isLogin)}>
					{!isLogin ? 'To Login' : 'To Register'}
				</button>
			</form>
		</div>
	);
}

export function SimpleLogin({ onSuccess }: LoginProps) {
	const [userName, setUserName] = useState('');

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSuccess({ userName, id: '', status: 'Idle', token: '', connectionId: null });
	};

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<input
					value={userName}
					placeholder='Username'
					onChange={(e) => setUserName(e.target.value)}
					required
				/>
				<br />
				<button>Login</button>
			</form>
		</div>
	);
}

export default Login;
