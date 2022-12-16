import { useState, FormEvent, useContext, useMemo } from 'react';
import { FormErrorType, FormType } from '../types';
import { login, register } from '../api/talkbackApi';
import { TalkBackContext, TalkBackContextType } from '../hooks/TalkBackContext';

import {
	Card,
	CardHeader,
	CardBody,
	Typography,
	Alert,
	Input,
	Button,
} from '@material-tailwind/react';

import { colors } from '@material-tailwind/react/types/generic';

function Login() {
	const { userEvent } = useContext(TalkBackContext) as TalkBackContextType;
	const [Waiting, setWaiting] = useState(false);
	const [isLogin, setIsLogin] = useState(false);

	const [formValue, setFormValue] = useState<FormType>({
		UserName: '',
		Password: '',
	});

	const [formError, setFormError] = useState<FormErrorType>({
		UserName: [],
		Password: [],
		Server: [],
	});

	const color = useMemo(() => (isLogin ? 'indigo' : 'light-blue') as colors, [isLogin]);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setWaiting(true);
		setFormError({ UserName: [], Password: [], Server: [] });
		try {
			const res = isLogin ? await login(formValue) : await register(formValue);
			userEvent.login(res?.data);
		} catch (err: any) {
			if (err?.response?.status === 400) {
				const data = err.response.data;
				setFormError(!!data?.errors ? data?.errors : data);
			} else {
				setFormError({ ...formError, Server: [err.message] });
			}
		} finally {
			setWaiting(false);
		}
	};

	const handelSwitch = () => {
		setIsLogin(!isLogin);
		setFormError({ UserName: [], Password: [], Server: [] });
	};

	const onChange = (e: any) => {
		setFormValue({ ...formValue, [e.target.name]: e.target.value });
	};

	return (
		<div className='grid min-h-screen place-items-center p-4'>
			<Card className='w-full max-w-md shadow-xl'>
				<CardHeader color={color} variant='gradient'>
					<Typography className='m-4 text-center text-3xl font-bold uppercase' as='h1'>
						{isLogin ? 'Login ' : 'Register'}
					</Typography>
				</CardHeader>
				<CardBody>
					<form onSubmit={handleSubmit} className='grid gap-4'>
						<Input
							label='Username'
							variant='standard'
							size='lg'
							color={!!formError?.UserName?.length ? 'red' : color}
							name='UserName'
							value={formValue.UserName}
							onChange={onChange}
						/>
						{formError.UserName?.map((error) => (
							<Error error={error} />
						))}
						<Input
							label='Password'
							variant='standard'
							size='lg'
							color={!!formError?.Password?.length ? 'red' : color}
							name='Password'
							type='password'
							value={formValue.Password}
							onChange={onChange}
						/>
						{formError.Password?.map((error) => (
							<Error error={error} />
						))}
						<Button color={color} disabled={Waiting} type='submit'>
							{isLogin ? 'Log In' : 'Sign up'}
						</Button>
						{formError.Server?.map((error) => (
							<Error error={error} />
						))}
						<div className=' flex justify-center'>
							{!isLogin ? 'Already have an account?' : "Don't have an account?"}
							<Typography
								color={color}
								className='ml-1 cursor-pointer font-semibold'
								onClick={handelSwitch}
							>
								{!isLogin ? 'Log in' : 'Sign up'}
							</Typography>
						</div>
					</form>
				</CardBody>
			</Card>
		</div>
	);
}

export default Login;

function Error({ error }: { error: string }) {
	return (
		<Alert
			variant='gradient'
			icon={
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='mr-1 inline-block h-6 w-6 flex-shrink-0 stroke-current'
					fill='none'
					viewBox='0 0 24 24'
				>
					<path
						children
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
					/>
				</svg>
			}
			color='red'
		>
			{error}
		</Alert>
	);
}
