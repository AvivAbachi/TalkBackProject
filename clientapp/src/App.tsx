import React, { useEffect, useState } from 'react';
import './App.css';
import { HubConnectionBuilder } from '@microsoft/signalr';

const username = new Date().getTime();

const url = 'https://localhost:7025/hub';

function App() {
	const [connection, setConnection] = useState<any>(null);

	useEffect(() => {
		const connection = new HubConnectionBuilder()
			.withUrl(url)
			.withAutomaticReconnect()
			.build();

		setConnection(connection);
	}, []);

	useEffect(() => {
		if (connection) {
			connection
				.start()
				.then(() => {
					console.log('Dafna Connected!');
					connection.on('messageReceived', (username: string, message: string) => {
						console.log(username, message);
					});
				})
				.catch((err: any) => console.log(err));
		}
	}, [connection]);

	async function send() {
		await connection?.send('newMessage', username, 'Test');
	}
	return (
		<div className='App'>
			<button onClick={send}>Send</button>
		</div>
	);
}

export default App;
