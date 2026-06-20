import Iris from "@rbxts/iris";
import type StaminaRegeneratorComponent from "Client/Classes/Character/StaminaRegeneratorComponent";

export default function StaminaRegeneratorComponentIris(staminaRegenerator: StaminaRegeneratorComponent): void {
	const regenerationSpeedState = Iris.State(staminaRegenerator.RegenerationSpeed);
	regenerationSpeedState.onChange((value) => (staminaRegenerator.RegenerationSpeed = value));

	const regenerationStrengthState = Iris.State(staminaRegenerator.RegenerationStrength);
	regenerationStrengthState.onChange((value) => (staminaRegenerator.RegenerationStrength = value));

	const regenerationDelayState = Iris.State(staminaRegenerator.RegenerationDelay);
	regenerationDelayState.onChange((value) => (staminaRegenerator.RegenerationDelay = value));

	const isRegenerating = Iris.State(staminaRegenerator.IsRegenerating());
	isRegenerating.set(staminaRegenerator.IsRegenerating());

	Iris.CollapsingHeader(["Stamina Regenerator"]);
	{
		Iris.Checkbox(["IsRegenerating"], { isChecked: isRegenerating });
		Iris.InputNum({ 1: "Regeneration Speed", 5: "%g" }, { number: regenerationSpeedState });
		Iris.InputNum({ 1: "Regeneration Strength", 5: "%g" }, { number: regenerationStrengthState });
		Iris.InputNum({ 1: "Regeneration Delay", 5: "%g" }, { number: regenerationDelayState });

		Iris.SameLine([]);
		{
			const buttonStartRegeneration = Iris.Button(["Start Regeneration"]);
			if (buttonStartRegeneration.clicked()) staminaRegenerator.StartRegeneration();

			const buttonStopRegeneration = Iris.Button(["Stop Regeneration"]);
			if (buttonStopRegeneration.clicked()) staminaRegenerator.StopRegeneration();
		}
		Iris.End();
	}
	Iris.End();
}
