import { CommandDefinition } from "@rbxts/cmdr";
import Signals from "Shared/Signals";

export = {
	Name: "connectDebugPanel",
	Description:
		"[DEV] Connects a developer debug panel which grants user the power to control all the systems in the game",
	Args: [],
	ClientRun: () => {
		const [, result] = Signals.Client.Cmdr.ConnectDebugPanel.Invoke();

		return result;
	}
} satisfies CommandDefinition;
