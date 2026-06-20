import React from "@rbxts/react";
import StaminaBar from "./Components/StaminaBar";

export default function App() {
	return (
		<screengui key={"ReactRoot"} ResetOnSpawn={false}>
			<StaminaBar />
		</screengui>
	);
}
