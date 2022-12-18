import { useState, FormEvent, memo } from 'react';
import { FormErrorType, FormType } from '../types';
import { playerEvent } from '../store/useStore';
import Error from './base/Error';
import {
	Card,
	CardHeader,
	CardBody,
	Typography,
	Input,
	Button,
} from '@material-tailwind/react';

function Login() {
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

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setWaiting(true);
		setFormError({ UserName: [], Password: [], Server: [] });

		await playerEvent.login(formValue, isLogin).catch((err) => setFormError(err));

		setWaiting(false);
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
				<CardHeader color='light-blue' variant='gradient'>
					<Typography className='m-4 text-center text-3xl font-bold uppercase' as='h1'>
						{isLogin ? 'Login ' : 'Register'}
					</Typography>
				</CardHeader>
				<CardBody>
					<form onSubmit={handleSubmit} className='grid gap-4'>
						<Input
							value={formValue.UserName}
							color={!!formError?.UserName?.length ? 'red' : 'light-blue'}
							variant='standard'
							size='lg'
							label='Username'
							name='UserName'
							onChange={onChange}
						/>
						{formError.UserName?.map((error) => (
							<Error error={error} />
						))}
						<Input
							value={formValue.Password}
							color={!!formError?.Password?.length ? 'red' : 'light-blue'}
							variant='standard'
							size='lg'
							label='Password'
							name='Password'
							type='password'
							onChange={onChange}
						/>
						{formError.Password?.map((error) => (
							<Error error={error} />
						))}
						<Button color='light-blue' disabled={Waiting} type='submit'>
							{isLogin ? 'Log In' : 'Sign up'}
						</Button>
						{formError.Server?.map((error) => (
							<Error error={error} />
						))}
						<div className=' flex justify-center'>
							{!isLogin ? 'Already have an account?' : "Don't have an account?"}
							<Typography
								color='light-blue'
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

export default memo(Login);
