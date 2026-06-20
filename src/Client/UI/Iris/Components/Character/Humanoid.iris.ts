import Iris from "@rbxts/iris";

export default function HumanoidIris(humanoid: Humanoid): void {
	const healthStateProgress = Iris.State(humanoid.Health);
	healthStateProgress.set(humanoid.Health / humanoid.MaxHealth);

	const currentHealthState = Iris.State(humanoid.Health);
	currentHealthState.onChange((value) => (humanoid.Health = humanoid.MaxHealth * (value / 100)));

	const maxHealthState = Iris.State(humanoid.MaxHealth);
	maxHealthState.onChange((value) => (humanoid.MaxHealth = value));

	const walkSpeedState = Iris.State(humanoid.WalkSpeed);
	walkSpeedState.onChange((value) => (humanoid.WalkSpeed = value));

	Iris.CollapsingHeader(["Humanoid"]);
	{
		Iris.ProgressBar(["Health"], { progress: healthStateProgress });
		Iris.SliderNum(["Current Health"], { number: currentHealthState });
		Iris.InputNum(["Max Health"], { number: maxHealthState });
		Iris.InputNum(["Walk Speed"], { number: walkSpeedState });
	}
	Iris.End();
}
