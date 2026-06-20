/* eslint-disable roblox-ts/lua-truthiness */
import React, { useEffect, useState } from "@rbxts/react";
import useCharacter from "../Hooks/useCharacter";
import { useEventListener, useSpring } from "@rbxts/pretty-react-hooks";

type Props = {
	UseProps?: boolean;
	CurrentStamina?: number;
	MaxStamina?: number;
};

export default function StaminaBar({ UseProps = false, CurrentStamina = 50, MaxStamina = 100 }: Props) {
	const staminaComponent = useCharacter()?.GetComponent("StaminaComponent");

	const [currentStamina, setCurrentStamina] = useState(staminaComponent?.GetStamina() ?? CurrentStamina);
	const [maxStamina, setMaxStamina] = useState(staminaComponent?.GetMaxStamina() ?? MaxStamina);

	useEventListener(staminaComponent?.StaminaChanged, (_, newStamina) => setCurrentStamina(newStamina));
	useEventListener(staminaComponent?.MaxStaminaChanged, (_, newMaxStamina) => setMaxStamina(newMaxStamina));

	if (UseProps) {
		useEffect(() => setCurrentStamina(CurrentStamina), [CurrentStamina]);
		useEffect(() => setMaxStamina(MaxStamina), [MaxStamina]);
	}

	const staminaProgress = useSpring(UDim2.fromScale(math.clamp((currentStamina / maxStamina) * 0.5, 0, 0.5), 0.01));
	const transparency = useSpring(currentStamina >= maxStamina ? 1 : 0);

	if (!staminaComponent && !UseProps) return;

	return (
		<frame
			Size={staminaProgress}
			Position={UDim2.fromScale(0.5, 0.8)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Transparency={transparency}
		/>
	);
}
