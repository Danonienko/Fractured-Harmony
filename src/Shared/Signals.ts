const Signals = {
	Client: {
		Cmdr: {
			ConnectDebugPanel: new Instance("BindableFunction") as BindableFunction<
				() => [success: boolean, result: string]
			>
		}
	},
	Server: {}
} as const;

export default Signals;
