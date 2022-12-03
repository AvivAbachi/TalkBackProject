import axios from 'axios';
import { FormEvent, useState } from 'react';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const URL = 'https://localhost:7025/';

function Login({ onSuccess }: { onSuccess: (e: any) => void }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isLogin, setIsLogin] = useState(false);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		axios
			.post(URL + (isLogin ? 'Login' : 'Register'), { username, password })
			.then((res) => onSuccess(res.data))
			.catch((err) => console.error(err));
	};
	return (
		<div>
			<img src='' alt='' />
			<h1>{isLogin ? 'Login' : 'Register'}</h1>
			<form onSubmit={handleSubmit}>
				<input
					value={username}
					placeholder='Username'
					onChange={(e) => setUsername(e.target.value)}
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

export default Login;
