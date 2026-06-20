import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { CreateReactStory } from "@rbxts/ui-labs";
import StaminaBar from "../Components/StaminaBar";

export = CreateReactStory(
	{
		react: React,
		reactRoblox: ReactRoblox,
		controls: {
			CurrentStamina: 50,
			MaxStamina: 100
		}
	},
	(props) => (
		<StaminaBar
			UseProps={true}
			CurrentStamina={props.controls.CurrentStamina}
			MaxStamina={props.controls.MaxStamina}
		/>
	)
);
