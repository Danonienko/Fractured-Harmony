import Iris from "@rbxts/iris";
import type StaminaComponent from "Client/Classes/Character/StaminaComponent";

export default function StaminaComponentIris(staminaComponent: StaminaComponent): void {
	const staminaProgress = Iris.State(staminaComponent.GetStamina());
	staminaProgress.set(staminaComponent.GetStamina() / staminaComponent.GetMaxStamina());

	const currentStaminaState = Iris.State(staminaComponent.GetStamina());
	currentStaminaState.onChange((value) =>
		staminaComponent.SetStamina(staminaComponent.GetMaxStamina() * (value / 100))
	);

	const maxStaminaState = Iris.State(staminaComponent.GetMaxStamina());
	maxStaminaState.onChange((value) => staminaComponent.SetMaxStamina(value));

	Iris.CollapsingHeader(["Stamina Component"]);
	{
		Iris.ProgressBar(["Stamina"], { progress: staminaProgress });
		Iris.SliderNum(["Current Stamina"], { number: currentStaminaState });
		Iris.InputNum(["Max Stamina"], { number: maxStaminaState });
	}
	Iris.End();
}
