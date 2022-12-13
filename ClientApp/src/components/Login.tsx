import { useState, FormEvent, useContext } from 'react';
import { FormErrorType, FormType } from '../types';
import { login, register } from '../api/talkbackApi';
import { TalkBackContext, TalkBackContextType } from '../hooks/TalkBackContext';

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

	const onChange = (e: any) => {
		setFormValue({ ...formValue, [e.target.name]: e.target.value });
	};

	return (
		<div>
			<div className='card mx-auto mt-32 w-[28rem] bg-base-100 shadow-xl'>
				<h1 className='card-title justify-center p-8 text-3xl'>
					{isLogin ? 'Login ' : 'Register'}
				</h1>
				<form onSubmit={handleSubmit}>
					<div className='form-control card-body gap-4 px-9 py-0'>
						<label className='label'>
							<span className='label-text'>Username</span>
						</label>
						<input
							className={
								'input-bordered input' +
								(!!formError?.UserName?.length ? ' input-error' : '')
							}
							name='UserName'
							value={formValue.UserName}
							onChange={onChange}
						/>
						{formError.UserName?.map((error) => (
							<Error>{error}</Error>
						))}
						<label className='label'>
							<span className='label-text'>Password</span>
						</label>
						<input
							className={
								'input-bordered input' +
								(!!formError?.Password?.length ? ' input-error' : '')
							}
							name='Password'
							type='password'
							value={formValue.Password}
							onChange={onChange}
						/>
						{formError.Password?.map((error) => (
							<Error>{error}</Error>
						))}
					</div>
					<div className='form-control p-8'>
						<button className='btn-primary btn' disabled={Waiting} type='submit'>
							{isLogin ? 'Log In' : 'Sign up'}
						</button>
						{formError.Server?.map((error) => (
							<Error>{error}</Error>
						))}
						<div className='mt-6 flex justify-center'>
							{!isLogin ? 'Already have an account?' : "Don't have an account?"}
							<span
								className='ml-1 cursor-pointer font-bold text-[--p]'
								onClick={() => setIsLogin(!isLogin)}
							>
								{!isLogin ? 'Log in' : 'Sign up'}
							</span>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;

function Error({ children }: { children: React.ReactNode }) {
	return (
		<div className='alert alert-error rounded-lg text-sm shadow-lg'>
			<div>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-6 w-6 flex-shrink-0 stroke-current'
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
				<span>{children}</span>
			</div>
		</div>
	);
}

// <div className='mx-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md '>
// 				<div className='px-6 py-4'>
// 					<h1 className='text-center text-3xl font-bold text-gray-700 dark:text-white'>
// 						TalkBack Poject
// 					</h1>

// 					<h2 className='mt-1 text-center text-xl font-medium text-gray-600 dark:text-gray-200'>
// 						{isLogin ? 'Login ' : 'Register'}
// 					</h2>

// 					<form onSubmit={handleSubmit}>
// 						<div className='mt-4 w-full'>
// 							<label htmlFor='UserName' className='block text-sm text-gray-800 '>
// 								Username
// 							</label>
// 							<input
// 								className={
// 									'mt-2 block w-full rounded-lg border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40' +
// 									(!!formError?.UserName?.length ? ' input-err' : '')
// 								}
// 								aria-label='Username'
// 								name='UserName'
// 								value={formValue.UserName}
// 								onChange={onChange}
// 							/>
// 						</div>

// 						<div className='mt-4 w-full'>
// 							<label htmlFor='Password' className='block text-sm text-gray-800 '>
// 								Password
// 							</label>
// 							<input
// 								className={
// 									'mt-2 block w-full rounded-lg border bg-white px-4 py-2 text-gray-700  focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40' +
// 									(!!formError?.Password?.length ? ' input-err' : '')
// 								}
// 								value={formValue.Password}
// 								onChange={onChange}
// 								name='Password'
// 								type='password'
// 							/>
// 						</div>

// 						<button className='mt-4  w-full transform rounded-lg bg-blue-500 px-6 py-2 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'>
// 							{isLogin ? 'Log In' : 'Sign up'}
// 						</button>
// 					</form>
// 				</div>

// 				<div className='flex items-center justify-center bg-gray-50 py-4 text-center'>
// 					<span className='text-sm text-gray-600'>
// 						{!isLogin ? 'Already have an account?' : "Don't have an account?"}
// 					</span>

// 					<span
// 						className='mx-2 cursor-pointer text-sm font-bold text-blue-500 hover:underline'
// 						onClick={() => setIsLogin(!isLogin)}
// 					>
// 						{!isLogin ? 'Log in' : 'Sign up'}
// 					</span>
// 				</div>
// 			</div>
