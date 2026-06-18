interface ReplicatedStorage extends Instance {
	readonly TS: Folder & {
		readonly Cmdr: Folder & {
			readonly Commands: Folder;
		};
	};
}
