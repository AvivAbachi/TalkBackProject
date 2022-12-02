import * as signalR from '@microsoft/signalr';

const URL = 'https://localhost:7025/hub';

export type Turn = '' | 'x' | 'y';
export type State = 'Wait' | 'P1R' | 'P2R' | 'P1' | 'P2' | 'P1W' | 'P2W' | 'Darw';

class Connector {
	static instance: Connector;
	private connection: signalR.HubConnection;

	public events: (
		onPlayTurn: (x: number, y: number, value: Turn, state: State) => void,
		onPlayerReset: (state: State) => void,
		onPlayerReday: (state: State) => void
	) => void;

	constructor() {
		this.connection = new signalR.HubConnectionBuilder()
			.withUrl(URL)
			.withAutomaticReconnect()
			.build();

		this.connection.start().catch((err) => document.write(err));

		this.events = (onPlayerTurn, onPlayerReset, onPlayerReday) => {
			this.connection.on(
				'turnReceived',
				function (x: number, y: number, value: Turn, state: State) {
					onPlayerTurn(x, y, value, state);
				}
			);

			this.connection.on('resetReceived', function (state: State) {
				onPlayerReset(state);
			});

			this.connection.on('readyReceived', function (state: State) {
				onPlayerReday(state);
			});
		};
	}

	public playerTurn = (x: number, y: number, player: string) => {
		this.connection.send('playerTurn', x, y, player);
	};

	public playerReset = () => {
		this.connection.send('playerReset');
	};

	public playerReady = (player: string) => {
		this.connection.send('playerReady', player);
	};

	public static getInstance(): Connector {
		if (!Connector.instance) Connector.instance = new Connector();
		return Connector.instance;
	}
}

export default Connector.getInstance;
