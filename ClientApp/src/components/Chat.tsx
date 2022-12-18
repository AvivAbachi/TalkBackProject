import { useState, FormEvent, useRef, useEffect, memo } from 'react';
import classNames from 'classnames';
import useStore, { gameEvent } from '../store/useStore';
import { Panel } from './base/';
import { Button, CardBody, CardFooter, Input } from '@material-tailwind/react';
import { ReactComponent as IconSend } from './icons/send.svg';

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
		<Panel title='Chat' as='h2' className='mt-24 lg:mt-0'>
			<CardBody>
				<div
					ref={chatEl}
					className='h-[429px] overflow-auto rounded-xl bg-blue-gray-50/50 p-4'
				>
					{chat.map((m, i) => (
						<div key={i} className={classNames('message', { send: m.send })}>
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
						<IconSend className='ml-2 h-5 w-5 rotate-90' />
					</Button>
				</form>
			</CardFooter>
		</Panel>
	);
}

export default memo(Chat);
