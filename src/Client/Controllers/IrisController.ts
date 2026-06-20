import Iris from "@rbxts/iris";
import Log, { Logger } from "@rbxts/log";
import MainIris from "Client/UI/Iris/Main.iris";
import Signals from "Shared/Signals";

const connectDebugPanelFunction = Signals.Client.Cmdr.ConnectDebugPanel;

class IrisController {
	private readonly _logger: Logger = Log.ForContext(IrisController);

	private _connection?: () => void;

	public constructor() {
		Iris.Init();

		connectDebugPanelFunction.OnInvoke = () => this._handleOnConnectDebugPanel();
	}

	public Connect(): void {
		if (this._connection) return;
		this._connection = Iris.Connect(() => MainIris({ irisController: this }));
	}

	public Disconnect(): void {
		if (!this._connection) return;
		this._connection();
		this._connection = undefined;
	}

	public IsConnected(): boolean {
		return !!this._connection;
	}

	private _handleOnConnectDebugPanel(): [success: boolean, result: string] {
		if (this.IsConnected()) return [false, "Debug panel is already connected!"];

		try {
			this.Connect();

			return [true, "Successfully connected debug panel!"];
		} catch (err) {
			this._logger.Error("Error connecting the debug panel: {Error}", err);
			return [false, "Error connecting debug panel! Check console for errors."];
		}
	}
}

const irisController = new IrisController();
type irisController = IrisController;

export { irisController as IrisController };
