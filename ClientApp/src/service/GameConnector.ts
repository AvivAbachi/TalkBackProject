import * as signalR from '@microsoft/signalr';

const URL = 'https://localhost:7025/hubs/game';

export type Turn = '' | 'x' | 'y';
export type State = 'Wait' | 'P1R' | 'P2R' | 'P1' | 'P2' | 'P1W' | 'P2W' | 'Darw';

class GameConnector {
	static instance: GameConnector;
	private connection: signalR.HubConnection;

	public events: {
		onPlayerTurn: (
			turn: (x: number, y: number, value: Turn, state: State) => void
		) => void;
		onPlayerReset: (reset: (state: State) => void) => void;
		onPlayerReday: (ready: (state: State) => void) => void;
		onPlayerLogin: (addPlayer: (connectionId: string, username: string) => void) => void;
		onPlayerLogout: (deletePlayer: (connectionId: string) => void) => void;
		getPlayers: (getPlayers: (state: any) => void) => void;
	};

	constructor(username: string, token: string) {
		this.connection = new signalR.HubConnectionBuilder()
			.withUrl(URL, {
				accessTokenFactory: () => token,
				skipNegotiation: true,
				transport: signalR.HttpTransportType.WebSockets,
			})
			.build();

		this.connection
			.start()
			.then(() =>
				this.connection.send('playerLogin', this.connection.connectionId, username)
			)
			.catch((err) => console.log(err));

		this.events = {
			onPlayerTurn: (turn) => {
				this.connection.on(
					'turnReceived',
					(x: number, y: number, value: Turn, state: State) => {
						turn(x, y, value, state);
					}
				);
			},

			onPlayerReset: (reset) => {
				this.connection.on('resetReceived', (state: State) => {
					reset(state);
				});
			},

			onPlayerReday: (ready) => {
				this.connection.on('readyReceived', (state: State) => {
					ready(state);
				});
			},

			getPlayers: (getPlayers) => {
				this.connection.on('playersReceived', (players: any) => {
					getPlayers(players);
				});
			},

			onPlayerLogin: (addPlayer) => {
				this.connection.on('playerLogin', (connectionId: string, username: string) => {
					addPlayer(connectionId, username);
				});
			},

			onPlayerLogout: (deletePlayer) => {
				this.connection.on('playerLogout', (connectionId: string) => {
					deletePlayer(connectionId);
				});
			},
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

	public static getInstance(username: string, token: string): GameConnector {
		if (!GameConnector.instance)
			GameConnector.instance = new GameConnector(username, token);

		return GameConnector.instance;
	}
}

export default GameConnector.getInstance;
