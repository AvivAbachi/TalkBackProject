import * as signalR from '@microsoft/signalr';

const URL = 'https://localhost:7025/hub';

export type Turn = '' | 'x' | 'y';
export type State = 'Wait' | 'P1R' | 'P2R' | 'P1' | 'P2' | 'P1W' | 'P2W' | 'Darw';

class Connector {
	static instance: Connector;
	private connection: signalR.HubConnection;

	public onPlayerTurn: (
		onPlayTurn: (x: number, y: number, value: Turn, state: State) => void
	) => void;
	public onPlayerReset: (onPlayerReset: (state: State) => void) => void;
	public onPlayerReday: (onPlayerReday: (state: State) => void) => void;

	constructor() {
		this.connection = new signalR.HubConnectionBuilder()
			.withUrl(URL)
			.withAutomaticReconnect()
			.build();

		this.connection.start().catch((err) => document.write(err));

		this.onPlayerTurn = (onPlayTurn) => {
			this.connection.on(
				'turnReceived',
				function (x: number, y: number, value: Turn, state: State) {
					onPlayTurn(x, y, value, state);
				}
			);
		};

		this.onPlayerReset = (onPlayerReset) => {
			this.connection.on('resetReceived', function (state: State) {
				onPlayerReset(state);
			});
		};

		this.onPlayerReday = (onPlayerReday) => {
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
