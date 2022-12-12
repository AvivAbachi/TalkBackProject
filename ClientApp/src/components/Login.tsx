import { useState, FormEvent, useContext } from 'react';
import { FormType } from '../types';

import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import { TextField } from '@mui/material';
import { login, register } from '../api/talkbackApi';
import { TalkBackContext, TalkBackContextType } from '../hooks/TalkBackContext';

function Login() {
	const { userEvent } = useContext(TalkBackContext) as TalkBackContextType;

	const [isLogin, setIsLogin] = useState(false);
	const [formValue, setFormValue] = useState<FormType<string>>({
		UserName: '',
		Password: '',
	});

	const [formError, setFormError] = useState<FormType<string[]>>({
		UserName: [],
		Password: [],
	});

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const res = isLogin ? await login(formValue) : await register(formValue);
			userEvent.handelLogin(res.data);
			//console.info(res.data);
		} catch (err: any) {
			const data = err.response.data;
			if (!!data.errors) {
				//console.log('data.errors', data.errors);
				setFormError(data.errors);
			} else {
				console.log(err);
				//setFormError(data);
			}
		}
	};

	const onChange = (e: any) => {
		setFormValue({ ...formValue, [e.target.name]: e.target.value });
	};

	return (
		<div>
			<img src='' alt='' />
			<h1>{isLogin ? 'Login ' : 'Register'}</h1>
			<form onSubmit={handleSubmit} className='row g-3'>
				<Stack spacing={2} direction='column'>
					<TextField
						label='Username'
						name='UserName'
						value={formValue.UserName}
						onChange={onChange}
						variant='standard'
						error={!!formError?.UserName?.length}
						helperText={formError?.UserName}
						required
					/>
					<TextField
						label='Password'
						name='Password'
						type='password'
						value={formValue.Password}
						onChange={onChange}
						variant='standard'
						error={!!formError?.Password?.length}
						helperText={formError?.Password}
						required
					/>
					<Button type='submit' variant='contained'>
						{isLogin ? 'Login' : 'Register'}
					</Button>
					<Button type='button' onClick={() => setIsLogin(!isLogin)}>
						{!isLogin ? 'Login To Your Account' : 'Create New Account'}
					</Button>
				</Stack>
			</form>
		</div>
	);
}

export default Login;
