const Signals = {
	Cmdr: {
		ConnectDebugPanel: new Instance("BindableFunction") as BindableFunction<
			() => [success: boolean, result: string]
		>
	}
} as const;

export default Signals;
