import { useState, FormEvent, useRef, useEffect, memo } from 'react';
import useStore, { gameEvent } from '../store/useStore';
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Input,
	Typography,
} from '@material-tailwind/react';

function Chat() {
	const [message, setMessage] = useState('');
	const chatEl = useRef<HTMLDivElement | null>(null);
	const chat = useStore((state) => state.chat);

	useEffect(() => {
		if (chatEl.current) {
			chatEl.current.scrollTop = chatEl.current.scrollHeight;
		}
	}, [chat.length]);

	const handelSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (message.trim() !== '') {
			gameEvent.gameMessage(message).then(() => setMessage(''));
		}
	};

	return (
		<Card className='mt-24 flex-1 shadow-xl lg:mt-0'>
			<CardHeader color='light-blue' variant='gradient'>
				<Typography className='m-4 text-center text-3xl font-bold uppercase' as='h1'>
					Chat
				</Typography>
			</CardHeader>
			<CardBody>
				<div ref={chatEl} className='h-[422px] overflow-auto'>
					{chat.map((m, i) => (
						<div key={i} className={'message' + (m.send ? ' send' : '')}>
							{m.text}
						</div>
					))}
				</div>
			</CardBody>
			<CardFooter divider>
				<form onSubmit={handelSubmit} className='flex'>
					<Input
						size='lg'
						labelProps={{ className: 'hidden' }}
						className='m-0 border-t-gray-400 focus:!border-t-blue-500'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<Button
						type='submit'
						variant='gradient'
						className='text-md ml-4 flex h-11 items-center'
					>
						Send
						<div>
							<svg
								className='mx-2 h-5 w-5 rotate-90'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z' />
							</svg>
						</div>
					</Button>
				</form>
			</CardFooter>
		</Card>
	);
}

export default memo(Chat);
