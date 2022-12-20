import { useState, FormEvent, memo } from 'react';
import { FormErrorType, FormType } from '../types';
import { playerEvent } from '../store/useStore';
import { Error, Panel } from './base/';
import { CardBody, Input, Button } from '@material-tailwind/react';

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
	});

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setWaiting(true);
		setFormError({ UserName: [], Password: [] });

		await playerEvent.submitForm(formValue, isLogin).catch((err) => setFormError(err));

		setWaiting(false);
	};

	const handelSwitch = () => {
		setIsLogin(!isLogin);
		setFormError({ UserName: [], Password: [] });
	};

	const onChange = (e: any) => {
		setFormValue({ ...formValue, [e.target.name]: e.target.value });
	};

	return (
		<Panel
			className='mx-auto w-full max-w-md self-center'
			title={isLogin ? 'Login ' : 'Sign up'}
			center
		>
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
					{formError.UserName?.map((error, i) => (
						<Error key={i} error={error} />
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
					{formError.Password?.map((error, i) => (
						<Error key={i} error={error} />
					))}
					<Button color='light-blue' disabled={Waiting} type='submit'>
						{isLogin ? 'Log In' : 'Sign up'}
					</Button>
					<div className='flex justify-center'>
						{!isLogin ? 'Already have an account?' : "Don't have an account?"}
						<button
							type='button'
							className='ml-1 cursor-pointer font-semibold text-light-blue-500'
							onClick={handelSwitch}
						>
							{!isLogin ? 'Log in' : 'Sign up'}
						</button>
					</div>
				</form>
			</CardBody>
		</Panel>
	);
}

export default memo(Login);
